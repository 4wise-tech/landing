import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(circle at 85% 25%, rgba(217,70,239,0.18), transparent 55%), radial-gradient(circle at 50% 100%, rgba(59,130,246,0.16), transparent 60%), #070712",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 22,
            }}
          >
            4
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.4, opacity: 0.95 }}>4wise</div>
        </div>

        <div style={{ fontSize: 64, fontWeight: 950, lineHeight: 1.05, letterSpacing: -1.2, maxWidth: 980 }}>
          AI Agents &amp; Enterprise Software
        </div>
        <div style={{ marginTop: 18, fontSize: 28, lineHeight: 1.35, opacity: 0.86, maxWidth: 980 }}>
          From discovery to production — end‑to‑end delivery with run &amp; support.
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["AI Agents", "Automation", "Scalable Software", "Enterprise AI"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                fontSize: 18,
                fontWeight: 800,
                opacity: 0.92,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

