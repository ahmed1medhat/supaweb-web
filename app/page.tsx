import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/30">
              <span className="text-xs font-black">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              SupaWeb
            </span>
          </Link>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-400 md:flex">
            <Link className="transition-colors hover:text-white" href="/about">
              About
            </Link>
            <Link className="transition-colors hover:text-white" href="/free-tools">
              Free Tools
            </Link>
            <Link className="transition-colors hover:text-white" href="/calculators">
              Calculators
            </Link>
            <Link className="transition-colors hover:text-white" href="/pricing">
              Pricing
            </Link>
            <Link className="transition-colors hover:text-white" href="/download">
              Download
            </Link>
            <Link className="transition-colors hover:text-white" href="/contact">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
              Support
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="z-10">
            <span className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
              NEW: Revenue Leakage Audit 2.0
            </span>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
              You’re Losing Revenue Right Now —{" "}
              <span className="text-blue-500">SupaWeb</span> Shows You Where
            </h1>

            <p className="mb-10 max-w-lg text-xl leading-relaxed text-slate-400">
              The first intelligence platform that connects SEO, performance, and
              UX issues directly to lost dollars. Audit your site in 120 seconds.
            </p>

            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/free-tools"
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

          {/* Right Card */}
          <div className="relative">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 p-1 shadow-2xl">
              <div className="overflow-hidden rounded-xl bg-slate-900 p-6">
                <div className="mb-8 flex items-center justify-between">
                  <div className="h-5 w-40 rounded-full bg-slate-800" />
                  <div className="flex h-8 w-24 items-center justify-center rounded border border-blue-500/30 bg-blue-500/20 text-xs font-bold text-blue-500">
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
                      href="/free-tools"
                      className="text-xs font-bold text-blue-500 hover:underline"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900 p-3 text-xs">
                      <span className="text-slate-300">
                        Fix 404 on Pricing Page
                      </span>
                      <span className="font-bold text-emerald-400">+8 pts</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-900 p-3 text-xs">
                      <span className="text-slate-300">Update CTA contrast</span>
                      <span className="font-bold text-emerald-400">+15 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end card */}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-y border-white/5 bg-slate-900/50 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 text-center md:grid-cols-3 sm:px-6 lg:px-8">
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
              Outcome
            </h3>
            <p className="text-3xl font-bold text-white">
              Recover up to 22% of abandoned revenue.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
              Understanding
            </h3>
            <p className="text-3xl font-bold text-white">
              Pinpoint technical debt costing you money.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
              Action
            </h3>
            <p className="text-3xl font-bold text-white">
              Zero-fluff task lists for your dev team.
            </p>
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-blue-500/90" />
        <div className="absolute inset-0 opacity-10 [background-image:url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-10 text-5xl font-black leading-tight tracking-tight text-white">
            See What Your Site <br />
            Is Really Costing You
          </h2>

          <Link
            href="/free-tools"
            className="inline-block rounded-2xl bg-white px-12 py-6 text-2xl font-bold text-blue-500 shadow-2xl shadow-black/20 transition-all hover:scale-105 hover:bg-slate-50"
          >
            Reveal My Revenue Loss
          </Link>

          <p className="mt-10 text-lg font-medium text-blue-100/80">
            Need help? Email us at{" "}
            <span className="font-semibold">support@supaweblabs.com</span>
          </p>
        </div>
      </section>

      {/* ✅ NEW PROFESSIONAL FOOTER (WITH ALL NEW PAGES) */}
      <footer className="border-t border-white/5 bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
                  <span className="text-xs font-black">S</span>
                </div>
                <span className="text-lg font-bold text-white">SupaWeb</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Revenue Intelligence that connects SEO, performance, and UX issues
                directly to lost dollars—so you can fix what matters first.
              </p>

              <div className="mt-5 text-sm text-slate-400">
                Support:{" "}
                <a
                  className="font-semibold text-white hover:underline"
                  href="mailto:support@supaweblabs.com"
                >
                  support@supaweblabs.com
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-300">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link className="hover:text-white" href="/pricing">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/download">
                    Download
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/free-tools">
                    Free Tools
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/calculators">
                    Calculators
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/billing">
                    Billing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-300">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link className="hover:text-white" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/security">
                    Security
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-300">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link className="hover:text-white" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/terms">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/cookie">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/refund">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-slate-600 md:flex-row">
            <p>© {new Date().getFullYear()} SupaWeb Labs. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link className="hover:text-white" href="/privacy">
                Privacy
              </Link>
              <Link className="hover:text-white" href="/terms">
                Terms
              </Link>
              <Link className="hover:text-white" href="/security">
                Security
              </Link>
              <Link className="hover:text-white" href="/contact">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
