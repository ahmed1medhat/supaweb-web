import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Admin Home</h1>
        <p className="mt-2 text-sm text-slate-400">Manage campaigns, integrations, and content from one place.</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/admin/users"
          className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:text-white"
        >
          Users
        </Link>
        <Link
          href="/admin/coupons"
          className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:text-white"
        >
          Coupons
        </Link>
        <Link
          href="/admin/campaigns"
          className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:text-white"
        >
          Campaigns
        </Link>
        <Link
          href="/admin/integrations"
          className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:text-white"
        >
          Integrations
        </Link>
        <Link
          href="/admin/blog"
          className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:text-white"
        >
          Blog
        </Link>
        <Link
          href="/admin/courses"
          className="rounded-lg border border-white/10 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:text-white"
        >
          Courses
        </Link>
      </div>
    </section>
  );
}
