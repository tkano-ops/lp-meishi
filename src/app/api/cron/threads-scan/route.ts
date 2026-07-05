import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { classifyThreadsMessage } from "@/lib/threadsLeadClassifier";
import {
  fetchMentions,
  fetchRecentPosts,
  fetchReplies,
  getValidAccessToken,
  type ThreadsReply,
} from "@/lib/threadsClient";

type Candidate = {
  sourceType: "reply" | "mention";
  sourcePostId: string;
  sourcePermalink: string | null;
  reply: ThreadsReply;
  originalPostText?: string | null;
};

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = await getValidAccessToken();
  if (!token) {
    return Response.json({ error: "threads_not_connected" }, { status: 409 });
  }
  const { accessToken, threadsUserId } = token;

  const posts = await fetchRecentPosts(accessToken, threadsUserId);

  const candidates: Candidate[] = [];

  for (const post of posts) {
    const replies = await fetchReplies(accessToken, post.id);
    for (const reply of replies) {
      candidates.push({
        sourceType: "reply",
        sourcePostId: post.id,
        sourcePermalink: post.permalink,
        reply,
        originalPostText: post.text,
      });
    }
  }

  const mentions = await fetchMentions(accessToken, threadsUserId);
  for (const mention of mentions) {
    candidates.push({
      sourceType: "mention",
      sourcePostId: mention.id,
      sourcePermalink: mention.permalink,
      reply: mention,
    });
  }

  if (candidates.length === 0) {
    return Response.json({ scanned: 0, newLeads: 0 });
  }

  const candidateIds = candidates.map((c) => c.reply.id);
  const { data: existing, error: existingError } = await supabaseAdmin
    .from("thread_leads")
    .select("reply_id")
    .in("reply_id", candidateIds);

  if (existingError) throw existingError;

  const existingIds = new Set((existing ?? []).map((row) => row.reply_id));
  const newCandidates = candidates.filter((c) => !existingIds.has(c.reply.id));

  let newLeads = 0;

  for (const candidate of newCandidates) {
    const { reply } = candidate;
    if (!reply.text || !reply.username) continue;

    const classification = await classifyThreadsMessage({
      authorUsername: reply.username,
      messageText: reply.text,
      sourceType: candidate.sourceType,
      originalPostText: candidate.originalPostText,
    });

    const { error: insertError } = await supabaseAdmin.from("thread_leads").insert({
      source_type: candidate.sourceType,
      source_post_id: candidate.sourcePostId,
      source_permalink: candidate.sourcePermalink,
      reply_id: reply.id,
      author_username: reply.username,
      text: reply.text,
      is_lead: classification.isLead,
      lead_reason: classification.reason,
      dm_draft: classification.dmDraft,
      status: "new",
    });

    if (insertError) {
      console.error("Failed to insert thread_lead:", insertError);
      continue;
    }

    if (classification.isLead) newLeads += 1;
  }

  return Response.json({ scanned: newCandidates.length, newLeads });
}
