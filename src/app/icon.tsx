import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Generates the 32×32 favicon programmatically.
 * Rendered as a PNG by Next.js at /favicon.ico and /icon.png.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F62FE",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "sans-serif",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          CF
        </div>
      </div>
    ),
    { ...size }
  );
}
