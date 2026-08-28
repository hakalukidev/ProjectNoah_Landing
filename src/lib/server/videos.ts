import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

export type ProjectVideo = {
  id: string;
  caption: string;
  mimeType: string;
  extension: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const VIDEOS_FILE = path.join(DATA_DIR, "videos.json");
const VIDEO_UPLOADS_DIR = path.join(DATA_DIR, "video-uploads");

async function readAll(): Promise<ProjectVideo[]> {
  try {
    const raw = await fs.readFile(VIDEOS_FILE, "utf-8");
    return JSON.parse(raw) as ProjectVideo[];
  } catch {
    return [];
  }
}

async function writeAll(videos: ProjectVideo[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(VIDEOS_FILE, JSON.stringify(videos, null, 2), "utf-8");
}

function filePathFor(id: string, extension: string): string {
  return path.join(VIDEO_UPLOADS_DIR, `${id}.${extension}`);
}

export async function getVideos(): Promise<ProjectVideo[]> {
  const videos = await readAll();
  return videos.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getVideoRecord(id: string): Promise<ProjectVideo | null> {
  const videos = await readAll();
  return videos.find((video) => video.id === id) ?? null;
}

/** Persists the uploaded video file + its metadata. */
export async function addVideo({
  caption,
  buffer,
  mimeType,
  extension,
}: {
  caption: string;
  buffer: Buffer;
  mimeType: string;
  extension: string;
}): Promise<ProjectVideo> {
  await fs.mkdir(VIDEO_UPLOADS_DIR, { recursive: true });

  const id = nanoid(12);
  await fs.writeFile(filePathFor(id, extension), buffer);

  const record: ProjectVideo = {
    id,
    caption: caption.trim(),
    mimeType,
    extension,
    createdAt: new Date().toISOString(),
  };

  const videos = await readAll();
  videos.push(record);
  await writeAll(videos);

  return record;
}

export async function deleteVideo(id: string): Promise<void> {
  const videos = await readAll();
  const record = videos.find((video) => video.id === id);
  await writeAll(videos.filter((video) => video.id !== id));
  if (record) {
    await fs.rm(filePathFor(id, record.extension), { force: true });
  }
}

/** Resolves the on-disk path for the /api/videos/[id] route, verifying the file still exists. */
export async function getVideoFilePath(id: string): Promise<string | null> {
  const record = await getVideoRecord(id);
  if (!record) return null;

  const filePath = filePathFor(id, record.extension);
  try {
    await fs.access(filePath);
    return filePath;
  } catch {
    return null;
  }
}
