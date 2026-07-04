import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { AdminClient } from "./AdminClient";

export const dynamic = "force-dynamic";

type HearingEntry = {
  slug: string;
  name: string;
  subtitle: string;
  savedAt: string;
  json: string;
};

async function loadHearings(): Promise<HearingEntry[]> {
  const { data, error } = await supabaseAdmin
    .from("hearings")
    .select("slug, name, subtitle, data, updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load hearings:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name ?? row.slug,
    subtitle: row.subtitle ?? "",
    savedAt: row.updated_at,
    json: JSON.stringify(row.data, null, 2),
  }));
}

export default async function AdminPage() {
  const hearings = await loadHearings();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              HITOIRO 管理
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">ヒアリング結果一覧</p>
          </div>
          <a
            href="/hearing"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            + 新規ヒアリング
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {hearings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">
              保存済みのヒアリング結果はまだありません
            </p>
            <a
              href="/hearing"
              className="mt-4 inline-block text-sm text-gray-900 underline"
            >
              ヒアリングを開始する
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-4">
              {hearings.length} 件のヒアリング結果
            </p>
            {hearings.map((h) => (
              <AdminClient key={h.slug} entry={h} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
