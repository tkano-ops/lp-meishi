import fs from "node:fs/promises";
import path from "node:path";
import { loadClient } from "@/lib/loadClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ClientLinkClient } from "./ClientLinkClient";

export const dynamic = "force-dynamic";

type ClientRow = {
  slug: string;
  name: string;
  editToken: string | null;
};

async function loadClientRows(): Promise<ClientRow[]> {
  const dir = path.join(process.cwd(), "src", "data", "clients");
  const files = await fs.readdir(dir);
  const slugs = files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));

  const { data: overrides } = await supabaseAdmin.from("client_overrides").select("slug, edit_token");
  const tokenBySlug = new Map((overrides ?? []).map((o) => [o.slug, o.edit_token]));

  const rows = await Promise.all(
    slugs.map(async (slug) => {
      const client = await loadClient(slug);
      return {
        slug,
        name: client?.name ?? slug,
        editToken: tokenBySlug.get(slug) ?? null,
      };
    })
  );

  return rows.sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

export default async function AdminClientsPage() {
  const rows = await loadClientRows();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">クライアント一覧</h1>
            <p className="text-xs text-gray-500 mt-0.5">セルフ編集用リンクの発行</p>
          </div>
          <a href="/admin" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ヒアリング一覧へ
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-3">
        {rows.map((row) => (
          <ClientLinkClient key={row.slug} slug={row.slug} name={row.name} initialToken={row.editToken} />
        ))}
      </main>
    </div>
  );
}
