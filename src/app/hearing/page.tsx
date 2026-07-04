"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type SetupAnswers = {
  occupationType: string[];
  purpose: string[];
  designStyle: string[];
  snsPlatforms: string[];
  contactMethods: string[];
};

type ContentPart =
  | { type: "text"; content: string }
  | { type: "json"; content: string };

function parseContent(text: string): ContentPart[] {
  const parts: ContentPart[] = [];
  const regex = /```json\n([\s\S]*?)\n```/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "json", content: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text", content: text }];
}

function JsonBlock({ json }: { json: string }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  let slug = "client";
  let parsedData: unknown = null;
  try {
    parsedData = JSON.parse(json);
    slug = (parsedData as { slug?: string }).slug ?? "client";
  } catch {
    // ignore parse errors
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    if (saving || saved) return;
    setSaving(true);
    try {
      const res = await fetch("/api/hearing/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedData }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-gray-700 bg-gray-950 text-left">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
        <span className="text-xs text-gray-400 font-mono">{slug}.json</span>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`text-xs transition-colors ${
              saved
                ? "text-green-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {saved ? "保存済み ✓" : saving ? "保存中..." : "保存する"}
          </button>
          <button
            onClick={handleDownload}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ダウンロード
          </button>
          <button
            onClick={handleCopy}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            {copied ? "コピー済み ✓" : "コピー"}
          </button>
        </div>
      </div>
      <pre className="text-xs text-green-400 p-3 overflow-x-auto max-h-72 leading-relaxed">
        {json}
      </pre>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const parts = parseContent(message.content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gray-900 text-white rounded-br-sm"
            : "bg-gray-100 text-gray-900 rounded-bl-sm"
        }`}
      >
        {parts.map((part, i) =>
          part.type === "json" ? (
            <JsonBlock key={i} json={part.content} />
          ) : (
            <span key={i} className="whitespace-pre-wrap">
              {part.content}
            </span>
          )
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const OCCUPATION_OPTIONS = [
  "経営者・起業家",
  "フリーランス・個人事業主",
  "士業（弁護士・税理士など）",
  "クリエイター・専門職",
  "営業・コンサルタント",
  "その他",
];

const PURPOSE_OPTIONS = [
  "名刺交換した相手に印象づけたい",
  "新規の仕事・問い合わせにつなげたい",
  "採用・自己ブランディング",
  "SNSや実績をまとめて見せたい",
  "その他",
];

const DESIGN_STYLE_OPTIONS: {
  value: string;
  label: string;
  bg?: string;
  text?: string;
  accent?: string;
}[] = [
  { value: "mono", label: "モノクロ・スタイリッシュ", bg: "#ffffff", text: "#1a1a1a", accent: "#1a1a1a" },
  { value: "warm", label: "和風・温かみ", bg: "#f7ece0", text: "#4a3728", accent: "#c9713f" },
  { value: "dark", label: "ダーク・クール", bg: "#14171f", text: "#f5f5f5", accent: "#c9a84c" },
  { value: "light", label: "明るい・ナチュラル", bg: "#ffffff", text: "#2f2f2f", accent: "#8fae6f" },
  { value: "auto", label: "おまかせでOK" },
];

const SNS_OPTIONS = [
  "X",
  "Instagram",
  "YouTube",
  "note",
  "LinkedIn",
  "TikTok",
  "Facebook",
  "Webサイト",
  "特になし",
];

const CONTACT_OPTIONS = ["LINE", "メール", "Calendly", "電話", "フォーム", "まだ決めていない"];

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full text-sm border transition-colors ${
        active
          ? "bg-gray-900 text-white border-gray-900"
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );
}

function SetupSection({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-5 border-b border-gray-100 last:border-b-0">
      <p className="text-xs text-gray-400 mb-2">STEP {step}</p>
      <p className="text-sm font-medium text-gray-900 mb-3">{title}</p>
      {children}
    </div>
  );
}

function DesignPreviewCard({
  label,
  bg,
  text,
  accent,
  active,
  onClick,
}: {
  label: string;
  bg?: string;
  text?: string;
  accent?: string;
  active: boolean;
  onClick: () => void;
}) {
  const hasPreview = bg && text && accent;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[140px] flex-shrink-0 rounded-xl border-2 overflow-hidden text-left transition-colors ${
        active ? "border-gray-900" : "border-gray-200 hover:border-gray-400"
      }`}
    >
      {hasPreview ? (
        <div className="h-20 p-3 flex flex-col justify-between" style={{ backgroundColor: bg }}>
          <div className="w-7 h-7 rounded-full" style={{ backgroundColor: accent }} />
          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: text, opacity: 0.85 }} />
            <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: text, opacity: 0.5 }} />
          </div>
        </div>
      ) : (
        <div className="h-20 flex items-center justify-center bg-gray-50 border-b border-dashed border-gray-200">
          <span className="text-xs text-gray-400">おまかせ</span>
        </div>
      )}
      <div className="px-2.5 py-2 bg-white">
        <span className="text-xs font-medium text-gray-900 leading-snug">{label}</span>
      </div>
    </button>
  );
}

function SetupForm({ onComplete }: { onComplete: (answers: SetupAnswers) => void }) {
  const [occupationType, setOccupationType] = useState<string[]>([]);
  const [occupationOther, setOccupationOther] = useState("");
  const [purpose, setPurpose] = useState<string[]>([]);
  const [designStyle, setDesignStyle] = useState<string[]>([]);
  const [snsPlatforms, setSnsPlatforms] = useState<string[]>([]);
  const [contactMethods, setContactMethods] = useState<string[]>([]);

  const toggle = (list: string[], value: string, setList: (v: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const needsOccupationOther = occupationType.includes("その他");

  const canSubmit =
    occupationType.length > 0 &&
    (!needsOccupationOther || occupationOther.trim().length > 0) &&
    purpose.length > 0 &&
    designStyle.length > 0;

  return (
    <div className="flex flex-col h-dvh bg-white">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wide text-gray-900">
            HITOIRO
          </span>
          <span className="text-xs text-gray-400">ヒアリングAI</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-sm text-gray-600 leading-relaxed mb-1">
          まずは大枠をいくつか選んでください。
        </p>
        <p className="text-xs text-gray-400 leading-relaxed mb-2">
          このあとのチャットでは、ここで選んだ内容は聞き直しません。
        </p>

        <SetupSection step={1} title="ご職業のタイプは？（複数選択可）">
          <div className="flex flex-wrap gap-2">
            {OCCUPATION_OPTIONS.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                active={occupationType.includes(opt)}
                onClick={() => toggle(occupationType, opt, setOccupationType)}
              />
            ))}
          </div>
          {needsOccupationOther && (
            <input
              type="text"
              value={occupationOther}
              onChange={(e) => setOccupationOther(e.target.value)}
              placeholder="具体的な職業・肩書きを入力してください"
              className="mt-3 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          )}
        </SetupSection>

        <SetupSection step={2} title="LP名刺の一番の目的は？（複数選択可）">
          <div className="flex flex-wrap gap-2">
            {PURPOSE_OPTIONS.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                active={purpose.includes(opt)}
                onClick={() => toggle(purpose, opt, setPurpose)}
              />
            ))}
          </div>
        </SetupSection>

        <SetupSection step={3} title="希望するデザインの雰囲気は？（複数選択可）">
          <p className="text-xs text-gray-400 -mt-1 mb-3">
            雰囲気のイメージを簡易プレビューで表示しています
          </p>
          <div className="flex flex-wrap gap-3">
            {DESIGN_STYLE_OPTIONS.map((opt) => (
              <DesignPreviewCard
                key={opt.value}
                label={opt.label}
                bg={opt.bg}
                text={opt.text}
                accent={opt.accent}
                active={designStyle.includes(opt.value)}
                onClick={() => toggle(designStyle, opt.value, setDesignStyle)}
              />
            ))}
          </div>
        </SetupSection>

        <SetupSection step={4} title="使っているSNSは？（複数選択可）">
          <div className="flex flex-wrap gap-2">
            {SNS_OPTIONS.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                active={snsPlatforms.includes(opt)}
                onClick={() => toggle(snsPlatforms, opt, setSnsPlatforms)}
              />
            ))}
          </div>
        </SetupSection>

        <SetupSection step={5} title="お問い合わせの受け方は？（複数選択可）">
          <div className="flex flex-wrap gap-2">
            {CONTACT_OPTIONS.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                active={contactMethods.includes(opt)}
                onClick={() => toggle(contactMethods, opt, setContactMethods)}
              />
            ))}
          </div>
        </SetupSection>
      </div>

      <div className="flex-shrink-0 border-t border-gray-100 px-4 pt-3 pb-6">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={() =>
            onComplete({
              occupationType: occupationType.map((v) =>
                v === "その他" && occupationOther.trim() ? occupationOther.trim() : v
              ),
              purpose,
              designStyle,
              snsPlatforms,
              contactMethods,
            })
          }
          className="w-full rounded-full bg-gray-900 text-white py-3 text-sm font-medium disabled:opacity-30 transition-opacity hover:bg-gray-700"
        >
          この内容でヒアリングを始める
        </button>
      </div>
    </div>
  );
}

const KICKOFF_ID = "kickoff";
const KICKOFF_CONTENT = "(ヒアリングを開始してください)";

export default function HearingPage() {
  const [phase, setPhase] = useState<"setup" | "chat">("setup");
  const [setupAnswers, setSetupAnswers] = useState<SetupAnswers | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const streamReply = useCallback(
    async (history: { role: string; content: string }[], setup: SetupAnswers | null) => {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/hearing/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, setup }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            return [
              ...prev.slice(0, -1),
              { ...last, content: last.content + chunk },
            ];
          });
        }
      } catch (err) {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            {
              ...last,
              content: "エラーが発生しました。もう一度お試しください。",
            },
          ];
        });
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const startChat = useCallback(
    (answers: SetupAnswers) => {
      setSetupAnswers(answers);
      setPhase("chat");

      const kickoff: Message = {
        id: KICKOFF_ID,
        role: "user",
        content: KICKOFF_CONTENT,
      };
      setMessages([kickoff]);
      streamReply([{ role: "user", content: KICKOFF_CONTENT }], answers);
    },
    [streamReply]
  );

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await streamReply(history, setupAnswers);
  }, [input, isLoading, messages, setupAnswers, streamReply]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
  };

  if (phase === "setup") {
    return <SetupForm onComplete={startChat} />;
  }

  const visibleMessages = messages.filter((m) => m.id !== KICKOFF_ID);

  return (
    <div className="flex flex-col h-dvh bg-white">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wide text-gray-900">
            HITOIRO
          </span>
          <span className="text-xs text-gray-400">ヒアリングAI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-gray-500">オンライン</span>
        </div>
      </header>

      {/* メッセージ一覧 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {visibleMessages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {isLoading && messages[messages.length - 1]?.content === "" && (
          <TypingIndicator />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="flex-shrink-0 border-t border-gray-100 px-4 pt-3 pb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-end gap-2"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent leading-relaxed"
            style={{ minHeight: "48px", maxHeight: "128px" }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center disabled:opacity-30 transition-opacity flex-shrink-0 hover:bg-gray-700"
            aria-label="送信"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-2">
          Shift+Enter で改行
        </p>
      </div>
    </div>
  );
}
