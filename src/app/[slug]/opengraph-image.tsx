import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { clientDataSchema } from "@/lib/types";

// SNS共有用のOG画像をクライアントデータから動的生成する。
// これにより /public/clients/{slug}/og.png の手動配置が不要になる
// （meta.ogImage を JSON に明示した場合のみ、そちらが generateMetadata で優先される）。

export const alt = "HITOIRO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadClient(slug: string) {
  try {
    const file = path.join(process.cwd(), "src", "data", "clients", `${slug}.json`);
    const raw = await fs.readFile(file, "utf-8");
    const parsed = clientDataSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = await loadClient(slug);

  const primary = client?.theme.primary ?? "#0a0a0a";
  const accent = client?.theme.accent ?? "#e94560";
  const fg = client?.theme.onPrimary ?? "#fafaf7";
  const name = client?.name ?? "HITOIRO";
  const title = client?.title ?? "あなたの色を、一枚に。";
  const subtitle = client?.subtitle ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: primary,
          color: fg,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.3em",
            color: accent,
          }}
        >
          <span>HITOIRO</span>
          <span style={{ opacity: 0.6 }}>{slug.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.1 }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: `2px solid ${accent}`,
            paddingTop: 32,
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 600 }}>{name}</div>
          {subtitle ? (
            <div style={{ fontSize: 24, opacity: 0.8, marginTop: 8 }}>
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size
  );
}
