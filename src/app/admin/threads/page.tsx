import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ThreadLeadClient } from "./ThreadLeadClient";

export const dynamic = "force-dynamic";

type ThreadLead = {
  id: string;
  sourceType: "reply" | "mention";
  sourcePermalink: string | null;
  authorUsername: string;
  text: string;
  isLead: boolean;
  leadReason: string | null;
  dmDraft: string | null;
  status: "new" | "contacted" | "ignored";
  detectedAt: string;
};

async function loadLeads(): Promise<ThreadLead[]> {
  const { data, error } = await supabaseAdmin
    .from("thread_leads")
    .select(
      "id, source_type, source_permalink, author_username, text, is_lead, lead_reason, dm_draft, status, detected_at"
    )
    .eq("is_lead", true)
    .order("detected_at", { ascending: false });

  if (error) {
    console.error("Failed to load thread_leads:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    sourceType: row.source_type,
    sourcePermalink: row.source_permalink,
    authorUsername: row.author_username,
    text: row.text,
    isLead: row.is_lead,
    leadReason: row.lead_reason,
    dmDraft: row.dm_draft,
    status: row.status,
    detectedAt: row.detected_at,
  }));
}

async function loadConnectionStatus(): Promise<{ connected: boolean; expiresAt: string | null }> {
  const { data, error } = await supabaseAdmin
    .from("thread_tokens")
    .select("expires_at")
    .eq("id", "default")
    .maybeSingle();

  if (error || !data) return { connected: false, expiresAt: null };
  return { connected: new Date(data.expires_at).getTime() > Date.now(), expiresAt: data.expires_at };
}

export default async function ThreadsAdminPage() {
  const [leads, connection] = await Promise.all([loadLeads(), loadConnectionStatus()]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Threads見込み客</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {connection.connected ? "Threads連携中" : "Threads未連携"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {!connection.connected && (
              <a
                href="/api/threads/oauth/start"
                className="text-sm text-gray-900 underline"
              >
                Threadsと連携する
              </a>
            )}
            <a
              href="/admin/threads/drafts"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              投稿ネタ
            </a>
            <a
              href="/admin"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ヒアリング一覧へ
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {leads.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">
              まだ見込み客は見つかっていません
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-4">{leads.length} 件の見込み客</p>
            {leads.map((lead) => (
              <ThreadLeadClient key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
