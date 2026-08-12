import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
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
          background: "#161011",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(196,29,45,0.3), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: "#C41D2D",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>
              NOAH
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: 4 }}>
              CONSTRUCTION
            </span>
          </div>
        </div>
        <div style={{ display: "flex", color: "white", fontSize: 64, fontWeight: 700, maxWidth: 900, lineHeight: 1.1 }}>
          Your Trusted Partner in Building World-Class Finishes
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.65)", fontSize: 26, marginTop: 24, maxWidth: 780 }}>
          Design-and-build construction across Singapore
        </div>
      </div>
    ),
    { ...size },
  );
}
