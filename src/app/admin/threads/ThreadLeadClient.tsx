"use client";

import { useState } from "react";

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_LABELS: Record<ThreadLead["status"], string> = {
  new: "未対応",
  contacted: "対応済み",
  ignored: "除外",
};

export function ThreadLeadClient({ lead }: { lead: ThreadLead }) {
  const [dmDraft, setDmDraft] = useState(lead.dmDraft ?? "");
  const [status, setStatus] = useState(lead.status);
  const [copied, setCopied] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(dmDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateStatus = async (next: ThreadLead["status"]) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/thread-leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) setStatus(next);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <a
            href={`https://www.threads.net/@${lead.authorUsername}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gray-900 text-sm hover:underline"
          >
            @{lead.authorUsername}
          </a>
          <p className="text-xs text-gray-500 mt-0.5">
            {lead.sourceType === "reply" ? "リプライ" : "メンション"}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === "new"
                ? "bg-amber-50 text-amber-700"
                : status === "contacted"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {STATUS_LABELS[status]}
          </span>
          <span className="text-xs text-gray-400">{formatDate(lead.detectedAt)}</span>
        </div>
      </div>

      <div className="border-t border-gray-100 px-5 py-4 space-y-3">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.text}</p>

        {lead.leadReason && (
          <p className="text-xs text-gray-400">判定理由: {lead.leadReason}</p>
        )}

        {lead.sourcePermalink && (
          <a
            href={lead.sourcePermalink}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-gray-500 hover:text-gray-900 underline inline-block"
          >
            元の投稿を見る
          </a>
        )}

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 font-medium">DM下書き</span>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
            >
              {copied ? "コピー済み ✓" : "コピー"}
            </button>
          </div>
          <textarea
            value={dmDraft}
            onChange={(e) => setDmDraft(e.target.value)}
            rows={3}
            className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button
            disabled={updating || status === "contacted"}
            onClick={() => updateStatus("contacted")}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-900 text-white disabled:opacity-40"
          >
            対応済みにする
          </button>
          <button
            disabled={updating || status === "ignored"}
            onClick={() => updateStatus("ignored")}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 disabled:opacity-40"
          >
            除外する
          </button>
        </div>
      </div>
    </div>
  );
}
