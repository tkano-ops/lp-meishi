"use client";

import { useState } from "react";

export function ClientLinkClient({
  slug,
  name,
  initialToken,
}: {
  slug: string;
  name: string;
  initialToken: string | null;
}) {
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const editUrl = token
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/${slug}/edit?token=${token}`
    : null;

  const handleIssue = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/client-overrides/${slug}`, { method: "POST" });
      const json = await res.json();
      if (res.ok) setToken(json.token);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!editUrl) return;
    navigator.clipboard.writeText(editUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-medium text-gray-900 text-sm">{name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{slug}</p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {editUrl ? (
          <button onClick={handleCopy} className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            {copied ? "コピー済み ✓" : "編集リンクをコピー"}
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={handleIssue}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-900 text-white disabled:opacity-40"
          >
            {loading ? "発行中..." : "編集リンクを発行"}
          </button>
        )}
      </div>
    </div>
  );
}
