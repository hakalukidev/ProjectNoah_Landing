import { VideoGrid } from "@/components/admin/video-grid";
import { VideoUploader } from "@/components/admin/video-uploader";
import { getVideos } from "@/lib/server/videos";

export default async function AdminVideosPage() {
  const videos = await getVideos();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Videos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Uploaded videos appear in the Project Films section on the Projects page, alongside the
          site&apos;s existing showcase clips.
        </p>
      </div>

      <VideoUploader />

      <VideoGrid videos={videos} />
    </div>
  );
}
