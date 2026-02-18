import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/30">
              <span className="text-xl leading-none">▦</span>
            </div>
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              SupaWeb
            </Link>
          </div>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-400 md:flex">
            <Link href="/how-it-works" className="transition-colors hover:text-white">
              How It Works
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-white">
              Pricing
            </Link>
            <Link href="/free-tools" className="transition-colors hover:text-white">
              Free Tools
            </Link>
            <Link href="/calculators" className="transition-colors hover:text-white">
              Calculators
            </Link>
            <Link href="/download" className="transition-colors hover:text-white">
              Download
            </Link>
            <Link href="/security" className="transition-colors hover:text-white">
              Security
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-[110px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.75)]" />
              NEW: Revenue Leakage Audit 2.0
            </div>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white lg:text-6xl">
              You’re Losing Revenue Right Now —{" "}
              <span className="text-blue-400">SupaWeb</span> Shows You Where
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400">
              Revenue Intelligence that connects technical SEO, performance, and UX issues directly to{" "}
              <span className="text-slate-200">lost dollars</span> — then turns the findings into a prioritized recovery plan.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="rounded-xl bg-blue-500 px-8 py-4 text-center text-lg font-bold text-white shadow-2xl shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40"
              >
                Reveal My Revenue Loss
              </Link>
              <Link
                href="/calculators"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800"
              >
                Run Revenue Calculator <span className="text-white/60">→</span>
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Free · No credit card · Takes ~2 minutes
            </p>
          </div>

          {/* Preview Card */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-1 shadow-2xl shadow-black/30">
              <div className="rounded-xl bg-slate-900">
                <div className="p-6">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="h-5 w-44 rounded-full bg-slate-800" />
                    <div className="flex h-8 w-24 items-center justify-center rounded border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold text-blue-300">
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
                        <div className="h-full w-[72%] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Est. Monthly Impact
                      </div>
                      <div className="text-3xl font-bold text-emerald-400">+$1,280</div>
                      <div className="mt-2 inline-block rounded border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
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
                      <div className="mt-2 text-[10px] font-bold text-slate-400">
                        3 urgent items
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-slate-800/30 p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-widest text-white">
                        Quick Wins
                      </div>
                      <Link href="/how-it-works" className="text-xs font-bold text-blue-400 hover:underline">
                        View How It Works
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900 p-3 text-xs">
                        <span className="text-slate-300">Fix 404 on Pricing Page</span>
                        <span className="font-bold text-emerald-400">+8 pts</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900 p-3 text-xs">
                        <span className="text-slate-300">Improve CTA contrast</span>
                        <span className="font-bold text-emerald-400">+15 pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-white/5 bg-slate-950/40 p-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Desktop Agent
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      Crawl + factors run locally. Results publish online for dashboards, exports, and sharing.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-blue-500/10 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Outcome Strip */}
      <section className="border-y border-white/5 bg-slate-900/40 py-14">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 text-center md:grid-cols-3 sm:px-6 lg:px-8">
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-400">
              Outcome
            </div>
            <div className="text-2xl font-bold text-white md:text-3xl">
              Recover revenue hidden in technical debt.
            </div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-400">
              Understanding
            </div>
            <div className="text-2xl font-bold text-white md:text-3xl">
              Map issues to real money impact.
            </div>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-400">
              Action
            </div>
            <div className="text-2xl font-bold text-white md:text-3xl">
              Ship fixes in priority order.
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold text-white">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Three stages from raw signals to revenue impact — built for enterprise teams.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-8 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-5xl font-black text-slate-700">01</div>
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
                  Crawl & Analyze
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Deep crawl + factor execution</h3>
              <p className="text-slate-400">
                Your desktop agent crawls site structure, parses signals, and runs plan-limited factor checks (SEO, UX, performance, technical).
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-8 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-5xl font-black text-slate-700">02</div>
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
                  Revenue Mapping
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Translate issues into dollars</h3>
              <p className="text-slate-400">
                Findings are converted into estimated loss, risk, and opportunity using traffic + conversion assumptions and weighted impact scoring.
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-8 transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900/70">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-5xl font-black text-slate-700">03</div>
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
                  Action & Recovery
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Prioritized fixes + tracking</h3>
              <p className="text-slate-400">
                The web dashboard turns findings into developer-ready tasks, comparisons, exports, and executive-ready reporting.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/how-it-works" className="text-sm font-semibold text-blue-300 hover:text-white">
              Read the full process → 
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-blue-500/90" />
        <div className="absolute inset-0 opacity-10 [background-image:url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
            See What Your Site Is Really Costing You
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="rounded-2xl bg-white px-10 py-5 text-xl font-bold text-blue-600 shadow-2xl shadow-black/20 transition-all hover:scale-[1.02]"
            >
              Reveal My Revenue Loss
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/30 bg-white/10 px-10 py-5 text-xl font-bold text-white backdrop-blur transition-all hover:bg-white/15"
            >
              Talk to Sales
            </Link>
          </div>
          <p className="mt-8 text-base font-medium text-blue-100/90">
            Desktop does the work. Web shows the intelligence.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-500 text-white">
                  <span className="text-sm leading-none">▦</span>
                </div>
                <span className="text-lg font-bold text-white">SupaWeb</span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-slate-400">
                Revenue Intelligence for modern teams. Identify leakage, quantify impact, and execute recovery with confidence.
              </p>
              <p className="mt-4 text-sm text-slate-400">
                Support:{" "}
                <a className="font-semibold text-slate-200 hover:text-white" href="mailto:support@supaweblabs.com">
                  support@supaweblabs.com
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Product
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  <li>
                    <Link href="/how-it-works" className="hover:text-white">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/download" className="hover:text-white">
                      Download
                    </Link>
                  </li>
                  <li>
                    <Link href="/billing" className="hover:text-white">
                      Billing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Trust
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  <li>
                    <Link href="/security" className="hover:text-white">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="hover:text-white">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund-policy" className="hover:text-white">
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Company
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/free-tools" className="hover:text-white">
                      Free Tools
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculators" className="hover:text-white">
                      Calculators
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} SupaWeb Labs. All rights reserved.</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/how-it-works" className="hover:text-white">
                How It Works
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/security" className="hover:text-white">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
