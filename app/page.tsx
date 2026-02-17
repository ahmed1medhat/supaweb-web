// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="font-sans antialiased bg-slate-950 text-slate-50">

      
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                {/* بدل Material Icons: حرف S بسيط */}
                <span className="text-sm font-black">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                SupaWeb
              </span>
            </div>

            <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-400 md:flex">
              <Link className="transition-colors hover:text-white" href="/how-it-works">
                How it Works
              </Link>
              <Link className="transition-colors hover:text-white" href="/blog">
                Blog
              </Link>
              <Link className="transition-colors hover:text-white" href="/calculators">
                Calculators
              </Link>
              <Link className="transition-colors hover:text-white" href="/free-tools">
                Free Tools
              </Link>
              <Link className="transition-colors hover:text-white" href="/pricing">
                Pricing
              </Link>
              <Link className="transition-colors hover:text-white" href="/download">
                Download
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
                href="/login"
              >
                Log in
              </Link>
              <Link
                className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
                href="/signup"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pb-24 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="z-10">
              <span className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                NEW: Revenue Leakage Audit 2.0
              </span>

              <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
                You’re Losing Revenue Right Now —{" "}
                <span className="text-blue-500">SupaWeb</span> Shows You Where
              </h1>

              <p className="mb-10 max-w-lg text-xl leading-relaxed text-slate-400">
                The first intelligence platform that connects SEO, performance,
                and UX issues directly to lost dollars. Audit your site in 120
                seconds.
              </p>

              <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="rounded-xl bg-blue-500 px-8 py-4 text-center text-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-500/40"
                >
                  Reveal My Revenue Loss
                </Link>

                <Link
                  href="/calculators"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-8 py-4 text-lg font-bold transition-all hover:bg-slate-800"
                >
                  Run Revenue Calculator
                </Link>
              </div>

              <p className="ml-1 text-sm text-slate-500">
                Free · No credit card · Takes ~2 minutes
              </p>
            </div>

            <div className="relative">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-400/10 blur-[100px]" />

              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-1 shadow-2xl shadow-blue-500/10">
                <div className="overflow-hidden rounded-xl bg-slate-900">
                  <div className="p-6">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="h-5 w-40 rounded-full bg-slate-800" />
                      <div className="flex h-8 w-24 items-center justify-center rounded border border-blue-500/30 bg-blue-500/20 text-xs font-bold text-blue-400">
                        LIVE FEED
                      </div>
                    </div>

                    <div className="mb-8 grid grid-cols-3 gap-4">
                      <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Revenue Health
                        </div>
                        <div className="text-3xl font-bold text-white">
                          72<span className="text-lg text-slate-600">/100</span>
                        </div>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
                          <div className="h-full w-[72%] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Est. Monthly Impact
                        </div>
                        <div className="text-3xl font-bold text-emerald-400">
                          +$1,280
                        </div>
                        <div className="mt-2 inline-block rounded border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                          +5.2%
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Risk Level
                        </div>
                        <div className="text-3xl font-bold uppercase tracking-tight text-red-400">
                          High
                        </div>
                        <div className="mt-2 text-[10px] text-slate-400">
                          3 urgent items
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-slate-800/30 p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="text-xs font-bold uppercase tracking-widest text-white">
                          Quick Wins
                        </div>
                        <Link
                          href="/dashboard"
                          className="cursor-pointer text-xs font-bold text-blue-500 hover:underline"
                        >
                          View All
                        </Link>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900 p-3 text-xs">
                          <span className="text-slate-300">
                            Fix 404 on Pricing Page
                          </span>
                          <span className="font-bold text-emerald-400">
                            +8 pts
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900 p-3 text-xs">
                          <span className="text-slate-300">
                            Update CTA contrast
                          </span>
                          <span className="font-bold text-emerald-400">
                            +15 pts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME STRIP */}
      <section className="border-y border-white/5 bg-slate-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 text-center md:grid-cols-3">
            <div className="group cursor-default">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-500 transition-colors group-hover:text-blue-400">
                Outcome
              </h3>
              <p className="text-3xl font-bold text-white">
                Recover up to 22% of abandoned revenue.
              </p>
            </div>
            <div className="group cursor-default">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-500 transition-colors group-hover:text-blue-400">
                Understanding
              </h3>
              <p className="text-3xl font-bold text-white">
                Pinpoint technical debt costing you money.
              </p>
            </div>
            <div className="group cursor-default">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-500 transition-colors group-hover:text-blue-400">
                Action
              </h3>
              <p className="text-3xl font-bold text-white">
                Zero-fluff task lists for your dev team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">How It Works</h2>
            <p className="mx-auto max-w-xl text-slate-400">
              Three steps to financial clarity on your digital assets through our
              proprietary analysis engine.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Install & Sync",
                desc: "Connect your URL and Search Console. We scan your entire ecosystem in minutes with deep crawl technology.",
              },
              {
                n: "2",
                title: "Revenue Analysis",
                desc: "Our engine identifies SEO gaps and performance bottlenecks, then assigns a real-time dollar value to each.",
              },
              {
                n: "3",
                title: "Recover Revenue",
                desc: "Execute the 'Quick Wins' and watch your conversion rates and revenue metrics climb immediately.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="rounded-2xl border border-white/5 bg-slate-900/50 p-10 transition-all duration-300 hover:border-blue-500/50"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-2xl font-bold text-blue-500">
                  {item.n}
                </div>
                <h4 className="mb-4 text-2xl font-bold text-white">
                  {item.title}
                </h4>
                <p className="leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Simple, Scaleable Pricing
            </h2>
            <p className="text-slate-400">Start for free, upgrade as you grow.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {/* Free */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-all hover:border-white/20">
              <div className="mb-2 font-bold text-slate-400">Free</div>
              <div className="mb-8 text-4xl font-bold text-white">
                $0<span className="text-sm font-normal text-slate-500">/mo</span>
              </div>
              <ul className="mb-10 flex-grow space-y-4 text-sm text-slate-400">
                <li>✓ 1 Website</li>
                <li>✓ Basic Revenue Audit</li>
                <li>✓ PDF Summary</li>
              </ul>
              <Link
                href="/signup"
                className="w-full rounded-xl border border-white/10 py-3 text-center text-sm font-bold text-white transition-all hover:bg-white/5"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-all hover:border-white/20">
              <div className="mb-2 font-bold text-slate-400">Pro</div>
              <div className="mb-8 text-4xl font-bold text-white">
                $49<span className="text-sm font-normal text-slate-500">/mo</span>
              </div>
              <ul className="mb-10 flex-grow space-y-4 text-sm text-slate-400">
                <li>✓ 5 Websites</li>
                <li>✓ Full Intelligence</li>
                <li>✓ Unlimited Quick Wins</li>
              </ul>
              <Link
                href="/pricing"
                className="w-full rounded-xl border border-white/10 py-3 text-center text-sm font-bold text-white transition-all hover:bg-white/5"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Scale */}
            <div className="relative flex flex-col rounded-2xl border-2 border-blue-500 bg-slate-900 p-8 shadow-2xl shadow-blue-500/10">
              <span className="absolute right-1/2 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/20">
                Most Popular
              </span>
              <div className="mb-2 font-bold text-blue-500">Scale</div>
              <div className="mb-8 text-4xl font-bold text-white">
                $149<span className="text-sm font-normal text-slate-500">/mo</span>
              </div>
              <ul className="mb-10 flex-grow space-y-4 text-sm text-slate-400">
                <li>✓ 20 Websites</li>
                <li>✓ API Access</li>
                <li>✓ Priority Support</li>
              </ul>
              <Link
                href="/pricing"
                className="w-full rounded-xl bg-blue-500 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-8 transition-all hover:border-white/20">
              <div className="mb-2 font-bold text-slate-400">Enterprise</div>
              <div className="mb-8 text-4xl font-bold text-white">Custom</div>
              <ul className="mb-10 flex-grow space-y-4 text-sm text-slate-400">
                <li>✓ Unlimited Websites</li>
                <li>✓ Dedicated Strategist</li>
                <li>✓ Custom Integrations</li>
              </ul>
              <Link
                href="/contact"
                className="w-full rounded-xl border border-white/10 py-3 text-center text-sm font-bold text-white transition-all hover:bg-white/5"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-blue-500/90" />
        <div className="absolute inset-0 opacity-10 [background-image:url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-10 text-5xl font-black leading-tight tracking-tight text-white">
            See What Your Site <br />
            Is Really Costing You
          </h2>

          <Link
            href="/signup"
            className="inline-block rounded-2xl bg-white px-12 py-6 text-2xl font-bold text-blue-500 shadow-2xl shadow-black/20 transition-all hover:scale-105 hover:bg-slate-50"
          >
            Reveal My Revenue Loss
          </Link>

          <p className="mt-10 text-lg font-medium text-blue-100/80">
            Join 12,000+ businesses optimizing their revenue with SupaWeb.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-white">
                <span className="text-[10px] font-black">S</span>
              </div>
              <span className="text-lg font-bold text-white">SupaWeb</span>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-sm font-medium text-slate-500">
              <Link className="transition-colors hover:text-white" href="/privacy">
                Privacy Policy
              </Link>
              <Link className="transition-colors hover:text-white" href="/terms">
                Terms of Service
              </Link>
              <Link className="transition-colors hover:text-white" href="/security">
                Security Status
              </Link>
              <Link className="transition-colors hover:text-white" href="/contact">
                Contact Support
              </Link>
            </div>

            <div className="text-sm font-medium text-slate-600">
              © 2024 SupaWeb Intelligence Inc.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
