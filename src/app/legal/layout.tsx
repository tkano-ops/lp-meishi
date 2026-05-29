import Link from "next/link";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-6 sm:px-10 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-hitoiro-mute)] hover:text-[var(--color-hitoiro-ink)] transition-colors"
        >
          ← HITOIRO
        </Link>
        <div className="mt-12">{children}</div>
        <nav className="mt-24 pt-8 border-t border-black/10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.2em] text-[var(--color-hitoiro-mute)]">
          <Link href="/legal/terms" className="hover:text-[var(--color-hitoiro-ink)]">利用規約</Link>
          <Link href="/legal/privacy" className="hover:text-[var(--color-hitoiro-ink)]">プライバシーポリシー</Link>
          <Link href="/legal/tokushoho" className="hover:text-[var(--color-hitoiro-ink)]">特定商取引法に基づく表記</Link>
        </nav>
      </div>
    </main>
  );
}
