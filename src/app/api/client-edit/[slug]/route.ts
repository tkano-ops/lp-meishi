import { revalidatePath } from "next/cache";
import { z } from "zod";
import { contactLinkSchema, achievementSchema, snsLinkSchema } from "@/lib/types";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const bodySchema = z.object({
  token: z.string(),
  contact: z.array(contactLinkSchema),
  achievements: z.array(achievementSchema),
  sns: z.array(snsLinkSchema),
});

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = bodySchema.safeParse(await req.json());

  if (!body.success) {
    return Response.json({ success: false, error: "invalid_body" }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("client_overrides")
    .select("edit_token")
    .eq("slug", slug)
    .maybeSingle();

  if (!existing || existing.edit_token !== body.data.token) {
    return Response.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from("client_overrides")
    .update({
      contact: body.data.contact,
      achievements: body.data.achievements,
      sns: body.data.sns,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) {
    console.error("Failed to save client_overrides:", error);
    return Response.json({ success: false }, { status: 500 });
  }

  revalidatePath(`/${slug}`);

  return Response.json({ success: true });
}
