// app/free-tools/page.tsx
import Link from "next/link";

export default function FreeToolsPage() {
  return (
    <main className="bg-black text-white selection:bg-blue-500/30">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0F19]/70 backdrop-blur-[12px]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0d46f2]">
              <span className="text-white">★</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">SupaWeb</h2>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link className="text-sm font-medium text-gray-400 transition-colors hover:text-white" href="/#how-it-works">
              How it Works
            </Link>
            <Link className="text-sm font-medium text-gray-400 transition-colors hover:text-white" href="/blog">
              Blog
            </Link>
            <Link className="text-sm font-medium text-gray-400 transition-colors hover:text-white" href="/calculators">
              Calculators
            </Link>
            <Link className="text-sm font-medium text-white transition-colors" href="/free-tools">
              Free Tools
            </Link>
            <Link className="text-sm font-medium text-gray-400 transition-colors hover:text-white" href="/pricing">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white" href="/login">
              Login
            </Link>
            <Link
              className="rounded-lg bg-[#0d46f2] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#0d46f2]/90"
              href="/signup"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0d46f2]/20 bg-[#0d46f2]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0d46f2]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0d46f2] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0d46f2]" />
              </span>
              Enterprise Grade Intelligence
            </div>

            <h1 className="text-5xl font-black leading-[1.1] tracking-[-0.03em] lg:text-7xl">
              Free SEO &amp; <span className="text-[#0d46f2]">Revenue</span> Tools
            </h1>

            <p className="max-w-xl text-xl leading-relaxed text-gray-400">
              Uncover lost revenue through enterprise-grade SEO and performance analysis. Identify hidden leaks in your
              site's performance today.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#tools"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0d46f2] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[#0d46f2]/90"
              >
                Run a Free Tool <span aria-hidden>→</span>
              </Link>
              <Link
                href="/sample-report"
                className="rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
              >
                View Sample Report
              </Link>
            </div>
          </div>

          {/* Dashboard Preview UI */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-[#0d46f2]/20 blur-[100px]" />
            <div className="relative rounded-2xl border border-white/20 bg-[#0B0F19]/70 p-6 shadow-2xl backdrop-blur-[12px]">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs font-mono text-gray-500">Live Revenue Intelligence Preview</span>
                </div>
                <span className="rounded bg-red-500/20 px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-red-500">
                  Live Scan
                </span>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase text-gray-500">Revenue Health Score</p>
                  <p className="text-3xl font-black">
                    64<span className="text-sm text-gray-500">/100</span>
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[64%] bg-yellow-500" />
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 border-l-[#0d46f2]/50 bg-white/5 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase text-[#0d46f2]">Monthly Impact</p>
                  <p className="text-3xl font-black">$14.2k</p>
                  <p className="mt-2 flex items-center gap-1 text-[10px] text-green-500">
                    <span aria-hidden>↗</span> Potential Recovery
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-red-500">!</span>
                    <div>
                      <p className="text-xs font-bold">LCP Latency Issue</p>
                      <p className="text-[10px] text-gray-500">Mobile impact high</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-red-500">CRITICAL RISK</span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500">⚠</span>
                    <div>
                      <p className="text-xs font-bold">Keyword Cannibalization</p>
                      <p className="text-[10px] text-gray-500">3 pages targeting same intent</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">MEDIUM RISK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <div className="whitespace-nowrap border-y border-white/5 bg-white/[0.02] px-6 py-6 overflow-x-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-12 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
          <div className="flex items-center gap-2">✓ Client-side scanning</div>
          <div className="flex items-center gap-2">✓ Revenue-weighted scoring</div>
          <div className="flex items-center gap-2">✓ Enterprise Indexing</div>
          <div className="flex items-center gap-2">✓ Real-time Analysis</div>
          <div className="flex items-center gap-2">✓ PDF Report Generation</div>
        </div>
      </div>

      {/* Tool Grid Section */}
      <section id="tools" className="bg-black px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-3xl font-black md:text-4xl">
                Choose a Tool. <span className="text-[#0d46f2]">See the Damage.</span>
              </h2>
              <p className="text-gray-400">Over 20+ free audit tools to analyze your digital footprint.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative min-w-[300px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔎</span>
                <input
                  className="w-full rounded-lg border border-white/10 bg-[#0B0F19] py-3 pl-12 pr-4 text-sm focus:border-[#0d46f2] focus:ring-0"
                  placeholder="Search for a tool..."
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button className="rounded-full bg-[#0d46f2] px-4 py-2 text-xs font-bold text-white">All Tools</button>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400 hover:bg-white/10">
              Revenue Intelligence
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400 hover:bg-white/10">
              SERP Analysis
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400 hover:bg-white/10">
              Technical Audit
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-400 hover:bg-white/10">
              Performance
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Revenue Tool (High Priority) */}
            <div className="group rounded-xl border-2 border-[#0d46f2]/50 bg-[#0B0F19] p-8 shadow-[0_0_20px_rgba(13,70,242,0.3)]">
              <div className="mb-6 flex justify-between">
                <div className="text-4xl text-[#0d46f2]">💰</div>
                <span className="h-fit rounded bg-[#0d46f2]/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0d46f2]">
                  Highly Recommended
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Projected Loss Calculator</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Calculate exactly how much revenue you are losing due to slow load times and drop-offs.
              </p>
              <Link
                href="/calculators/projected-loss"
                className="block w-full rounded-lg bg-[#0d46f2] py-3 text-center text-sm font-bold text-white transition-all hover:bg-[#0d46f2]/90"
              >
                Start Calculation
              </Link>
            </div>

            {/* SEO Tool */}
            <div className="group rounded-xl border border-white/10 bg-[#0B0F19] p-8 transition-all hover:border-white/20">
              <div className="mb-6 text-4xl text-gray-500 transition-colors group-hover:text-white">📄</div>
              <h3 className="mb-2 text-xl font-bold">Keyword Cannibalization</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Detect multiple pages ranking for the same keyword and consolidate your authority.
              </p>
              <button className="w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-bold transition-all hover:bg-white/10">
                Analyze Site
              </button>
            </div>

            {/* Performance Tool */}
            <div className="group rounded-xl border border-white/10 bg-[#0B0F19] p-8 transition-all hover:border-white/20">
              <div className="mb-6 text-4xl text-gray-500 transition-colors group-hover:text-white">⚡</div>
              <h3 className="mb-2 text-xl font-bold">Core Web Vitals Plus</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Enterprise-grade CWV monitoring with revenue-loss correlation metrics.
              </p>
              <button className="w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-bold transition-all hover:bg-white/10">
                Check Speed
              </button>
            </div>

            {/* Technical Tool */}
            <div className="group rounded-xl border border-white/10 bg-[#0B0F19] p-8 transition-all hover:border-white/20">
              <div className="mb-6 text-4xl text-gray-500 transition-colors group-hover:text-white">🗄️</div>
              <h3 className="mb-2 text-xl font-bold">Technical Index Audit</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Identify crawl budget waste and ensure high-value pages are properly indexed.
              </p>
              <button className="w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-bold transition-all hover:bg-white/10">
                Scan Index
              </button>
            </div>

            {/* Revenue Tool 2 */}
            <div className="group rounded-xl border-2 border-[#0d46f2]/50 bg-[#0B0F19] p-8 shadow-[0_0_20px_rgba(13,70,242,0.3)]">
              <div className="mb-6 flex justify-between">
                <div className="text-4xl text-[#0d46f2]">🧭</div>
                <span className="h-fit rounded bg-[#0d46f2]/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0d46f2]">
                  New Tool
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold">Conversion Leak Finder</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Pinpoint pages where users bounce before converting due to UX or SEO issues.
              </p>
              <button className="w-full rounded-lg bg-[#0d46f2] py-3 text-sm font-bold transition-all hover:bg-[#0d46f2]/90">
                Find Leaks
              </button>
            </div>

            {/* SERP Tool */}
            <div className="group rounded-xl border border-white/10 bg-[#0B0F19] p-8 transition-all hover:border-white/20">
              <div className="mb-6 text-4xl text-gray-500 transition-colors group-hover:text-white">👁️</div>
              <h3 className="mb-2 text-xl font-bold">SERP Volatility Tracker</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Monitor search landscape changes and get alerted when your rankings are at risk.
              </p>
              <button className="w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-bold transition-all hover:bg-white/10">
                Track SERPs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Output Proof Section */}
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-black leading-tight">
              Actionable Reports That Drive <span className="text-[#0d46f2]">Executive Buy-In.</span>
            </h2>
            <ul className="space-y-4">
              {[
                {
                  title: "Estimated Monthly Recoverable Revenue",
                  desc: "We tie every issue to a dollar value to help you prioritize high-impact fixes.",
                },
                {
                  title: "Technical Roadmap Integration",
                  desc: "Developer-friendly tickets generated automatically for every critical issue found.",
                },
                {
                  title: "Benchmarking vs Top Competitors",
                  desc: "See how your revenue leaks compare to others in your industry.",
                },
              ].map((it) => (
                <li key={it.title} className="flex items-start gap-4">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded bg-[#0d46f2]/20">
                    <span className="text-sm font-bold text-[#0d46f2]">✓</span>
                  </div>
                  <div>
                    <p className="font-bold">{it.title}</p>
                    <p className="text-sm leading-relaxed text-gray-500">{it.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full flex-1">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0d46f2]/50 to-purple-500/50 blur opacity-30 transition duration-1000 group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F19] shadow-2xl">
                <div className="relative p-8 pb-0">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">PDF</span>
                      <span className="text-xs font-mono uppercase text-gray-500">Audit_Report_v2.pdf</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                      <div className="h-3 w-3 rounded-full bg-white/10" />
                    </div>
                  </div>

                  <div className="select-none space-y-4 blur-[2px] opacity-40">
                    <div className="h-4 w-3/4 rounded bg-white/10" />
                    <div className="h-4 w-1/2 rounded bg-white/10" />
                    <div className="h-32 rounded-xl border border-white/5 bg-white/5" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 rounded-xl bg-white/5" />
                      <div className="h-20 rounded-xl bg-white/5" />
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="scale-110 rounded-2xl border border-white/20 bg-[#0d46f2] px-8 py-6 shadow-2xl">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/70">
                        Impact Analysis
                      </p>
                      <p className="text-3xl font-black text-white">
                        +$12,400 <span className="text-sm font-medium">/ month</span>
                      </p>
                      <p className="mt-2 text-xs italic text-white/80">Recoverable through optimization</p>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 h-32 bg-gradient-to-t from-black to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[#0B0F19]/70 p-16 text-center backdrop-blur-[12px]">
          <h2 className="mb-6 text-4xl font-black md:text-5xl">
            Stop Guessing. <br />
            Start Seeing <span className="text-[#0d46f2]">Revenue Loss.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
            Join over 2,500+ enterprises using SupaWeb to protect their digital growth. Run your first audit in under 60
            seconds.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-xl bg-[#0d46f2] px-10 py-5 text-xl font-bold text-white shadow-xl shadow-[#0d46f2]/20 transition-all hover:bg-[#0d46f2]/90"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="rounded-xl bg-white/5 px-10 py-5 text-xl font-bold text-white transition-all hover:bg-white/10"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0d46f2]/20">
              <span className="text-sm font-bold text-[#0d46f2]">★</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">SupaWeb</h2>
            <span className="ml-4 text-xs text-gray-600">© 2024 SupaWeb Intelligence. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-8">
            <Link className="text-xs text-gray-500 transition-colors hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="text-xs text-gray-500 transition-colors hover:text-white" href="/terms">
              Terms of Service
            </Link>
            <Link className="text-xs text-gray-500 transition-colors hover:text-white" href="/contact">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
