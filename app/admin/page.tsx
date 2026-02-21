import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-slate-100">
      <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/30">
        <h1 className="text-3xl font-bold tracking-tight text-white">Admin Panel</h1>
        <p className="mt-2 text-sm text-slate-400">Admin tools placeholder pages.</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href="/admin/campaigns" className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm hover:border-cyan-400/40">
            Campaigns
          </Link>
          <Link href="/admin/integrations" className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm hover:border-cyan-400/40">
            Integrations
          </Link>
          <Link href="/admin/blog" className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm hover:border-cyan-400/40">
            Blog
          </Link>
          <Link href="/admin/courses" className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm hover:border-cyan-400/40">
            Courses
          </Link>
        </div>
      </section>
    </main>
  );
}
