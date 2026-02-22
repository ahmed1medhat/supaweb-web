import Link from "next/link";

export default function AdminIntegrationsPage() {
  return (
    <section className="space-y-5">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Integrations</h1>
        <p className="mt-2 text-sm text-slate-400">
          Configure onsite embed scripts, default key behavior, and multi-site enterprise keys.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/integrations/onsite-script"
          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/40"
        >
          <p className="font-semibold text-white">Onsite Script Snippets</p>
          <p className="mt-1 text-xs text-slate-400">Option A default snippet + Option B per-site snippets.</p>
        </Link>
        <Link
          href="/admin/integrations/sites"
          className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-400/40"
        >
          <p className="font-semibold text-white">Sites</p>
          <p className="mt-1 text-xs text-slate-400">Create site keys, set allowed domains, and mark a default site.</p>
        </Link>
      </div>
    </section>
  );
}
