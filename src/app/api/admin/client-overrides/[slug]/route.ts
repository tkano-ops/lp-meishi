import crypto from "node:crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: existing } = await supabaseAdmin
    .from("client_overrides")
    .select("edit_token")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    return Response.json({ success: true, token: existing.edit_token });
  }

  const token = crypto.randomBytes(24).toString("hex");
  const { error } = await supabaseAdmin.from("client_overrides").insert({ slug, edit_token: token });

  if (error) {
    console.error("Failed to issue edit token:", error);
    return Response.json({ success: false }, { status: 500 });
  }

  return Response.json({ success: true, token });
}
