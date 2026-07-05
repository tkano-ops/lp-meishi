import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { content, status } = await req.json();

  const update: Record<string, string> = {};
  if (typeof content === "string") update.content = content;
  if (status === "rejected") update.status = "rejected";

  if (Object.keys(update).length === 0) {
    return Response.json({ success: false, error: "no_fields" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("thread_post_drafts").update(update).eq("id", id);

  if (error) {
    console.error("Failed to update thread_post_draft:", error);
    return Response.json({ success: false }, { status: 500 });
  }

  return Response.json({ success: true });
}
