import { lookup } from "node:dns/promises";

export type SiteInfo = {
  title: string | null;
  description: string | null;
  themeColor: string | null;
  colors: string[];
  textExcerpt: string | null;
};

const FETCH_TIMEOUT_MS = 8000;
const MAX_BYTES = 1_500_000;

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true;
  const [a, b] = parts;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a >= 224) return true;
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true;
  if (lower.startsWith("fe80") || lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("::ffff:")) return isPrivateIPv4(lower.replace("::ffff:", ""));
  return false;
}

// 基本的なSSRF対策。内部/プライベートIPへの解決を拒否する（DNS再バインドまでは防げない簡易版）
async function assertSafeUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("http/httpsのURLのみ対応しています");
  }
  if (url.hostname === "localhost") {
    throw new Error("このURLは取得できません");
  }
  const addresses = await lookup(url.hostname, { all: true });
  for (const { address, family } of addresses) {
    if (family === 4 && isPrivateIPv4(address)) throw new Error("このURLは取得できません");
    if (family === 6 && isPrivateIPv6(address)) throw new Error("このURLは取得できません");
  }
}

function extractMeta(html: string, key: "name" | "property", value: string): string | null {
  const re1 = new RegExp(`<meta[^>]*${key}=["']${value}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i");
  const re2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${key}=["']${value}["'][^>]*>`, "i");
  return html.match(re1)?.[1] ?? html.match(re2)?.[1] ?? null;
}

function extractColors(html: string): string[] {
  const matches = html.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) ?? [];
  const ignore = new Set(["#ffffff", "#fff", "#000000", "#000"]);
  const counts = new Map<string, number>();
  for (const raw of matches) {
    const hex = raw.toLowerCase();
    if (ignore.has(hex)) continue;
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([hex]) => hex);
}

export async function fetchSiteInfo(rawUrl: string): Promise<SiteInfo> {
  const url = new URL(rawUrl);
  await assertSafeUrl(url);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let html: string;
  try {
    const res = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "HitoiroHearingBot/1.0" },
    });

    if (res.status >= 300 && res.status < 400) {
      throw new Error("リダイレクトを含むURLは取得できません");
    }
    if (!res.ok) {
      throw new Error(`ページの取得に失敗しました（status ${res.status}）`);
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error("ページの取得に失敗しました");

    const decoder = new TextDecoder();
    let result = "";
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) break;
      result += decoder.decode(value, { stream: true });
    }
    html = result;
  } finally {
    clearTimeout(timer);
  }

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  const description =
    extractMeta(html, "name", "description") ?? extractMeta(html, "property", "og:description");
  const themeColor = extractMeta(html, "name", "theme-color");
  const colors = extractColors(html);
  const textExcerpt = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);

  return {
    title,
    description,
    themeColor,
    colors,
    textExcerpt: textExcerpt || null,
  };
}
