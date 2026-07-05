import { loadClient } from "@/lib/loadClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { EditForm } from "./EditForm";

export const dynamic = "force-dynamic";

async function isValidToken(slug: string, token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const { data } = await supabaseAdmin
    .from("client_overrides")
    .select("edit_token")
    .eq("slug", slug)
    .maybeSingle();

  return data?.edit_token === token;
}

export default async function ClientEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { slug } = await params;
  const { token } = await searchParams;

  const valid = await isValidToken(slug, token);
  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <p className="text-sm text-gray-500">
          リンクが正しくないか、有効期限が切れています。運営にお問い合わせください。
        </p>
      </div>
    );
  }

  const client = await loadClient(slug);
  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <p className="text-sm text-gray-500">ページが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-900">{client.name} さんのLP編集</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            連絡先・実績・SNSリンクを更新できます。保存するとすぐにページに反映されます。
          </p>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">
        <EditForm
          slug={slug}
          token={token!}
          initialContact={client.sections.contact}
          initialAchievements={client.sections.achievements}
          initialSns={client.sections.sns}
        />
      </main>
    </div>
  );
}
