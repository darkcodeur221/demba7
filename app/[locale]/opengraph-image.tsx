import { ImageResponse } from "next/og";

export const alt = "Ngagne Demba Beye, Spécialiste IA & E-commerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === "fr";
  const role = isFr ? "Spécialiste IA & E-commerce" : "AI & E-commerce Specialist";
  const flow = isFr ? "Donnée brute → Système IA → Décision" : "Raw data → AI system → Decision";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0f17",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#2e75b6",
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
          <div style={{ color: "#93a1b5", fontSize: 26 }}>demba7.seventwins.com</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ color: "#5a9bdc", fontSize: 30 }}>{role}</div>
          <div style={{ color: "#e7edf5", fontSize: 70, fontWeight: 700, lineHeight: 1.1 }}>
            Ngagne Demba Beye
          </div>
          <div style={{ color: "#93a1b5", fontSize: 32, marginTop: 8 }}>{flow}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
