import { ImageResponse } from "next/og";

import { company } from "@/lib/site-config";

export const alt = `${company.brandName} Pte Ltd, Singapore Construction & Project Management`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "#ad1111",
              display: "flex",
            }}
          />
          <span
            style={{ fontSize: 32, fontWeight: 700, letterSpacing: 2 }}
          >
            PROJECT NOAH
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            marginTop: 48,
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          Construction & Project Management, Singapore
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 32,
            color: "#a3a3a3",
          }}
        >
          {`UEN ${company.uen} · Registered since ${company.incorporationDateLabel}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
