-- クライアント自身によるセルフ編集（連絡先・実績・SNSリンク）用テーブル
-- Supabase SQL Editorで手動実行する（このプロジェクトはマイグレーションツールを使わない運用のため）

-- 各カラムがnullの場合は「上書きなし」＝ src/data/clients/{slug}.json の値をそのまま使う
create table if not exists client_overrides (
  slug text primary key,
  edit_token text not null unique,
  contact jsonb,
  achievements jsonb,
  sns jsonb,
  updated_at timestamptz not null default now()
);
