export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="flex items-center justify-between">
          <div className="text-xl font-semibold">SupaWeb</div>
          <nav className="flex gap-6 text-sm text-white/80">
            <a href="/pricing" className="hover:text-white">Pricing</a>
            <a href="/about" className="hover:text-white">About</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </nav>
        </header>

        <section className="mt-20">
          <h1 className="text-5xl font-bold leading-tight">
            Revenue Intelligence for Websites
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl">
            SupaWeb scans your website with a desktop crawl agent, evaluates revenue-impacting factors
            across performance, UX, content, technical, and trust signals, and publishes a revenue-focused
            report on the web dashboard.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="/pricing"
              className="rounded-lg bg-white px-5 py-3 text-black font-medium hover:bg-white/90"
            >
              View Pricing
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-white/20 px-5 py-3 text-white font-medium hover:border-white/40"
            >
              Contact Support
            </a>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <Card title="Desktop Scan Agent" desc="Runs locally to crawl and compute. Results are viewed online." />
            <Card title="Plan-Enforced Limits" desc="Free/Pro/Scale/Enterprise limits enforced by Supabase entitlements." />
            <Card title="Revenue-Focused Reporting" desc="Maps issues to revenue loss & recovery potential in the dashboard." />
          </div>

          <p className="mt-14 text-sm text-white/50">
            SupaWeb is a Revenue Intelligence tool (not an SEO tool). Reports focus on revenue impact and prioritized fixes.
          </p>
        </section>

        <footer className="mt-24 border-t border-white/10 pt-8 text-sm text-white/50 flex gap-6">
          <a href="/privacy" className="hover:text-white/70">Privacy</a>
          <a href="/terms" className="hover:text-white/70">Terms</a>
        </footer>
      </div>
    </main>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
    </div>
  );
}
