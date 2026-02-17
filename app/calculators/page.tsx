// app/calculators/page.tsx
import Link from "next/link";

export default function CalculatorsPage() {
  return (
    <main className="antialiased transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-100">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#020617]/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f1] text-white">
                <span className="material-icons-outlined text-xl">insights</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight">SupaWeb</span>
            </Link>

            <div className="hidden items-center space-x-8 md:flex">
              <Link className="text-sm font-medium transition-colors hover:text-[#6366f1]" href="/calculators">
                Calculators
              </Link>
              <Link className="text-sm font-medium transition-colors hover:text-[#6366f1]" href="/#solutions">
                Solutions
              </Link>
              <Link className="text-sm font-medium transition-colors hover:text-[#6366f1]" href="/pricing">
                Pricing
              </Link>
              <Link className="text-sm font-medium transition-colors hover:text-[#6366f1]" href="/#resources">
                Resources
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link className="text-sm font-semibold hover:opacity-80" href="/login">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[#6366f1] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#6366f1]/20 transition-transform hover:scale-105"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden pb-24 pt-20"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(2, 6, 23, 0) 70%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-[#6366f1]/20 bg-[#6366f1]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#6366f1]">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-[#6366f1]" />
            New: Q4 Revenue Forecaster
          </div>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
            Revenue Intelligence <br />
            <span className="bg-gradient-to-r from-[#6366f1] via-indigo-400 to-[#6366f1] bg-clip-text text-transparent">
              That Scales With You
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
            Stop guessing your growth. Use our data-backed calculators to forecast ROI and identify leaks in your
            funnel. Trusted by 5,000+ revenue leaders.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#tools"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6366f1] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#6366f1]/30 transition-colors hover:bg-indigo-600 sm:w-auto"
            >
              Start Calculating Free <span className="material-icons-outlined">arrow_forward</span>
            </Link>

            <Link
              href="/pricing"
              className="w-full rounded-xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0f172a] dark:hover:bg-slate-800 sm:w-auto"
            >
              Compare Plans
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              <img
                alt="User 1"
                className="h-8 w-8 rounded-full border-2 border-white dark:border-[#020617]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjHx2CBo5NnSOVSqZqP4sIN3J63x_8_3Rplx1qUIyxkDJwClQHTd4RCxHxFb4SVaCp61VrVFl0S-Mw_aTf3jZsENAXvHFgvp8RZg6Lbikve3YDB0iHnSW8CiQMoWQOBjFET3Ws7Qmopgtuc_RgiQYkR5zBhLo5l4Bz1DrPt2_qeA_bdHb1J8HcmWjK8dAM1X1OvIriO5Nb0HTHA3jeWZeKUlMFzGQBldEdfsCRRhSec4YpcT9yPIr7nncVYQZGo1ieI9m6MsCl398"
              />
              <img
                alt="User 2"
                className="h-8 w-8 rounded-full border-2 border-white dark:border-[#020617]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_a-xzg8_1IWI78Y-EMRo6SZI4PbPOT0-W3d0EczAIUZUW-9MrXUB6nhRE6pefKj6bzyDn29o-rFdYP9YzwqpmkpfGUO-OH3Afx-EJiQMjkc9_qoqAezZdCOngexQUNPLGdxhoC4dY-_shjFF1PVysR1htSZBzBL72hENymPzLsUqEISpCrXo1VHSGI43YR9BuHQW1Ifhj3yEsfexBpnTnakr8IKn8EqsaGFkDi4zbS4iWy8nPr7AGUDP4ZnDTENUjULbmBzVGvik"
              />
              <img
                alt="User 3"
                className="h-8 w-8 rounded-full border-2 border-white dark:border-[#020617]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKP52uOHamBrPr4awneOGoLAMbrP6jTnaKQfhq505cNVMpPjzJ5VW38_TvX0gGuGNVYF7w00TO7olJglAg42tIjAU241riFYoNEGev7omeKZTXul78lv_wMsrnq7BIsAiBEJ1Zbgry46EeNoGuW7Qtm4C4aVVjl88CGVQzkrYgStdanU8ddnGCVkDzHm_NtD-ns_YrQQ3O_Dk49KKFoun6IYHaYUPADLKqonq5tcc6g_En7l09-EQtJIShyH5z4b8Y7JKTon1CAcQ"
              />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
              No credit card required. 2-minute setup.
            </p>
          </div>
        </div>
      </section>

      {/* Logos Strip */}
      <section className="border-y border-slate-200 bg-slate-50/50 py-12 dark:border-slate-800 dark:bg-[#0f172a]/30">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
            Trusted by the world's most innovative revenue teams
          </p>

          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale contrast-125 dark:invert">
            <img
              alt="Partner"
              className="h-6"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS2Yq4O7KF2Gc3PucHoBW1UlO2UxiKgKXVwb82yLgCochz6jP-eUSmnJvijTU0dbexn-BTM2h83bzTRZjDl5mC611NazsotE-mBOCbvph1SkdNhCvc-HXmsynt4d--2J-p4jrCY33BuUy-VvWcqrklFIje1iNXqezOm6b1Ztkxkd7y0l6QHsKgwkAm51-Twmd5sszb6FDcNWIvpLwnS3zgHhGOndKMpCdJz6T0rYoLvDhq8UXvwpx7Xg1YN6FzAlzqFXla6iW6fus"
            />
            <img
              alt="Partner"
              className="h-7"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdSGY6nVG-tcR156prbaK1MoG3XNIXz5MIzzrRBrDsB6zB6udrtq-zi2Su_MdCs9pU3UqirLBIQb5G2FYDOiWGWsULGTum3StSg3bqYOP_y19skabyVCbC_PpEwGtXvI84d2AtxC1kVyWO70b1MHuR4f4audQ29Pvf232VmbvLN5ShN3jY-9HY0TeNCfP73xGasx44Zf2clDT8GWZC9ug3LgBPlB_o-rCcBCrU7H5oxkLSZ0tKs1ftfhTUkIqN3v8lJ-oDvmIdTPQ"
            />
            <img
              alt="Partner"
              className="h-6"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAS_QSd75OMTlsJHlRkXENaK1GjN3olxW7JPP5zFRUdIS5N0DPVIiZqH2Ullp2uuIXUg93ApCvfHPyjpLpH_WDd483uHlnfikOnTXoIRdqWBgAgBWC7y-sJtIrlo_LL0fWTVkFpdvfY4F1i7YRkuGk4SAw0AgYjDbAX-pK28KHxzVlfsnOp-qLbMz7HGqLaeKmWMuTtYmdYB5Pxr-HADd8lRmuepOfYbs9WDfisM2hXbMp8mg64VqiARR2Z1QsvTjqjJW3mHne7bA"
            />
            <img
              alt="Partner"
              className="h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAviX43iAPZLII2blfis78uB3uwzH_m1nEmp7LcrjGdM1vetGWFaeTuZINdoJB0gV8uWODcOc61jgOI-QummG8yKC3A6wxivFM7cVjeZnYM68VfnYee7u0vAGO0P9skG28cCVTqz1_dZSlStYosxSWdwidp8X5BXYzC_KR0QfvMoUNKdSVCnVJjEngIMiVD4JovcsJo79a0UzSChzaSe3_JKNJ5m3TEymNJbp2MavhmDp7IaIhsyyEa-ex6Atok6Nxs23emWmJKicw"
            />
            <img
              alt="Partner"
              className="h-7"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdVZPk_R5RtpAD19ZbpjSHOvUf9uVi1mWir09Jgb49pQUCv5qtdeBNvMj8gUXc-0l97jpBKGhqrcp1pXj8s-tQ6XVWlxqfpWu_Db3-J6TZhvjQ56ajk8ccX-fyv8PxTHqpN6vM0Q2PvQIIw1ONS0TRptUQ1ViJemmz19LdM5oD5SxpIHNpPxRrTTAl9sYlsG_WakX7JCoeXkbwrVQINpIljE6j_aMTLUjgCREEFYgZlqhXGXXRUFsoRx_kHGi8YHQj-cRkianUvgw"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 flex flex-wrap items-center justify-center gap-2">
            <button className="rounded-lg bg-[#6366f1] px-5 py-2 text-sm font-bold text-white">All Tools</button>
            {[
              "Revenue Growth",
              "Marketing ROI",
              "Churn & Retention",
              "Sales Ops",
              "Hiring & Ops",
            ].map((t) => (
              <button
                key={t}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-[#6366f1] dark:border-slate-800 dark:bg-[#0f172a] dark:text-slate-400"
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#6366f1] dark:border-slate-800 dark:bg-[#1e293b] dark:hover:border-[#6366f1]/50">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6366f1]/10 text-[#6366f1] dark:bg-[#6366f1]/20">
                  <span className="material-icons-outlined">trending_up</span>
                </div>
                <span className="rounded bg-orange-100 px-2 py-1 text-[10px] font-bold uppercase text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                  Trending
                </span>
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                For CMOs
              </p>
              <h3 className="mb-3 text-xl font-bold">SEO Revenue Forecaster</h3>
              <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Calculate the direct impact of organic search traffic on your bottom line.
              </p>
              <Link
                href="/calculators/seo-revenue-forecaster"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-[#6366f1] transition-all group-hover:bg-[#6366f1] group-hover:text-white dark:bg-slate-800"
              >
                Calculate <span className="material-icons-outlined text-sm">open_in_new</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#6366f1] dark:border-slate-800 dark:bg-[#1e293b] dark:hover:border-[#6366f1]/50">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-500 dark:bg-indigo-500/20">
                  <span className="material-icons-outlined">sync_alt</span>
                </div>
                <span className="rounded bg-blue-100 px-2 py-1 text-[10px] font-bold uppercase text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  New
                </span>
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                For RevOps
              </p>
              <h3 className="mb-3 text-xl font-bold">Churn vs Expansion</h3>
              <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Visualize the net dollar retention based on churn rates and upsell potential.
              </p>
              <Link
                href="/calculators/churn-vs-expansion"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-[#6366f1] transition-all group-hover:bg-[#6366f1] group-hover:text-white dark:bg-slate-800"
              >
                Calculate <span className="material-icons-outlined text-sm">open_in_new</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#6366f1] dark:border-slate-800 dark:bg-[#1e293b] dark:hover:border-[#6366f1]/50">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-500 dark:bg-purple-500/20">
                  <span className="material-icons-outlined">person_search</span>
                </div>
                <span className="rounded bg-red-100 px-2 py-1 text-[10px] font-bold uppercase text-red-600 dark:bg-red-500/20 dark:text-red-400">
                  Urgent
                </span>
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                For VPs of Sales
              </p>
              <h3 className="mb-3 text-xl font-bold">Cost of Delayed Hiring</h3>
              <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                How much revenue are you losing for every month an AE seat is empty?
              </p>
              <Link
                href="/calculators/cost-of-delayed-hiring"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-[#6366f1] transition-all group-hover:bg-[#6366f1] group-hover:text-white dark:bg-slate-800"
              >
                Calculate <span className="material-icons-outlined text-sm">open_in_new</span>
              </Link>
            </div>

            {/* Card 4 */}
            <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#6366f1] dark:border-slate-800 dark:bg-[#1e293b] dark:hover:border-[#6366f1]/50">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-500 dark:bg-emerald-500/20">
                  <span className="material-icons-outlined">pie_chart</span>
                </div>
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                For Growth Leads
              </p>
              <h3 className="mb-3 text-xl font-bold">LTV:CAC Ratio Tool</h3>
              <p className="mb-8 flex-grow text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Determine if your unit economics are healthy enough to scale spend.
              </p>
              <Link
                href="/calculators/ltv-cac"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-[#6366f1] transition-all group-hover:bg-[#6366f1] group-hover:text-white dark:bg-slate-800"
              >
                Calculate <span className="material-icons-outlined text-sm">open_in_new</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-white py-24 dark:bg-[#020617]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-4xl font-extrabold leading-tight md:text-5xl">
                Used by 5,000+ <br /> Revenue Leaders
              </h2>

              <blockquote className="mb-8">
                <p className="text-xl font-medium italic leading-relaxed text-slate-600 dark:text-slate-400">
                  "SupaWeb has completely changed how we pitch our budget to the board. The ROI calculators gave us the
                  hard data we needed to justify a 2x increase in our marketing spend."
                </p>
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  alt="Sarah Jenkins"
                  className="h-14 w-14 rounded-full ring-2 ring-[#6366f1]/20"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk84XBplUj6AImFhStPc55Ny15bMpVakDJQZpYlDHGymwGKIZ4gIYjvwGqKdKR3zMpYKKhqXBLqehqEtwWleSh7eJTvFpzrmaRGiLdZAkzkhJsAQyJYmWRtxc9LMLdTh0UNsv9N8Ijlz_daNbYBcvcHiDyoPY92Yv2Ybi6Bi5UX2eV68fvpupMq-xHKKQ0OKYeP-DywVSPnP-wLL_L-32RMXhYCxMmoq5V2NCjxPQQiFjwnsup3v-1F50Wwpx7Wtnt6GQzhHNZFzs"
                />
                <div>
                  <p className="text-lg font-bold">Sarah Jenkins</p>
                  <p className="text-sm text-slate-500">VP Marketing at CloudScale</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "12M+", label: "Revenue Tracked" },
                { value: "5k+", label: "Active Users" },
                { value: "98%", label: "Accuracy Rating" },
                { value: "24/7", label: "Real-time Data" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-3xl border border-indigo-100 bg-indigo-50 p-8 text-center dark:border-slate-800 dark:bg-[#0f172a]"
                >
                  <p className="mb-1 text-4xl font-extrabold text-[#6366f1]">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#0f172a] py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-extrabold md:text-6xl">
            Still unsure? <br /> Start free in minutes.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-indigo-200">
            No credit card, no commitments. Just high-accuracy revenue intelligence at your fingertips.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-xl bg-[#6366f1] px-10 py-4 text-lg font-bold shadow-xl shadow-[#6366f1]/30 transition-colors hover:bg-indigo-600 sm:w-auto"
            >
              Start Free Now
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-10 py-4 text-lg font-bold backdrop-blur-md transition-colors hover:bg-white/20 sm:w-auto"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-900 dark:bg-[#020617]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#6366f1] text-white">
                <span className="material-icons-outlined text-xs">insights</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight">SupaWeb</span>
            </Link>

            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-500">
              <Link className="transition-colors hover:text-[#6366f1]" href="/privacy">
                Privacy Policy
              </Link>
              <Link className="transition-colors hover:text-[#6366f1]" href="/terms">
                Terms of Service
              </Link>
              <Link className="transition-colors hover:text-[#6366f1]" href="/contact">
                Contact Sales
              </Link>
            </div>

            <p className="text-sm text-slate-400 dark:text-slate-600">© 2024 SupaWeb Intelligence Inc.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
