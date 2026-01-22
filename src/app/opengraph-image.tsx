import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BIP39 Word Recovery Tool";
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0a0e17 0%, #0d1526 50%, #0a1628 100%)",
          position: "relative",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(0, 217, 255, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            background: "linear-gradient(135deg, #00D9FF 0%, #0097A7 100%)",
            borderRadius: 24,
            marginBottom: 40,
            boxShadow: "0 0 60px rgba(0, 217, 255, 0.5)",
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            background: "linear-gradient(to right, #ffffff, #a0aec0)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          BIP39 Word Recovery
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a0aec0",
            marginBottom: 16,
          }}
        >
          Fix misspelled seed phrase words
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            background: "rgba(0, 217, 255, 0.1)",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            borderRadius: 999,
            marginTop: 20,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00D9FF",
            }}
          />
          <span style={{ color: "#00D9FF", fontSize: 20 }}>
            Secure & Client-Side Only
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
