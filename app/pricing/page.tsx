// app/pricing/page.tsx
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* NAV */}
      <nav className="fixed z-50 w-full border-b border-slate-200/50 bg-slate-50/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="text-sm font-black text-white">S</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Supa<span className="bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">Web</span>
              </span>
            </Link>

            <div className="hidden items-center gap-8 font-medium md:flex">
              <Link className="transition-colors hover:text-indigo-500" href="/#platform">
                Platform
              </Link>
              <Link className="transition-colors hover:text-indigo-500" href="/#solutions">
                Solutions
              </Link>
              <Link className="font-bold text-indigo-500" href="/pricing">
                Pricing
              </Link>
              <Link className="transition-colors hover:text-indigo-500" href="/#resources">
                Resources
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link className="px-5 py-2.5 font-semibold transition-colors hover:text-indigo-500" href="/login">
                Log in
              </Link>
              <Link
                className="rounded-full bg-indigo-500 px-6 py-2.5 font-bold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105"
                href="/signup"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <header className="px-4 pb-20 pt-40 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="mb-6 inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-indigo-500">
            Scale Your Revenue
          </span>

          <h1 className="mb-6 font-sans text-5xl font-extrabold leading-tight md:text-7xl">
            Revenue Intelligence That{" "}
            <span className="bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Scales With You
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-500 dark:text-slate-400">
            Choose the plan that fits your growth stage — from foundational visibility to full-scale intelligence.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-xl bg-indigo-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-500/30 transition-all hover:-translate-y-1 sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              href="/#demo"
              className="w-full rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 sm:w-auto"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </header>

      {/* CARDS */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-slate-500">Free Plan</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-slate-400">/ month</span>
              </div>
            </div>
            <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
              Perfect for exploring the platform and basic tracking.
            </p>
            <ul className="mb-10 flex-grow space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <span className="text-emerald-500">✓</span> 400+ Factors Scanned
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-emerald-500">✓</span> 20 Crawl Pages Limit
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-emerald-500">✓</span> Chrome Extension
              </li>
            </ul>
            <Link
              href="/signup"
              className="w-full rounded-xl border border-slate-200 py-3 text-center font-bold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Start Free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative z-10 flex flex-col rounded-2xl border-2 border-indigo-500 bg-white p-8 shadow-2xl backdrop-blur-xl dark:bg-slate-900 lg:scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-4 py-1 text-xs font-black uppercase tracking-widest text-white">
              Most Popular
            </div>

            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-indigo-500">Pro Plan</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$49</span>
                <span className="text-slate-400">/ month</span>
              </div>
            </div>
            <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
              Advanced tools for growing sites needing more intelligence.
            </p>
            <ul className="mb-10 flex-grow space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <span className="text-indigo-500">✓</span> 800+ Factors Scanned
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-indigo-500">✓</span> 1,000 Pages Limit
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-indigo-500">✓</span> Full Keyword Analysis
              </li>
            </ul>

            <Link
              href="/signup"
              className="w-full rounded-xl bg-indigo-500 py-3 text-center font-bold text-white shadow-lg shadow-indigo-500/30 transition-opacity hover:opacity-90"
            >
              Unlock Pro Insights
            </Link>
          </div>

          {/* Scale */}
          <div className="flex flex-col rounded-2xl border border-purple-300 bg-white/70 p-8 shadow-sm backdrop-blur-xl dark:border-purple-700/50 dark:bg-slate-900/60">
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-purple-600 dark:text-purple-400">Scale Plan</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$149</span>
                <span className="text-slate-400">/ month</span>
              </div>
            </div>
            <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
              For high-traffic operations and multi-site management.
            </p>
            <ul className="mb-10 flex-grow space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <span className="text-purple-500">✓</span> 1,200+ Factors Scanned
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-purple-500">✓</span> 20,000 Pages Limit
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-purple-500">✓</span> Desktop App Included
              </li>
            </ul>
            <Link
              href="/signup"
              className="w-full rounded-xl border border-purple-200 py-3 text-center font-bold text-purple-600 transition-colors hover:bg-purple-50 dark:border-purple-900/50 dark:text-purple-400 dark:hover:bg-purple-900/20"
            >
              Start Scaling Now
            </Link>
          </div>

          {/* Enterprise */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-slate-500">Enterprise Plan</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">$499</span>
                <span className="text-slate-400">/ month</span>
              </div>
            </div>
            <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
              Full-scale revenue intelligence for global brands.
            </p>
            <ul className="mb-10 flex-grow space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <span className="text-slate-700 dark:text-slate-300">✓</span> 1,600+ Factors Scanned
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-slate-700 dark:text-slate-300">✓</span> 1 Million Pages Limit
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="text-slate-700 dark:text-slate-300">✓</span> Dedicated Strategist
              </li>
            </ul>
            <Link
              href="/contact"
              className="w-full rounded-xl border border-slate-200 py-3 text-center font-bold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="bg-slate-50 px-4 py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold">Detailed Comparison</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Everything you need to know about our capabilities.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-800/60">
                  <th className="p-6 font-bold text-slate-900 dark:text-white">Feature</th>
                  <th className="p-6 font-bold text-slate-900 dark:text-white">Free</th>
                  <th className="p-6 font-bold text-indigo-500">Pro</th>
                  <th className="p-6 font-bold text-purple-600 dark:text-purple-400">Scale</th>
                  <th className="p-6 font-bold text-slate-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                  <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400" colSpan={5}>
                    1. QUOTAS
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-sm font-medium">Total Factors Scanned</td>
                  <td className="p-6 text-sm">400+ Factors</td>
                  <td className="p-6 text-sm">800+ Factors</td>
                  <td className="p-6 text-sm">1,200+ Factors</td>
                  <td className="p-6 text-sm">1,600+ Factors</td>
                </tr>
                <tr>
                  <td className="p-6 text-sm font-medium">Crawl Pages Limit</td>
                  <td className="p-6 text-sm text-slate-500">20 Pages</td>
                  <td className="p-6 text-sm font-semibold">1,000 Pages</td>
                  <td className="p-6 text-sm font-semibold">20,000 Pages</td>
                  <td className="p-6 text-sm font-semibold">1 Million Pages</td>
                </tr>

                <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                  <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400" colSpan={5}>
                    2. EXECUTION SURFACE
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-sm font-medium">Platform Access</td>
                  <td className="p-6 text-sm text-slate-500">Chrome Extension</td>
                  <td className="p-6 text-sm">Chrome Extension</td>
                  <td className="p-6 text-sm font-semibold">Desktop App</td>
                  <td className="p-6 text-sm font-semibold">Desktop App</td>
                </tr>

                <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                  <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400" colSpan={5}>
                    3. FACTORS (Foundation)
                  </td>
                </tr>
                {["Technical Core", "Basic On-Page", "Core Web Vitals"].map((name) => (
                  <tr key={name}>
                    <td className="p-6 text-sm font-medium">{name}</td>
                    <td className="p-6 text-sm">
                      <span className="font-bold text-emerald-500">✓ Included</span>
                    </td>
                    <td className="p-6 text-sm">
                      <span className="font-bold text-emerald-500">✓ Included</span>
                    </td>
                    <td className="p-6 text-sm">
                      <span className="font-bold text-emerald-500">✓ Included</span>
                    </td>
                    <td className="p-6 text-sm">
                      <span className="font-bold text-emerald-500">✓ Included</span>
                    </td>
                  </tr>
                ))}

                <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                  <td className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400" colSpan={5}>
                    4. FACTORS (Growth)
                  </td>
                </tr>
                {[
                  { name: "Link Graph", free: "✕ Locked" },
                  { name: "Content Quality", free: "✕ Locked" },
                  { name: "Keyword Analysis", free: "✕ Locked" },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="p-6 text-sm font-medium">{row.name}</td>
                    <td className="p-6 text-sm">
                      <span className="text-rose-400">{row.free}</span>
                    </td>
                    <td className="p-6 text-sm">
                      <span className="font-bold text-emerald-500">✓ Included</span>
                    </td>
                    <td className="p-6 text-sm">
                      <span className="font-bold text-emerald-500">✓ Included</span>
                    </td>
                    <td className="p-6 text-sm">
                      <span className="font-bold text-emerald-500">✓ Included</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ + CTA + FOOTER (مختصر علشان ما يطولش عليك) */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-slate-900 p-12 text-center text-white dark:bg-indigo-950 md:p-16 md:text-left">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
                Ready to unlock your revenue potential?
              </h2>
              <p className="text-lg text-slate-300">
                Join 10,000+ companies scaling with SupaWeb Intelligence.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-2xl bg-white px-10 py-5 text-xl font-black text-slate-900 transition-colors hover:bg-slate-100"
              >
                Get Started Now
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl border border-white/20 bg-white/10 px-10 py-5 text-xl font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-12 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
              <span className="text-xs font-black text-white">S</span>
            </div>
            <span className="font-extrabold tracking-tight">SupaWeb</span>
          </Link>

          <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
            <Link className="hover:text-indigo-500" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-indigo-500" href="/terms">
              Terms of Service
            </Link>
            <Link className="hover:text-indigo-500" href="/contact">
              API Docs
            </Link>
          </div>

          <div className="text-sm text-slate-400">© 2024 SupaWeb Intelligence Inc.</div>
        </div>
      </footer>
    </main>
  );
}
