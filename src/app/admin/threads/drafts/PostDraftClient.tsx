"use client";

import { useState } from "react";

type PostDraft = {
  id: string;
  content: string;
  topicAngle: string | null;
  status: "pending" | "posted" | "rejected";
  generatedAt: string;
  postedThreadId: string | null;
  error: string | null;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_LABELS: Record<PostDraft["status"], string> = {
  pending: "未対応",
  posted: "投稿済み",
  rejected: "却下",
};

export function PostDraftClient({ draft }: { draft: PostDraft }) {
  const [content, setContent] = useState(draft.content);
  const [status, setStatus] = useState(draft.status);
  const [error, setError] = useState(draft.error);
  const [busy, setBusy] = useState(false);
  const isPending = status === "pending";

  const handlePublish = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/thread-drafts/${draft.id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("posted");
      } else {
        setError(json.error ?? "公開に失敗しました");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleReject = async () => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/thread-drafts/${draft.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (res.ok) setStatus("rejected");
    } finally {
      setBusy(false);
    }
  };

  const handleSaveEdit = async () => {
    await fetch(`/api/admin/thread-drafts/${draft.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">{draft.topicAngle ?? "投稿ネタ"}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === "pending"
                ? "bg-amber-50 text-amber-700"
                : status === "posted"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {STATUS_LABELS[status]}
          </span>
          <span className="text-xs text-gray-400">{formatDate(draft.generatedAt)}</span>
        </div>
      </div>

      <div className="border-t border-gray-100 px-5 py-4 space-y-3">
        {isPending ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleSaveEdit}
            rows={5}
            className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        ) : (
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{content}</p>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}

        {isPending && (
          <div className="flex gap-2 pt-1">
            <button
              disabled={busy}
              onClick={handlePublish}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-900 text-white disabled:opacity-40"
            >
              承認して投稿
            </button>
            <button
              disabled={busy}
              onClick={handleReject}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 disabled:opacity-40"
            >
              却下
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
