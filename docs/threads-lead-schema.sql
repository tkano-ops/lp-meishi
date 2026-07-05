-- Threads見込み客モニタリング機能用テーブル
-- Supabase SQL Editorで手動実行する（このプロジェクトはマイグレーションツールを使わず、
-- hearingsテーブルと同様にダッシュボードから直接作成する運用のため）

-- OAuthで取得した長期アクセストークンを1行だけ保持する
create table if not exists thread_tokens (
  id text primary key default 'default',
  access_token text not null,
  threads_user_id text not null,
  expires_at timestamptz not null,
  updated_at timestamptz not null default now()
);

-- 自分の投稿へのリプライ／自分をメンションした投稿を記録し、
-- AIによる見込み客判定結果とDM下書きを保持する
create table if not exists thread_leads (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('reply', 'mention')),
  source_post_id text not null,
  source_permalink text,
  reply_id text not null unique,
  author_username text not null,
  author_id text,
  text text not null,
  is_lead boolean not null default false,
  lead_reason text,
  dm_draft text,
  status text not null default 'new' check (status in ('new', 'contacted', 'ignored')),
  detected_at timestamptz not null default now()
);

create index if not exists thread_leads_detected_at_idx on thread_leads (detected_at desc);
create index if not exists thread_leads_is_lead_idx on thread_leads (is_lead);

-- AIが生成した毎日の投稿ネタ。人が内容を確認・編集し、承認したものだけThreadsに公開する
create table if not exists thread_post_drafts (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  topic_angle text,
  status text not null default 'pending' check (status in ('pending', 'posted', 'rejected')),
  generated_at timestamptz not null default now(),
  posted_at timestamptz,
  posted_thread_id text,
  error text
);

create index if not exists thread_post_drafts_generated_at_idx on thread_post_drafts (generated_at desc);
create index if not exists thread_post_drafts_status_idx on thread_post_drafts (status);
