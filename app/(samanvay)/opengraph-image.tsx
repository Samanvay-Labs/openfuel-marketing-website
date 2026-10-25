import { ImageResponse } from "next/og";

export const alt = "Samanvay Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#0B1F3A",
            letterSpacing: "0.02em",
          }}
        >
          Samanvay Labs
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.15,
              color: "#0B1F3A",
              maxWidth: 900,
              fontWeight: 500,
            }}
          >
            Engineering Intelligent Systems for Modern Enterprises
          </div>
          <div style={{ fontSize: 24, color: "#57534E", maxWidth: 760 }}>
            Engineering clarity through intelligent systems.
          </div>
        </div>
        <div
          style={{
            height: 4,
            width: 96,
            backgroundColor: "#0F6B4C",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
