import Link from "next/link";

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            {/* Background accents */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[90px]" />
                <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[90px]" />
                <div className="absolute top-1/3 left-[-160px] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[90px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40" />
            </div>

            {/* Top nav (page-only, no layout changes) */}
            <header className="relative z-10 border-b border-white/10 bg-slate-950/60 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-white/10">
                            <span className="text-sm font-black tracking-tight text-indigo-200">SW</span>
                        </span>
                        <span className="text-sm font-semibold tracking-tight text-white">
                            SupaWeb <span className="text-slate-400">Labs</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
                        <Link href="/pricing" className="hover:text-white transition-colors">
                            Pricing
                        </Link>
                        <Link href="/security" className="hover:text-white transition-colors">
                            Security
                        </Link>
                        <Link href="/contact" className="hover:text-white transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/pricing"
                            className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10 transition md:inline-flex"
                        >
                            View Pricing
                        </Link>
                        <Link
                            href="/"
                            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="relative z-10">
                <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8 lg:pt-20">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                                <span className="inline-flex h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.8)]" />
                                Revenue Intelligence — Enterprise-ready execution model
                            </div>

                            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                How SupaWeb Works
                            </h1>

                            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                                From raw SEO data to revenue impact in three precise stages.
                                SupaWeb turns technical findings into business outcomes your team can act on—fast, clearly,
                                and with enterprise-grade discipline.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400 transition"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 transition"
                                >
                                    View Pricing
                                </Link>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                    Plan-enforced crawl limits
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                    Secure processing
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                    Web dashboard output
                                </span>
                            </div>
                        </div>

                        {/* Hero card */}
                        <div className="relative">
                            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-blue-500/10 to-violet-500/20 blur-2xl" />
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="text-xs font-semibold text-slate-300">Execution Pipeline</div>
                                    <div className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                                        Mission Control
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            Pages
                                        </div>
                                        <div className="mt-2 text-2xl font-extrabold text-white">
                                            1,000<span className="text-sm font-semibold text-slate-500"> / cap</span>
                                        </div>
                                        <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                                            <div className="h-1.5 w-[55%] rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.7)]" />
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            Factors
                                        </div>
                                        <div className="mt-2 text-2xl font-extrabold text-white">
                                            800<span className="text-sm font-semibold text-slate-500"> / cap</span>
                                        </div>
                                        <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
                                            <div className="h-1.5 w-[68%] rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.65)]" />
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            Output
                                        </div>
                                        <div className="mt-2 text-2xl font-extrabold text-white">Web</div>
                                        <div className="mt-2 text-xs font-semibold text-slate-400">
                                            Dashboard + Exports + Sharing
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-xs font-bold text-white">Why it’s built this way</div>
                                            <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                                Desktop runs the heavy crawl and factor execution. The web publishes results for
                                                filtering, comparisons, exports, and stakeholder sharing—without storing unnecessary raw data.
                                            </p>
                                        </div>
                                        <div className="hidden sm:block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-200">
                                            Agent-first
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-slate-400">
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                        Supabase Auth
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                        Polar subscriptions
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                        Vercel APIs
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                                        Plan enforcement
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 STEPS */}
            <section className="relative z-10">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Three stages. One outcome: clarity.
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
                                SupaWeb doesn’t “report.” It executes a controlled intelligence pipeline—then publishes a
                                decision-grade outcome online.
                            </p>
                        </div>
                        <div className="hidden md:block text-right text-xs text-slate-400">
                            Minimal surface area. Maximum enterprise confidence.
                        </div>
                    </div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {/* Step 1 */}
                        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/7">
                            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-indigo-500/15 blur-2xl transition group-hover:bg-indigo-500/25" />
                            <div className="flex items-center justify-between">
                                <div className="text-5xl font-black tracking-tight text-white/10">01</div>
                                <div className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-200">
                                    Crawl &amp; Analyze
                                </div>
                            </div>

                            <h3 className="mt-4 text-xl font-bold text-white">Crawl &amp; Analyze</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                The desktop agent performs a deep crawl and executes your plan’s factor set.
                                You get technical + SEO + UX intelligence with consistent enforcement and reproducible runs.
                            </p>

                            <ul className="mt-5 space-y-2 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-indigo-400" />
                                    Deep crawl with controlled scope and caps
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-indigo-400" />
                                    400+ / 800+ / 1200+ / 1600+ factors (by plan)
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-indigo-400" />
                                    Built for reliability, not “pretty charts”
                                </li>
                            </ul>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Output
                                </div>
                                <div className="mt-1 text-sm font-semibold text-white">
                                    Normalized findings per page + factor
                                </div>
                            </div>
                        </article>

                        {/* Step 2 */}
                        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/7">
                            <div className="absolute -left-20 top-8 h-44 w-44 rounded-full bg-blue-500/12 blur-2xl transition group-hover:bg-blue-500/22" />
                            <div className="flex items-center justify-between">
                                <div className="text-5xl font-black tracking-tight text-white/10">02</div>
                                <div className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-200">
                                    Revenue Mapping
                                </div>
                            </div>

                            <h3 className="mt-4 text-xl font-bold text-white">Revenue Mapping</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                We translate technical risk into financial impact—so stakeholders can understand
                                what’s broken, what it costs, and what’s worth fixing first.
                            </p>

                            <ul className="mt-5 space-y-2 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-blue-400" />
                                    Dollar-impact estimates per category and issue type
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-blue-400" />
                                    Risk scoring and opportunity calculation
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-blue-400" />
                                    Executive-ready summary with audit evidence
                                </li>
                            </ul>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Output
                                </div>
                                <div className="mt-1 text-sm font-semibold text-white">
                                    Revenue loss + recovery opportunity model
                                </div>
                            </div>
                        </article>

                        {/* Step 3 */}
                        <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/7">
                            <div className="absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-violet-500/12 blur-2xl transition group-hover:bg-violet-500/22" />
                            <div className="flex items-center justify-between">
                                <div className="text-5xl font-black tracking-tight text-white/10">03</div>
                                <div className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-200">
                                    Action &amp; Recovery
                                </div>
                            </div>

                            <h3 className="mt-4 text-xl font-bold text-white">Action &amp; Recovery</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                SupaWeb publishes a prioritized roadmap for your team. Fixes are structured, not vague—
                                built to ship, validate, and track recovery over time.
                            </p>

                            <ul className="mt-5 space-y-2 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-violet-400" />
                                    Developer-ready tasks with evidence and priority
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-violet-400" />
                                    Roadmap view (quick wins → deep fixes)
                                </li>
                                <li className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-violet-400" />
                                    Recovery tracking and re-scan comparisons
                                </li>
                            </ul>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Output
                                </div>
                                <div className="mt-1 text-sm font-semibold text-white">
                                    Prioritized execution plan + measurable outcomes
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Enterprise Validation */}
            <section className="relative z-10">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">Built for Serious Growth Teams</h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
                            Whether you ship SEO at scale or manage performance budgets, SupaWeb is designed to fit enterprise workflows.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "SEO Teams",
                                desc: "Quantify impact beyond rankings—tie technical debt to revenue outcomes.",
                            },
                            {
                                title: "Growth Teams",
                                desc: "Find the highest-leverage fixes that move conversion and retention.",
                            },
                            {
                                title: "Agencies",
                                desc: "Deliver investor-grade audits that justify budgets and win deals.",
                            },
                            {
                                title: "Enterprise",
                                desc: "Handle large footprints with strict limits, repeatability, and governance.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/7"
                            >
                                <div className="text-sm font-semibold text-white">{item.title}</div>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                                <div className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-200">
                                    Enterprise aligned
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Strip */}
            <section className="relative z-10 border-y border-white/10 bg-slate-950/50">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-300">
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">GDPR ready</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                            Enterprise-grade architecture
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Secure processing</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Transparent pricing</span>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-slate-950/40 to-blue-500/10 p-8 shadow-2xl sm:p-12">
                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-[90px]" />
                        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-blue-500/15 blur-[90px]" />

                        <div className="relative">
                            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                Ready to See What You&apos;re Losing?
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">
                                Start with a controlled scan. Get a clear, revenue-weighted action plan. Then publish results online for your team and stakeholders.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400 transition"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                                >
                                    Talk to Sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer (includes How It Works link) */}
            <footer className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid gap-10 md:grid-cols-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-white/10">
                                    <span className="text-sm font-black tracking-tight text-indigo-200">SW</span>
                                </span>
                                <div className="leading-tight">
                                    <div className="text-sm font-semibold text-white">SupaWeb Labs</div>
                                    <div className="text-xs text-slate-400">Revenue Intelligence Platform</div>
                                </div>
                            </div>
                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
                                SupaWeb converts site issues into revenue impact—then publishes a decision-grade roadmap online.
                            </p>
                            <p className="mt-4 text-sm text-slate-300">
                                Support:{" "}
                                <a
                                    className="font-semibold text-indigo-200 hover:text-indigo-100 transition"
                                    href="mailto:support@supaweblabs.com"
                                >
                                    support@supaweblabs.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Product</div>
                            <div className="mt-4 grid gap-3 text-sm">
                                <Link href="/how-it-works" className="text-slate-300 hover:text-white transition-colors">
                                    How It Works
                                </Link>
                                <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">
                                    Pricing
                                </Link>
                                <Link href="/download" className="text-slate-300 hover:text-white transition-colors">
                                    Download
                                </Link>
                                <Link href="/billing" className="text-slate-300 hover:text-white transition-colors">
                                    Billing
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Trust &amp; Legal</div>
                            <div className="mt-4 grid gap-3 text-sm">
                                <Link href="/security" className="text-slate-300 hover:text-white transition-colors">
                                    Security
                                </Link>
                                <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                                <Link href="/cookie" className="text-slate-300 hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                                <Link href="/refund-policy" className="text-slate-300 hover:text-white transition-colors">
                                    Refund Policy
                                </Link>
                                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                        <div>© {new Date().getFullYear()} SupaWeb Labs. All rights reserved.</div>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">GDPR-ready posture</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Secure processing</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Transparent pricing</span>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
