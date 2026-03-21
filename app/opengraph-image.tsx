import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

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
          padding: 64,
          background: "linear-gradient(135deg, #ecfdf5 0%, #ffffff 50%, #f5f5f4 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 700, color: "#1c1917", lineHeight: 1.2 }}>{SITE_NAME}</div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#475569", maxWidth: 900 }}>{SITE_TAGLINE}</div>
        <div style={{ marginTop: 48, fontSize: 28, color: "#0f766e", fontWeight: 600 }}>体験記・副業・節約・返済シミュレーター</div>
      </div>
    ),
    { ...size },
  );
}
