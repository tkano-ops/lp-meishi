import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PostDraftClient } from "./PostDraftClient";

export const dynamic = "force-dynamic";

type PostDraft = {
  id: string;
  content: string;
  topicAngle: string | null;
  status: "pending" | "posted" | "rejected";
  generatedAt: string;
  postedThreadId: string | null;
  error: string | null;
};

async function loadDrafts(): Promise<PostDraft[]> {
  const { data, error } = await supabaseAdmin
    .from("thread_post_drafts")
    .select("id, content, topic_angle, status, generated_at, posted_thread_id, error")
    .order("generated_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Failed to load thread_post_drafts:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    content: row.content,
    topicAngle: row.topic_angle,
    status: row.status,
    generatedAt: row.generated_at,
    postedThreadId: row.posted_thread_id,
    error: row.error,
  }));
}

export default async function ThreadDraftsPage() {
  const drafts = await loadDrafts();
  const pending = drafts.filter((d) => d.status === "pending");
  const history = drafts.filter((d) => d.status !== "pending");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">投稿ネタ</h1>
            <p className="text-xs text-gray-500 mt-0.5">AI生成の下書き・承認して投稿</p>
          </div>
          <a href="/admin/threads" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            見込み客一覧へ
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        <section>
          <p className="text-xs text-gray-400 mb-4">未対応の下書き {pending.length} 件</p>
          {pending.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">未対応の下書きはありません</p>
          ) : (
            <div className="space-y-3">
              {pending.map((draft) => (
                <PostDraftClient key={draft.id} draft={draft} />
              ))}
            </div>
          )}
        </section>

        {history.length > 0 && (
          <section>
            <p className="text-xs text-gray-400 mb-4">履歴</p>
            <div className="space-y-3">
              {history.map((draft) => (
                <PostDraftClient key={draft.id} draft={draft} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
