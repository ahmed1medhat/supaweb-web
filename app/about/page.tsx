"use client";

import React from "react";

const LAST_UPDATED = "February 18, 2026";
const COMPANY = "SupaWeb Labs";
const PRODUCT = "SupaWeb";
const DOMAIN = "supaweblabs.com";
const SUPPORT_EMAIL = "support@supaweblabs.com";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/70">
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker ? (
        <div className="text-xs font-black uppercase tracking-[0.22em] text-blue-300/80">
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-white">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
          {desc}
        </p>
      ) : null}
      <div className="mt-6 h-px w-full bg-white/10" />
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 hover:bg-white/[0.04] transition-colors">
      <h3 className="text-lg font-extrabold text-white">{title}</h3>
      <div className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-xs font-black uppercase tracking-widest text-white/50">
        {label}
      </div>
      <div className="mt-2 text-3xl font-black tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-[#0b1224] px-3 py-1 text-xs font-bold text-white/70">
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-24 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute top-1/3 -left-28 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>About {PRODUCT}</Chip>
            <Chip>Revenue Intelligence</Chip>
            <Chip>Desktop Scan Agent</Chip>
            <Chip>Enterprise SaaS</Chip>
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight">
            We turn technical problems into{" "}
            <span className="text-blue-300">recoverable revenue</span>.
          </h1>

          <p className="mt-5 max-w-3xl text-white/60 leading-relaxed text-base sm:text-lg">
            {PRODUCT} helps teams stop guessing. We scan your site like an
            enterprise crawler, evaluate hundreds of factors across SEO, UX, and
            performance, and translate issues into prioritized actions that
            protect revenue.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Core promise" value="Clarity → Action → ROI" />
            <Stat label="Architecture" value="Agent + Web Dashboard" />
            <Stat label="Focus" value="Revenue leakage" />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-extrabold text-white hover:bg-blue-400"
            >
              View Pricing
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-extrabold text-white/85 hover:bg-white/[0.06]"
            >
              Talk to Support
            </a>
          </div>

          <div className="mt-6 text-xs text-white/45">
            Last updated: {LAST_UPDATED} · Support:{" "}
            <a
              className="text-blue-300 hover:text-blue-200 font-semibold"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>{" "}
            · {DOMAIN}
          </div>
        </header>

        {/* Mission / Story */}
        <section className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-10">
            <SectionTitle
              kicker="Mission"
              title="Make revenue loss visible, measurable, and fixable."
              desc="Most tools dump scores. We focus on outcomes: what’s broken, why it matters, how much it likely costs, and what to do next."
            />

            <Card title="What we believe">
              <ul className="space-y-3">
                <li>
                  <span className="font-extrabold text-white/85">
                    People don’t buy SEO tools.
                  </span>{" "}
                  They buy confidence, clarity, and the ability to prioritize.
                </li>
                <li>
                  <span className="font-extrabold text-white/85">
                    Every issue is a business decision.
                  </span>{" "}
                  If you can’t map it to impact, it never gets fixed.
                </li>
                <li>
                  <span className="font-extrabold text-white/85">
                    Execution belongs on the web.
                  </span>{" "}
                  Scanning belongs in a hardened agent that enforces limits and
                  produces a clean intelligence package.
                </li>
              </ul>
            </Card>

            <Card title="How SupaWeb works (high level)">
              <ol className="space-y-3">
                <li>
                  <span className="font-extrabold text-white/85">1) Sign in</span>{" "}
                  — authentication + entitlement is verified against your account.
                </li>
                <li>
                  <span className="font-extrabold text-white/85">
                    2) Scan with enforced limits
                  </span>{" "}
                  — plan caps control pages, factors, and workload.
                </li>
                <li>
                  <span className="font-extrabold text-white/85">
                    3) Upload & handoff
                  </span>{" "}
                  — results publish online with a single link: “View results
                  online”.
                </li>
                <li>
                  <span className="font-extrabold text-white/85">
                    4) Everything else is web
                  </span>{" "}
                  — dashboards, exports, comparisons, sharing, filters, and
                  collaboration.
                </li>
              </ol>
            </Card>
          </div>

          {/* Right side: Product pillars */}
          <div className="space-y-10">
            <SectionTitle
              kicker="Product pillars"
              title="Designed for serious teams."
              desc="SupaWeb is structured like enterprise scanners: an execution agent plus a web intelligence layer."
            />

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <Pill>Desktop Scan Agent</Pill>
                  <Pill>Hardened Execution</Pill>
                  <Pill>Plan Enforcement</Pill>
                </div>
                <h3 className="mt-4 text-xl font-black">Desktop = scanner only</h3>
                <p className="mt-2 text-white/65 leading-relaxed">
                  The desktop app is not a reporting UI. It’s a controlled scan
                  agent built to crawl, analyze, and upload—reliably and within
                  limits.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>• Mission-control scan progress</li>
                  <li>• Clear error tracking</li>
                  <li>• Upload + shareable web results link</li>
                  <li>• No exports, no dashboards on desktop</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <Pill>Web Dashboard</Pill>
                  <Pill>Reports</Pill>
                  <Pill>Sharing</Pill>
                </div>
                <h3 className="mt-4 text-xl font-black">Web = intelligence</h3>
                <p className="mt-2 text-white/65 leading-relaxed">
                  The web platform is where users explore results, export,
                  compare scans, and collaborate. It’s optimized for decision
                  making, not scanning.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>• Filters, segments, and drilldowns</li>
                  <li>• Stakeholder-ready exports</li>
                  <li>• Scan comparisons over time</li>
                  <li>• Sharing + permissions</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <Pill>Security-first</Pill>
                  <Pill>Least privilege</Pill>
                  <Pill>Enterprise posture</Pill>
                </div>
                <h3 className="mt-4 text-xl font-black">Trust by design</h3>
                <p className="mt-2 text-white/65 leading-relaxed">
                  We follow a conservative posture: minimize data, restrict
                  access, and make entitlements explicit. The desktop agent
                  verifies plan access and enforces limits automatically.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>• No secret keys inside the client</li>
                  <li>• Token-based authentication</li>
                  <li>• Webhooks update subscription state</li>
                  <li>• Clear audit boundaries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why we exist */}
        <section className="mt-16">
          <SectionTitle
            kicker="Why SupaWeb"
            title="Because “scores” don’t move revenue."
            desc="Your team needs a pipeline from issue → impact → action. That’s what we build."
          />

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Card title="Outcome-first reporting">
              Instead of generic health scores, we emphasize business impact,
              actionability, and prioritization that makes sense to executives
              and engineers.
            </Card>
            <Card title="Enterprise-style control">
              The scanner behaves like professional tooling: predictable
              execution, plan enforcement, clear limits, and operational
              transparency during scans.
            </Card>
            <Card title="Designed to scale">
              Web dashboards and exports scale with collaboration. The agent
              scales with compute control—keeping infrastructure costs sane.
            </Card>
          </div>
        </section>

        {/* Compliance / Governance style block */}
        <section className="mt-16">
          <SectionTitle
            kicker="Governance"
            title="Built to survive enterprise review."
            desc="Not legal advice — this is a product posture statement aligned with enterprise expectations."
          />

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <Card title="Data minimization">
              We avoid collecting unnecessary sensitive data. Results are
              structured for reporting and remediation, not surveillance.
            </Card>
            <Card title="Clear product boundaries">
              Desktop: scan + upload only. Web: dashboards, exports, sharing,
              filtering, comparisons. This keeps security posture clean and
              maintainable.
            </Card>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Pill>Privacy Policy</Pill>
              <Pill>Terms</Pill>
              <Pill>Cookie Policy</Pill>
              <Pill>Refund Policy</Pill>
            </div>
            <p className="mt-4 text-white/65 leading-relaxed">
              See our legal pages for details on privacy and billing terms:
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/privacy"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-extrabold text-white/80 hover:bg-white/[0.06]"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-extrabold text-white/80 hover:bg-white/[0.06]"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-extrabold text-white/80 hover:bg-white/[0.06]"
              >
                Cookie Policy
              </a>
              <a
                href="/refund"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-extrabold text-white/80 hover:bg-white/[0.06]"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 pt-8 text-xs text-white/45">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div>
              © {new Date().getFullYear()} {COMPANY}. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a className="hover:text-white/70" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              <a
                className="hover:text-white/70"
                href={`https://${DOMAIN}`}
                target="_blank"
                rel="noreferrer"
              >
                {DOMAIN}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
