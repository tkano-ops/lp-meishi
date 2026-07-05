import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getValidAccessToken, publishPost } from "@/lib/threadsClient";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { content } = await req.json();

  if (typeof content !== "string" || !content.trim()) {
    return Response.json({ success: false, error: "empty_content" }, { status: 400 });
  }

  const { data: draft, error: fetchError } = await supabaseAdmin
    .from("thread_post_drafts")
    .select("status")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !draft) {
    return Response.json({ success: false, error: "not_found" }, { status: 404 });
  }
  if (draft.status !== "pending") {
    return Response.json({ success: false, error: "not_pending" }, { status: 400 });
  }

  const token = await getValidAccessToken();
  if (!token) {
    return Response.json({ success: false, error: "threads_not_connected" }, { status: 409 });
  }

  try {
    const postId = await publishPost(token.accessToken, token.threadsUserId, content);

    await supabaseAdmin
      .from("thread_post_drafts")
      .update({
        content,
        status: "posted",
        posted_at: new Date().toISOString(),
        posted_thread_id: postId,
      })
      .eq("id", id);

    return Response.json({ success: true, postId });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Failed to publish thread_post_draft:", message);
    await supabaseAdmin.from("thread_post_drafts").update({ error: message }).eq("id", id);
    return Response.json({ success: false, error: "publish_failed" }, { status: 500 });
  }
}
