import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const highlightSkills = ["Node.js", "NestJS", "PostgreSQL", "Redis", "Microservices"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0f",
          padding: "72px",
          position: "relative",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "#34d399",
            opacity: 0.18,
            filter: "blur(10px)",
          }}
        />

        <div style={{ display: "flex", fontSize: 28, color: "#34d399" }}>
          {`~/${profile.name.toLowerCase().replace(/\s+/g, "-")}`}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, color: "#e7e9ee", fontWeight: 700 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#95a0ae", marginTop: 18 }}>
            {profile.role} · {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {highlightSkills.map((skill) => (
            <div
              key={skill}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#e7e9ee",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 999,
                padding: "12px 24px",
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
