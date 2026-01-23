import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "BIP39 Word Recovery Tool - Fix Misspelled Seed Phrase Words";
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
          background: "#09090B",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(245, 185, 66, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 185, 66, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            background:
              "radial-gradient(ellipse at center, rgba(245, 185, 66, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Corner decorations */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            display: "flex",
            flexDirection: "column",
            color: "rgba(113, 113, 122, 0.4)",
            fontSize: 14,
            fontFamily: "monospace",
            lineHeight: 1.4,
          }}
        >
          {"╔═══╗\n║BIP║\n║ 39║\n╚═══╝".split("\n").map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            display: "flex",
            flexDirection: "column",
            color: "rgba(113, 113, 122, 0.4)",
            fontSize: 14,
            fontFamily: "monospace",
            lineHeight: 1.4,
            textAlign: "right",
          }}
        >
          {"╔════╗\n║2048║\n║WRDS║\n╚════╝".split("\n").map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>

        {/* Shield Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            background:
              "linear-gradient(135deg, rgba(245, 185, 66, 0.2) 0%, rgba(245, 185, 66, 0.05) 100%)",
            borderRadius: 32,
            marginBottom: 48,
            border: "2px solid rgba(245, 185, 66, 0.4)",
            boxShadow:
              "0 0 80px rgba(245, 185, 66, 0.3), 0 0 40px rgba(245, 185, 66, 0.2)",
          }}
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F5B942"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L4 6v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                background: "linear-gradient(180deg, #FAFAFA 0%, #A1A1AA 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              BIP39 Word
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #F5B942 0%, #E5A320 50%, #CD7F32 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Recovery
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#71717A",
            marginBottom: 32,
            letterSpacing: "0.02em",
          }}
        >
          Fix misspelled seed phrase words instantly
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "rgba(245, 185, 66, 0.1)",
              border: "1px solid rgba(245, 185, 66, 0.3)",
              borderRadius: 999,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 10px #22C55E",
              }}
            />
            <span style={{ color: "#FAFAFA", fontSize: 18, fontWeight: 500 }}>
              100% Client-Side
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "rgba(245, 185, 66, 0.1)",
              border: "1px solid rgba(245, 185, 66, 0.3)",
              borderRadius: 999,
            }}
          >
            <span style={{ color: "#F5B942", fontSize: 18, fontWeight: 500 }}>
              4 Matching Algorithms
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "rgba(245, 185, 66, 0.1)",
              border: "1px solid rgba(245, 185, 66, 0.3)",
              borderRadius: 999,
            }}
          >
            <span style={{ color: "#FAFAFA", fontSize: 18, fontWeight: 500 }}>
              Free & Open Source
            </span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            fontSize: 20,
            color: "#52525B",
            fontFamily: "monospace",
          }}
        >
          bip39recover.xyz
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
