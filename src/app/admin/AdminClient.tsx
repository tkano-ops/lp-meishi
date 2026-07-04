"use client";

import { useState } from "react";

type HearingEntry = {
  slug: string;
  name: string;
  subtitle: string;
  savedAt: string;
  json: string;
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

export function AdminClient({ entry }: { entry: HearingEntry }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([entry.json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entry.slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div>
          <p className="font-medium text-gray-900 text-sm">{entry.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {entry.subtitle || entry.slug}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-400">
            {formatDate(entry.savedAt)}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100">
          <div className="flex items-center justify-between px-5 py-2 bg-gray-50">
            <span className="text-xs text-gray-400 font-mono">
              {entry.slug}.json
            </span>
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                ダウンロード
              </button>
              <button
                onClick={handleCopy}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                {copied ? "コピー済み ✓" : "JSONをコピー"}
              </button>
            </div>
          </div>
          <pre className="text-xs text-gray-700 p-5 overflow-x-auto max-h-96 leading-relaxed bg-white">
            {entry.json}
          </pre>
        </div>
      )}
    </div>
  );
}
