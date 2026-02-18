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
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm sm:text-base text-white/60 max-w-3xl">
          {subtitle}
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <h3 className="text-lg font-extrabold text-white">{title}</h3>
      <div className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Anchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-semibold text-blue-300 hover:text-blue-200 underline underline-offset-4 decoration-white/20 hover:decoration-blue-300"
    >
      {children}
    </a>
  );
}

export default function RefundPolicyPage() {
  const toc = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Refund Eligibility" },
    { id: "nonrefundable", label: "Non-Refundable Items" },
    { id: "trials", label: "Trials & Free Plans" },
    { id: "billing", label: "Billing Cycles & Cancellations" },
    { id: "chargebacks", label: "Chargebacks & Disputes" },
    { id: "exceptions", label: "Exceptions" },
    { id: "how-to-request", label: "How to Request a Refund" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -right-28 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute -bottom-40 -left-24 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Refund Policy</Chip>
            <Chip>Billing Transparency</Chip>
            <Chip>Enterprise-grade</Chip>
            <Chip>Support-first</Chip>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight">
            Refund Policy
          </h1>

          <p className="mt-4 text-white/60 max-w-3xl leading-relaxed">
            This Refund Policy describes how refunds are handled for{" "}
            <span className="font-semibold text-white/80">{PRODUCT}</span> by{" "}
            <span className="font-semibold text-white/80">{COMPANY}</span> on{" "}
            <span className="font-semibold text-white/80">{DOMAIN}</span>. It is
            designed to be clear, fair, and aligned with enterprise SaaS
            standards.
          </p>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-sm text-white/70">
                <div>
                  <span className="font-bold text-white/85">Last updated:</span>{" "}
                  {LAST_UPDATED}
                </div>
                <div className="mt-1">
                  <span className="font-bold text-white/85">Support:</span>{" "}
                  <a
                    className="text-blue-300 hover:text-blue-200 font-semibold"
                    href={`mailto:${SUPPORT_EMAIL}`}
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="/terms"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/[0.06]"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/[0.06]"
                >
                  Privacy Policy
                </a>
                <a
                  href="/cookies"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/[0.06]"
                >
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b1224] p-4">
              <div className="text-xs font-black uppercase tracking-widest text-white/60">
                Quick summary
              </div>
              <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm text-white/65">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-extrabold text-white/85">
                    Cancel anytime
                  </div>
                  <div className="mt-1">
                    You can cancel in-product; access continues until period end.
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-extrabold text-white/85">
                    Case-by-case refunds
                  </div>
                  <div className="mt-1">
                    We evaluate fairly—especially for billing mistakes or outages.
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-extrabold text-white/85">
                    Enterprise terms
                  </div>
                  <div className="mt-1">
                    Contracted plans follow the signed order form / MSA.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Layout */}
        <div className="grid lg:grid-cols-[320px,1fr] gap-10">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-extrabold text-white/85">
                On this page
              </div>
              <nav className="mt-4 space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-xl px-3 py-2 text-sm text-white/65 hover:bg-white/[0.05] hover:text-white/85"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 rounded-xl border border-white/10 bg-[#0b1224] p-4">
                <div className="text-xs font-black uppercase tracking-widest text-white/60">
                  Need help fast?
                </div>
                <p className="mt-2 text-sm text-white/65">
                  For billing questions, email{" "}
                  <a
                    className="text-blue-300 font-semibold hover:text-blue-200"
                    href={`mailto:${SUPPORT_EMAIL}`}
                  >
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Refund%20Request%20-%20${encodeURIComponent(
                    PRODUCT
                  )}`}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-blue-400"
                >
                  Start refund request email
                </a>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="space-y-12">
            <SectionTitle
              id="overview"
              title="1) Overview"
              subtitle="We aim to be fair, transparent, and fast."
            />
            <Card title="How refunds work">
              <p>
                {COMPANY} may issue refunds in limited circumstances, typically
                when there is (a) an accidental duplicate charge, (b) a billing
                error attributable to us, or (c) a material service failure that
                meaningfully prevented access to paid features.
              </p>
              <p className="mt-4">
                Refund decisions are made case-by-case, based on account history,
                usage, the reason for the request, and applicable law.
              </p>
            </Card>

            <SectionTitle
              id="eligibility"
              title="2) Refund Eligibility"
              subtitle="Common situations where refunds may be granted."
            />
            <Card title="Eligible scenarios (examples)">
              <ul className="space-y-2">
                <li>
                  • <span className="font-semibold text-white/85">Duplicate payment</span>{" "}
                  (e.g., charged twice for the same billing period).
                </li>
                <li>
                  • <span className="font-semibold text-white/85">Billing mistake</span>{" "}
                  caused by our systems (e.g., incorrect plan charge).
                </li>
                <li>
                  • <span className="font-semibold text-white/85">Material service outage</span>{" "}
                  during a paid period (evaluated by severity and duration).
                </li>
                <li>
                  • <span className="font-semibold text-white/85">Unauthorized charge</span>{" "}
                  (subject to verification and reasonable investigation).
                </li>
              </ul>

              <p className="mt-4">
                If you believe you were charged in error, contact us as soon as
                possible so we can investigate quickly.
              </p>
            </Card>

            <SectionTitle
              id="nonrefundable"
              title="3) Non-Refundable Items"
              subtitle="Certain purchases or fees are generally not refundable."
            />
            <Card title="Generally non-refundable">
              <ul className="space-y-2">
                <li>• Taxes, government fees, and duties (where applicable).</li>
                <li>
                  • Fees charged by third parties (e.g., bank transfer fees) not
                  collected by us.
                </li>
                <li>
                  • Services already delivered (e.g., completed custom work,
                  dedicated onboarding, or professional services).
                </li>
              </ul>
              <p className="mt-4">
                If your plan includes usage-based components, consumed usage is
                typically non-refundable.
              </p>
            </Card>

            <SectionTitle
              id="trials"
              title="4) Trials & Free Plans"
              subtitle="Try before you pay — where available."
            />
            <Card title="Trials">
              <p>
                If we offer a free plan or trial, it is intended to help you
                evaluate {PRODUCT}. When a trial converts to a paid subscription,
                charges begin automatically unless you cancel before the trial
                ends (if a trial is configured that way).
              </p>
              <p className="mt-4">
                If you were charged unexpectedly after a trial, we’ll review the
                case and may refund if it was clearly accidental and promptly
                reported.
              </p>
            </Card>

            <SectionTitle
              id="billing"
              title="5) Billing Cycles & Cancellations"
              subtitle="Canceling stops future renewals, not the current period."
            />
            <Card title="Cancellations">
              <p>
                You can cancel your subscription at any time. Unless otherwise
                stated, cancellation takes effect at the end of your current
                billing period, and you will continue to have access to paid
                features until then.
              </p>
              <p className="mt-4">
                We do not typically provide prorated refunds for unused time in a
                billing cycle, except where required by law or explicitly stated
                in a written agreement.
              </p>
            </Card>

            <SectionTitle
              id="chargebacks"
              title="6) Chargebacks & Disputes"
              subtitle="Please contact us first — we can usually fix it quickly."
            />
            <Card title="Disputes">
              <p>
                If you believe there is a billing problem, contact{" "}
                <a
                  className="text-blue-300 font-semibold hover:text-blue-200"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                before filing a chargeback. Chargebacks can delay resolution and
                may result in account access being restricted while the dispute is
                investigated.
              </p>
              <p className="mt-4">
                We reserve the right to suspend accounts associated with
                fraudulent or abusive chargeback activity.
              </p>
            </Card>

            <SectionTitle
              id="exceptions"
              title="7) Exceptions"
              subtitle="Enterprise contracts and special terms may override this policy."
            />
            <Card title="Enterprise & contracted plans">
              <p>
                If you purchased {PRODUCT} under an enterprise agreement, order
                form, or MSA, refund terms (if any) are governed by that signed
                contract and may differ from this public policy.
              </p>
              <p className="mt-4">
                In the event of a conflict, the signed contract controls.
              </p>
            </Card>

            <SectionTitle
              id="how-to-request"
              title="8) How to Request a Refund"
              subtitle="Send a clear request and we’ll respond quickly."
            />
            <Card title="What to include">
              <p>To request a refund, email us and include:</p>
              <ul className="mt-4 space-y-2">
                <li>• The account email used for {PRODUCT}.</li>
                <li>• The invoice/receipt ID (if available).</li>
                <li>• The reason for the request (brief and factual).</li>
                <li>• Any relevant screenshots or logs if it’s a technical issue.</li>
              </ul>
              <p className="mt-4">
                We typically respond within a reasonable timeframe and may request
                additional information to verify ownership and payment details.
              </p>

              <div className="mt-6 rounded-xl border border-white/10 bg-[#0b1224] p-4">
                <div className="text-xs font-black uppercase tracking-widest text-white/60">
                  Refund request template
                </div>
                <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-black/30 p-4 text-xs text-white/70 border border-white/10">
{`Subject: Refund Request - ${PRODUCT}

Account email:
Invoice/receipt ID:
Date of charge:
Amount:
Reason for request:
Additional context (optional):`}
                </pre>
              </div>
            </Card>

            <SectionTitle
              id="contact"
              title="9) Contact"
              subtitle="We’re here to help."
            />
            <Card title="Contact us">
              <p>
                Email{" "}
                <a
                  className="text-blue-300 font-semibold hover:text-blue-200"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                or visit{" "}
                <a
                  className="text-blue-300 font-semibold hover:text-blue-200"
                  href={`https://${DOMAIN}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {DOMAIN}
                </a>
                .
              </p>
              <p className="mt-4">
                For privacy-related matters, refer to our{" "}
                <Anchor href="/privacy">Privacy Policy</Anchor>.
              </p>
            </Card>

            {/* bottom CTA */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black">
                Billing clarity builds trust.
              </h3>
              <p className="mt-2 text-white/65 max-w-3xl">
                If a charge looks wrong, we want to fix it fast. Email support and
                we’ll investigate with priority.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Billing%20Support%20-%20${encodeURIComponent(
                    PRODUCT
                  )}`}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-400"
                >
                  Contact billing support
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-extrabold text-white/85 hover:bg-white/[0.06]"
                >
                  View pricing
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-14 border-t border-white/10 pt-8 text-xs text-white/45">
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
