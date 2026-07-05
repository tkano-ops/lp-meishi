import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generatePostDraft } from "@/lib/threadsPostGenerator";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: recent, error: recentError } = await supabaseAdmin
    .from("thread_post_drafts")
    .select("content")
    .eq("status", "posted")
    .order("generated_at", { ascending: false })
    .limit(10);

  if (recentError) throw recentError;

  const recentPosts = (recent ?? []).map((row) => row.content);
  const draft = await generatePostDraft(recentPosts);

  const { error: insertError } = await supabaseAdmin.from("thread_post_drafts").insert({
    content: draft.content,
    topic_angle: draft.topicAngle,
    status: "pending",
  });

  if (insertError) throw insertError;

  return Response.json({ success: true, topicAngle: draft.topicAngle });
}
