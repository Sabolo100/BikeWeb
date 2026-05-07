import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FM Intel — Magyar FM/PM/AM Piaci Intelligencia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(2,132,199,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Blue accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(2,132,199,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(2,132,199,0.12)",
            border: "1px solid rgba(2,132,199,0.3)",
            borderRadius: "24px",
            padding: "8px 24px",
            marginBottom: "32px",
            color: "#38bdf8",
            fontSize: "14px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          PIACI INTELLIGENCIA PLATFORM
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: "20px",
          }}
        >
          FM Intel
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "26px",
            color: "#94a3b8",
            letterSpacing: "0.1em",
            marginBottom: "48px",
          }}
        >
          Facility · Property · Asset Management
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {[
            { n: "130+", label: "FM/PM/AM Cég" },
            { n: "195+", label: "Ingatlan" },
            { n: "540+", label: "Szakember" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#0284c7",
                }}
              >
                {s.n}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            color: "#334155",
            fontSize: "16px",
            letterSpacing: "0.05em",
          }}
        >
          fmintel.com
        </div>
      </div>
    ),
    { ...size }
  );
}
