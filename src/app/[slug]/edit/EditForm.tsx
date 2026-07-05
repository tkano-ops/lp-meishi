"use client";

import { useState } from "react";
import type { ContactLink, Achievement, SnsLink } from "@/lib/types";

const CONTACT_TYPES: ContactLink["type"][] = ["line", "email", "calendly", "phone", "form"];
const SNS_PLATFORMS: SnsLink["platform"][] = [
  "x",
  "instagram",
  "youtube",
  "note",
  "linkedin",
  "tiktok",
  "facebook",
  "website",
];

const inputClass =
  "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400";
const growInputClass = `${inputClass} flex-1 min-w-0`;

export function EditForm({
  slug,
  token,
  initialContact,
  initialAchievements,
  initialSns,
}: {
  slug: string;
  token: string;
  initialContact: ContactLink[];
  initialAchievements: Achievement[];
  initialSns: SnsLink[];
}) {
  const [contact, setContact] = useState<ContactLink[]>(initialContact);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [sns, setSns] = useState<SnsLink[]>(initialSns);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setResult(null);
    try {
      const res = await fetch(`/api/client-edit/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, contact, achievements, sns }),
      });
      setResult(res.ok ? "success" : "error");
    } catch {
      setResult("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">連絡先</h2>
        {contact.map((c, i) => (
          <div key={i} className="flex gap-2 items-start">
            <select
              value={c.type}
              onChange={(e) =>
                setContact(contact.map((v, j) => (j === i ? { ...v, type: e.target.value as ContactLink["type"] } : v)))
              }
              className={`${inputClass} w-28 flex-shrink-0`}
            >
              {CONTACT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              value={c.url}
              placeholder="URL"
              onChange={(e) => setContact(contact.map((v, j) => (j === i ? { ...v, url: e.target.value } : v)))}
              className={growInputClass}
            />
            <input
              value={c.label}
              placeholder="表示テキスト"
              onChange={(e) => setContact(contact.map((v, j) => (j === i ? { ...v, label: e.target.value } : v)))}
              className={growInputClass}
            />
            <button
              onClick={() => setContact(contact.filter((_, j) => j !== i))}
              className="text-xs text-gray-400 hover:text-red-500 flex-shrink-0 px-2 py-2"
            >
              削除
            </button>
          </div>
        ))}
        <button
          onClick={() => setContact([...contact, { type: "email", url: "", label: "" }])}
          className="text-xs text-gray-500 hover:text-gray-900"
        >
          + 連絡先を追加
        </button>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">実績</h2>
        {achievements.map((a, i) => (
          <div key={i} className="flex gap-2 items-start">
            <input
              value={a.label}
              placeholder="実績（例: 支援実績200社以上）"
              onChange={(e) =>
                setAchievements(achievements.map((v, j) => (j === i ? { ...v, label: e.target.value } : v)))
              }
              className={growInputClass}
            />
            <input
              value={a.detail ?? ""}
              placeholder="補足（任意）"
              onChange={(e) =>
                setAchievements(achievements.map((v, j) => (j === i ? { ...v, detail: e.target.value } : v)))
              }
              className={growInputClass}
            />
            <input
              value={a.date ?? ""}
              placeholder="年月（任意）"
              onChange={(e) =>
                setAchievements(achievements.map((v, j) => (j === i ? { ...v, date: e.target.value } : v)))
              }
              className={`${inputClass} w-28 flex-shrink-0`}
            />
            <button
              onClick={() => setAchievements(achievements.filter((_, j) => j !== i))}
              className="text-xs text-gray-400 hover:text-red-500 flex-shrink-0 px-2 py-2"
            >
              削除
            </button>
          </div>
        ))}
        <button
          onClick={() => setAchievements([...achievements, { label: "" }])}
          className="text-xs text-gray-500 hover:text-gray-900"
        >
          + 実績を追加
        </button>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">SNSリンク</h2>
        {sns.map((s, i) => (
          <div key={i} className="flex gap-2 items-start">
            <select
              value={s.platform}
              onChange={(e) =>
                setSns(sns.map((v, j) => (j === i ? { ...v, platform: e.target.value as SnsLink["platform"] } : v)))
              }
              className={`${inputClass} w-28 flex-shrink-0`}
            >
              {SNS_PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <input
              value={s.url}
              placeholder="URL"
              onChange={(e) => setSns(sns.map((v, j) => (j === i ? { ...v, url: e.target.value } : v)))}
              className={growInputClass}
            />
            <button
              onClick={() => setSns(sns.filter((_, j) => j !== i))}
              className="text-xs text-gray-400 hover:text-red-500 flex-shrink-0 px-2 py-2"
            >
              削除
            </button>
          </div>
        ))}
        <button
          onClick={() => setSns([...sns, { platform: "website", url: "" }])}
          className="text-xs text-gray-500 hover:text-gray-900"
        >
          + SNSリンクを追加
        </button>
      </section>

      <div className="flex items-center gap-3">
        <button
          disabled={saving}
          onClick={handleSave}
          className="text-sm px-4 py-2 rounded-full bg-gray-900 text-white disabled:opacity-40"
        >
          {saving ? "保存中..." : "保存する"}
        </button>
        {result === "success" && <span className="text-xs text-emerald-600">保存しました</span>}
        {result === "error" && <span className="text-xs text-red-500">保存に失敗しました</span>}
      </div>
    </div>
  );
}
