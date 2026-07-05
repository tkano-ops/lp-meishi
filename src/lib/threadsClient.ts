import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const GRAPH_BASE = "https://graph.threads.net";
const TOKEN_ROW_ID = "default";
const REFRESH_MARGIN_MS = 7 * 24 * 60 * 60 * 1000; // 期限7日前から更新

export type ThreadsPost = {
  id: string;
  text: string | null;
  permalink: string | null;
  timestamp: string;
};

export type ThreadsReply = {
  id: string;
  text: string | null;
  username: string | null;
  permalink: string | null;
  timestamp: string;
};

type TokenRow = {
  access_token: string;
  threads_user_id: string;
  expires_at: string;
};

async function saveToken(accessToken: string, threadsUserId: string, expiresInSeconds: number) {
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();
  const { error } = await supabaseAdmin.from("thread_tokens").upsert(
    {
      id: TOKEN_ROW_ID,
      access_token: accessToken,
      threads_user_id: threadsUserId,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
  if (error) throw error;
}

/** OAuthコールバックで受け取った認可コードを短期トークンに交換する */
export async function exchangeCodeForToken(code: string, redirectUri: string) {
  const params = new URLSearchParams({
    client_id: process.env.THREADS_APP_ID!,
    client_secret: process.env.THREADS_APP_SECRET!,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code,
  });

  const res = await fetch(`${GRAPH_BASE}/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  if (!res.ok) throw new Error(`短期トークン交換に失敗: ${await res.text()}`);

  const { access_token, user_id } = (await res.json()) as {
    access_token: string;
    user_id: string;
  };

  // 短期トークン(1時間)を長期トークン(60日)に交換する
  const exchangeUrl = new URL(`${GRAPH_BASE}/access_token`);
  exchangeUrl.searchParams.set("grant_type", "th_exchange_token");
  exchangeUrl.searchParams.set("client_secret", process.env.THREADS_APP_SECRET!);
  exchangeUrl.searchParams.set("access_token", access_token);

  const longLivedRes = await fetch(exchangeUrl.toString());
  if (!longLivedRes.ok) throw new Error(`長期トークン交換に失敗: ${await longLivedRes.text()}`);

  const { access_token: longLivedToken, expires_in } = (await longLivedRes.json()) as {
    access_token: string;
    expires_in: number;
  };

  await saveToken(longLivedToken, user_id, expires_in);
  return { threadsUserId: user_id };
}

async function refreshToken(row: TokenRow) {
  const url = new URL(`${GRAPH_BASE}/refresh_access_token`);
  url.searchParams.set("grant_type", "th_refresh_token");
  url.searchParams.set("access_token", row.access_token);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`トークン更新に失敗: ${await res.text()}`);

  const { access_token, expires_in } = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  await saveToken(access_token, row.threads_user_id, expires_in);
  return access_token;
}

/** 有効なアクセストークンとThreadsユーザーIDを取得する。期限が近ければ自動更新する */
export async function getValidAccessToken(): Promise<{ accessToken: string; threadsUserId: string } | null> {
  const { data, error } = await supabaseAdmin
    .from("thread_tokens")
    .select("access_token, threads_user_id, expires_at")
    .eq("id", TOKEN_ROW_ID)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as TokenRow;
  const expiresAt = new Date(row.expires_at).getTime();

  if (expiresAt - Date.now() < REFRESH_MARGIN_MS) {
    const accessToken = await refreshToken(row);
    return { accessToken, threadsUserId: row.threads_user_id };
  }

  return { accessToken: row.access_token, threadsUserId: row.threads_user_id };
}

async function graphGet<T>(path: string, accessToken: string, fields: string): Promise<T> {
  const url = new URL(`${GRAPH_BASE}/v1.0${path}`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("access_token", accessToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Threads API呼び出しに失敗 (${path}): ${await res.text()}`);
  return res.json() as Promise<T>;
}

export async function fetchRecentPosts(accessToken: string, threadsUserId: string, limit = 20) {
  const url = new URL(`${GRAPH_BASE}/v1.0/${threadsUserId}/threads`);
  url.searchParams.set("fields", "id,text,permalink,timestamp");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", accessToken);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`投稿一覧の取得に失敗: ${await res.text()}`);

  const { data } = (await res.json()) as { data: ThreadsPost[] };
  return data;
}

export async function fetchReplies(accessToken: string, mediaId: string) {
  const { data } = await graphGet<{ data: ThreadsReply[] }>(
    `/${mediaId}/replies`,
    accessToken,
    "id,text,username,permalink,timestamp"
  );
  return data;
}

export async function fetchMentions(accessToken: string, threadsUserId: string) {
  const { data } = await graphGet<{ data: ThreadsReply[] }>(
    `/${threadsUserId}/mentions`,
    accessToken,
    "id,text,username,permalink,timestamp"
  );
  return data;
}

async function createTextContainer(accessToken: string, threadsUserId: string, text: string) {
  const params = new URLSearchParams({
    media_type: "TEXT",
    text,
    access_token: accessToken,
  });

  const res = await fetch(`${GRAPH_BASE}/v1.0/${threadsUserId}/threads`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  if (!res.ok) throw new Error(`投稿コンテナの作成に失敗: ${await res.text()}`);

  const { id } = (await res.json()) as { id: string };
  return id;
}

async function publishContainer(accessToken: string, threadsUserId: string, creationId: string) {
  const params = new URLSearchParams({
    creation_id: creationId,
    access_token: accessToken,
  });

  const res = await fetch(`${GRAPH_BASE}/v1.0/${threadsUserId}/threads_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  if (!res.ok) throw new Error(`投稿の公開に失敗: ${await res.text()}`);

  const { id } = (await res.json()) as { id: string };
  return id;
}

/** テキスト投稿をThreadsに公開する（コンテナ作成→公開の2ステップ） */
export async function publishPost(accessToken: string, threadsUserId: string, text: string) {
  const creationId = await createTextContainer(accessToken, threadsUserId, text);
  // Metaの推奨に従い、コンテナ作成の反映を待ってから公開する
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return publishContainer(accessToken, threadsUserId, creationId);
}
