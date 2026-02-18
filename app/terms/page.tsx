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

function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-semibold text-blue-300 hover:text-blue-200 underline underline-offset-4 decoration-white/20 hover:decoration-blue-300"
    >
      {children}
    </a>
  );
}

export default function TermsPage() {
  const toc = [
    { id: "agreement", label: "Agreement to Terms" },
    { id: "eligibility", label: "Eligibility & Accounts" },
    { id: "service", label: "Service Description" },
    { id: "plans", label: "Plans, Limits & Trials" },
    { id: "acceptable-use", label: "Acceptable Use" },
    { id: "customer-content", label: "Customer Content & Results" },
    { id: "privacy", label: "Privacy" },
    { id: "payments", label: "Payments & Billing" },
    { id: "ip", label: "Intellectual Property" },
    { id: "feedback", label: "Feedback" },
    { id: "availability", label: "Availability & Changes" },
    { id: "warranties", label: "Disclaimers" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "indemnity", label: "Indemnification" },
    { id: "termination", label: "Termination" },
    { id: "legal", label: "Governing Law & Disputes" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* background accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -right-28 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute -bottom-40 -left-24 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Enterprise Terms</Chip>
            <Chip>Subscription</Chip>
            <Chip>Acceptable Use</Chip>
            <Chip>IP & Liability</Chip>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight">
            Terms of Service
          </h1>

          <p className="mt-4 text-white/60 max-w-3xl leading-relaxed">
            These Terms of Service (“Terms”) govern your access to and use of{" "}
            <span className="font-semibold text-white/80">{PRODUCT}</span>, operated by{" "}
            <span className="font-semibold text-white/80">{COMPANY}</span> (“{COMPANY}”, “we”, “us”, “our”). By using
            our website, web dashboard, APIs, and desktop scan agent (collectively, the “Services”), you agree to these
            Terms.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/70">
              <div>
                <span className="font-bold text-white/85">Last updated:</span>{" "}
                {LAST_UPDATED}
              </div>
              <div className="mt-1">
                <span className="font-bold text-white/85">Support:</span>{" "}
                <a className="text-blue-300 hover:text-blue-200 font-semibold" href={`mailto:${SUPPORT_EMAIL}`}>
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
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
                  Practical Summary
                </div>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>• Use your own account. Don’t abuse the service.</li>
                  <li>• Plans enforce limits (pages/factors/features).</li>
                  <li>• We may suspend accounts that violate rules.</li>
                  <li>• You’re responsible for sites you scan.</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="space-y-12">
            <div className="space-y-10">
              <SectionTitle
                id="agreement"
                title="1) Agreement to Terms"
                subtitle="By using SupaWeb, you agree to these Terms."
              />
              <Card title="Binding terms">
                <p>
                  By accessing or using the Services, you confirm that you have read, understood, and agree to be bound
                  by these Terms. If you do not agree, do not use the Services.
                </p>
                <p className="mt-4">
                  If you are using the Services on behalf of an organization, you represent that you have authority to
                  bind that organization, and “you” includes the organization.
                </p>
              </Card>

              <SectionTitle
                id="eligibility"
                title="2) Eligibility & Accounts"
                subtitle="You must provide accurate info and keep your credentials secure."
              />
              <Card title="Account responsibility">
                <ul className="space-y-2">
                  <li>• You must provide accurate account information and keep it updated.</li>
                  <li>• You are responsible for all activity under your account.</li>
                  <li>• You must keep your login credentials secure and not share them.</li>
                </ul>
                <p className="mt-4">
                  We may require identity or ownership verification to prevent fraud or abuse.
                </p>
              </Card>

              <SectionTitle
                id="service"
                title="3) Service Description"
                subtitle="What SupaWeb provides and how the desktop scan agent fits."
              />
              <Card title="What the Services do">
                <p>
                  SupaWeb is a Revenue Intelligence platform that scans websites and translates technical, UX, and SEO
                  signals into actionable insights and business impact. The desktop application functions as a scan
                  agent. It authenticates the user, verifies subscription entitlement, runs scans within plan limits,
                  and sends results to the web dashboard.
                </p>
                <p className="mt-4">
                  You acknowledge that scan results may be estimates, directional insights, or derived from third-party
                  signals. SupaWeb does not guarantee any specific business outcome.
                </p>
              </Card>

              <SectionTitle
                id="plans"
                title="4) Plans, Limits & Trials"
                subtitle="Subscription plans may have strict limits and feature gates."
              />
              <div className="grid md:grid-cols-2 gap-6">
                <Card title="Plan limits">
                  <p>
                    Plans may include limits such as maximum pages crawled, factors scanned, or concurrency. These limits
                    may be enforced automatically in the desktop app and API.
                  </p>
                  <p className="mt-4">
                    Attempting to bypass limits (e.g., automation abuse, credential sharing, tampering) is a material
                    breach of these Terms.
                  </p>
                </Card>
                <Card title="Trials & evaluations">
                  <p>
                    If a trial is offered, it is provided “as-is” and may be modified or ended at any time. We may
                    restrict trials to prevent abuse.
                  </p>
                  <p className="mt-4">
                    Enterprise evaluations may require additional terms (e.g., DPA, security review).
                  </p>
                </Card>
              </div>

              <SectionTitle
                id="acceptable-use"
                title="5) Acceptable Use"
                subtitle="Security-grade rules. No abuse, no unlawful scanning, no disruption."
              />
              <Card title="You agree not to">
                <ul className="space-y-2">
                  <li>• Use the Services for illegal, harmful, or fraudulent activity.</li>
                  <li>• Scan targets you do not own or do not have authorization to test.</li>
                  <li>• Attempt to bypass access controls, plan limits, or entitlement checks.</li>
                  <li>• Reverse engineer, decompile, or attempt to extract source code (except where permitted by law).</li>
                  <li>• Interfere with or disrupt the Services (e.g., DDoS, scraping beyond limits, exploit attempts).</li>
                  <li>• Upload malware or use the platform to deliver malicious payloads.</li>
                </ul>
                <p className="mt-4">
                  We may suspend or terminate accounts for violations, suspected abuse, or security risk.
                </p>
              </Card>

              <SectionTitle
                id="customer-content"
                title="6) Customer Content & Results"
                subtitle="Your input stays yours; reports are generated outputs."
              />
              <Card title="Ownership & license">
                <p>
                  “Customer Content” includes URLs, scan configuration, and data you submit to the Services. You retain
                  ownership of Customer Content. You grant {COMPANY} a limited license to process Customer Content to
                  provide the Services, generate reports, and improve reliability and security.
                </p>
                <p className="mt-4">
                  “Results” include reports, findings, scoring, and impact estimates generated by the Services. Results
                  are provided for internal business use. You may share Results with your stakeholders, consultants, or
                  clients, provided you do not misrepresent Results as a guarantee.
                </p>
              </Card>

              <SectionTitle
                id="privacy"
                title="7) Privacy"
                subtitle="Privacy is governed by our Privacy Policy."
              />
              <Card title="Privacy policy">
                <p>
                  Our collection and use of personal data is described in our{" "}
                  <Anchor href="/privacy">Privacy Policy</Anchor>. By using the Services, you acknowledge that you have
                  read and understand that policy.
                </p>
              </Card>

              <SectionTitle
                id="payments"
                title="8) Payments & Billing"
                subtitle="Subscriptions, renewals, refunds, and chargebacks."
              />
              <Card title="Billing terms">
                <ul className="space-y-2">
                  <li>• Paid plans are billed in advance on a recurring basis (monthly or yearly, depending on plan).</li>
                  <li>• Taxes may apply depending on your location.</li>
                  <li>• If payment fails, we may downgrade or suspend access until resolved.</li>
                  <li>• Refunds, if any, are handled according to the purchase flow and applicable law.</li>
                </ul>
                <p className="mt-4">
                  You agree not to initiate chargebacks for valid charges. Abusive chargebacks may result in account
                  suspension.
                </p>
              </Card>

              <SectionTitle
                id="ip"
                title="9) Intellectual Property"
                subtitle="We own the platform; you get a limited license to use it."
              />
              <Card title="Platform IP">
                <p>
                  The Services, including software, design, trademarks, and documentation, are owned by {COMPANY} or its
                  licensors and are protected by intellectual property laws. Except as expressly permitted, you may not
                  copy, modify, distribute, or create derivative works of the Services.
                </p>
                <p className="mt-4">
                  Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to
                  use the Services for your internal business purposes.
                </p>
              </Card>

              <SectionTitle
                id="feedback"
                title="10) Feedback"
                subtitle="If you send ideas, we can use them without obligation."
              />
              <Card title="Feedback license">
                <p>
                  If you provide suggestions, feedback, or ideas, you grant {COMPANY} the right to use them without
                  restriction or compensation, provided we do not disclose your confidential information.
                </p>
              </Card>

              <SectionTitle
                id="availability"
                title="11) Availability & Changes"
                subtitle="We may change the product as it evolves."
              />
              <Card title="Service changes">
                <p>
                  We may modify, update, or discontinue parts of the Services, including plan limits, features, and
                  integrations, to improve security and performance. We will attempt to provide reasonable notice for
                  material changes where practicable.
                </p>
              </Card>

              <SectionTitle
                id="warranties"
                title="12) Disclaimers"
                subtitle="Important: no guarantees of rankings, revenue, or outcomes."
              />
              <Card title="No warranties">
                <p>
                  THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE”. TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY}{" "}
                  DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="mt-4">
                  SupaWeb may provide insights, estimates, forecasts, or scoring. These are informational and do not
                  guarantee results, revenue, rankings, or business outcomes.
                </p>
              </Card>

              <SectionTitle
                id="liability"
                title="13) Limitation of Liability"
                subtitle="Enterprise-standard limitation language."
              />
              <Card title="Limits">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY} WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL,
                  ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
                </p>
                <p className="mt-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY}’S TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE
                  SERVICES WILL NOT EXCEED THE AMOUNT YOU PAID TO {COMPANY} FOR THE SERVICES IN THE 3 MONTHS BEFORE THE
                  EVENT GIVING RISE TO THE CLAIM.
                </p>
              </Card>

              <SectionTitle
                id="indemnity"
                title="14) Indemnification"
                subtitle="You cover us if your use causes harm."
              />
              <Card title="Indemnity">
                <p>
                  You agree to indemnify and hold harmless {COMPANY} from claims, damages, liabilities, and expenses
                  arising from (a) your use of the Services, (b) Customer Content, (c) scanning targets without proper
                  authorization, or (d) your violation of these Terms or applicable law.
                </p>
              </Card>

              <SectionTitle
                id="termination"
                title="15) Termination"
                subtitle="We can suspend or terminate for risk, abuse, or breach."
              />
              <Card title="Termination & suspension">
                <p>
                  We may suspend or terminate access immediately if we believe you violated these Terms, pose a security
                  risk, or attempt to bypass entitlement checks/plan limits. You may stop using the Services at any time.
                </p>
                <p className="mt-4">
                  Certain sections (including IP, disclaimers, limitation of liability, indemnity) survive termination.
                </p>
              </Card>

              <SectionTitle
                id="legal"
                title="16) Governing Law & Disputes"
                subtitle="Where disputes are handled."
              />
              <Card title="Governing law">
                <p>
                  These Terms are governed by applicable law in a manner consistent with international SaaS operations.
                  For enterprise contracts, governing law and venue may be modified by a signed agreement.
                </p>
                <p className="mt-4">
                  If you are an enterprise customer and require a formal MSA/DPA, contact{" "}
                  <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
              </Card>

              <SectionTitle
                id="contact"
                title="17) Contact"
                subtitle="How to reach support."
              />
              <Card title="Contact us">
                <p>
                  Questions about these Terms? Email{" "}
                  <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
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
              </Card>
            </div>

            {/* Bottom CTA */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black">Enterprise contract pack available</h3>
              <p className="mt-2 text-white/65 max-w-3xl">
                If you need an MSA, DPA, Subprocessor List, or security documentation for procurement, email support and
                we’ll provide the latest materials.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-400"
                >
                  Email {SUPPORT_EMAIL}
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-extrabold text-white/85 hover:bg-white/[0.06]"
                >
                  View Privacy Policy
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
              <a className="hover:text-white/70" href={`https://${DOMAIN}`} target="_blank" rel="noreferrer">
                {DOMAIN}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
