import Link from "next/link";

export default function AppPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center shadow-2xl shadow-black/40">
        <h1 className="text-3xl font-bold tracking-tight text-white">Supaweb App</h1>
        <p className="mt-3 text-sm text-slate-400">
          You are signed in. This is the app landing page placeholder.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex rounded-lg border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Go to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
