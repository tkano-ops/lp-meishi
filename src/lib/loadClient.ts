import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  clientDataSchema,
  contactLinkSchema,
  achievementSchema,
  snsLinkSchema,
  type ClientData,
} from "@/lib/types";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function loadClient(slug: string): Promise<ClientData | null> {
  let raw: string;
  try {
    const file = path.join(
      process.cwd(),
      "src",
      "data",
      "clients",
      `${slug}.json`
    );
    raw = await fs.readFile(file, "utf-8");
  } catch {
    // ファイルが無い → 404 扱い
    return null;
  }

  // 実行時バリデーション：型に反する手書きJSONはここで弾く
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error(`[loadClient] ${slug}.json の JSON 構文が不正です`);
    return null;
  }

  const result = clientDataSchema.safeParse(parsed);
  if (!result.success) {
    console.error(
      `[loadClient] ${slug}.json がスキーマに違反しています:\n` +
        JSON.stringify(result.error.flatten(), null, 2)
    );
    return null;
  }
  return applyOverrides(slug, result.data);
}

/** クライアントがセルフ編集した連絡先・実績・SNSリンクがあれば、JSONの値を上書きする */
async function applyOverrides(slug: string, client: ClientData): Promise<ClientData> {
  const { data, error } = await supabaseAdmin
    .from("client_overrides")
    .select("contact, achievements, sns")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return client;

  const contact = data.contact
    ? z.array(contactLinkSchema).safeParse(data.contact)
    : null;
  const achievements = data.achievements
    ? z.array(achievementSchema).safeParse(data.achievements)
    : null;
  const sns = data.sns ? z.array(snsLinkSchema).safeParse(data.sns) : null;

  return {
    ...client,
    sections: {
      ...client.sections,
      contact: contact?.success ? contact.data : client.sections.contact,
      achievements: achievements?.success ? achievements.data : client.sections.achievements,
      sns: sns?.success ? sns.data : client.sections.sns,
    },
  };
}
