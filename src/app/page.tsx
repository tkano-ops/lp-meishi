export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="text-sm tracking-widest text-[var(--color-hitoiro-mute)] mb-6">
          HITOIRO by goodcast
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
          あなたの色を、
          <br />
          一枚に。
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-hitoiro-mute)] leading-relaxed">
          完全オーダーメイドのLP型デジタル名刺。
          <br />
          NFCカードをかざすだけで、あなた専用のページが立ち上がる。
        </p>
        <p className="text-xs text-[var(--color-hitoiro-mute)] mt-12">
          coming soon — 2026
        </p>
      </div>
    </main>
  );
}
