"use client";

import React from "react";

const LAST_UPDATED = "February 18, 2026";
const COMPANY = "SupaWeb Labs";
const DOMAIN = "supaweblabs.com";
const SUPPORT_EMAIL = "support@supaweblabs.com";

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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/70">
      {children}
    </span>
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
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-extrabold text-white">{title}</h3>
      </div>
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

export default function PrivacyPage() {
  const toc = [
    { id: "overview", label: "Overview" },
    { id: "data-we-collect", label: "Data We Collect" },
    { id: "how-we-use", label: "How We Use Data" },
    { id: "legal-bases", label: "Legal Bases (GDPR)" },
    { id: "sharing", label: "Sharing & Disclosures" },
    { id: "subprocessors", label: "Subprocessors" },
    { id: "security", label: "Security" },
    { id: "retention", label: "Data Retention" },
    { id: "international", label: "International Transfers" },
    { id: "cookies", label: "Cookies" },
    { id: "rights", label: "Your Rights (GDPR/CCPA)" },
    { id: "children", label: "Children" },
    { id: "changes", label: "Policy Changes" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -right-28 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute -bottom-40 -left-24 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Enterprise Privacy</Chip>
            <Chip>GDPR</Chip>
            <Chip>CCPA/CPRA</Chip>
            <Chip>Security-first</Chip>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-4 text-white/60 max-w-3xl leading-relaxed">
            This Privacy Policy explains how <span className="font-semibold text-white/80">{COMPANY}</span> collects,
            uses, shares, and protects information when you use our website, services, and desktop scan agent
            (together, the “Services”). We are a Revenue Intelligence platform — the desktop application performs scanning,
            while reporting and results are delivered via our web dashboard.
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
                href="/terms"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/[0.06]"
              >
                Terms of Service
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
                  Quick Summary
                </div>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>• We minimize stored data.</li>
                  <li>• Plan access is enforced via account entitlements.</li>
                  <li>• We protect data using industry-standard controls.</li>
                  <li>• You can request access/deletion via support.</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="space-y-12">
            <div className="space-y-10">
              <SectionTitle
                id="overview"
                title="1) Overview"
                subtitle="What this policy covers and how the Services work."
              />

              <Card title="What SupaWeb is (and is not)">
                <p>
                  {COMPANY} provides a Revenue Intelligence platform that connects technical, UX, and performance
                  findings to business impact. The desktop application is an execution agent: it authenticates your
                  account, verifies your subscription entitlement, scans within plan limits, and uploads the results to
                  the web dashboard.
                </p>
                <p className="mt-4">
                  We do not sell personal data. We aim to store only what is required to operate the service, enforce
                  plan limits, prevent abuse, and deliver the reporting experience.
                </p>
              </Card>

              <SectionTitle
                id="data-we-collect"
                title="2) Data We Collect"
                subtitle="Information you provide, information generated by the Services, and technical logs."
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Card title="Account & Identity">
                  <ul className="space-y-2">
                    <li>• Email address, authentication identifiers, and basic account metadata.</li>
                    <li>• Subscription entitlement indicators (e.g., plan tier, status, renewal period).</li>
                    <li>• Support communications you send to us.</li>
                  </ul>
                </Card>

                <Card title="Scan & Usage Data">
                  <ul className="space-y-2">
                    <li>• Website targets you submit for scanning (URLs, crawl scope settings).</li>
                    <li>• Scan outputs (issue findings, factor results, summaries, scoring, and calculated impact models).</li>
                    <li>• Operational metrics (scan start/end, counts of pages/factors, errors, timing).</li>
                  </ul>
                </Card>

                <Card title="Payment & Billing">
                  <p>
                    Payments are processed by a third-party payment provider. We receive limited billing metadata to
                    activate or modify subscription access (e.g., plan, status, timestamps, and identifiers).
                  </p>
                </Card>

                <Card title="Device & Log Data">
                  <ul className="space-y-2">
                    <li>• IP address, device/browser identifiers, and security logs.</li>
                    <li>• API request logs (rate limiting, abuse prevention, error diagnostics).</li>
                    <li>• Cookie and analytics identifiers (where enabled).</li>
                  </ul>
                </Card>
              </div>

              <SectionTitle
                id="how-we-use"
                title="3) How We Use Data"
                subtitle="Purpose limitation: we use data to run the service, secure it, and improve it."
              />

              <Card title="Primary purposes">
                <ul className="space-y-2">
                  <li>• Provide account access and authenticate users.</li>
                  <li>• Verify subscription entitlements and enforce plan limits (pages/factors).</li>
                  <li>• Run scans, generate reports, and deliver results on the web dashboard.</li>
                  <li>• Prevent fraud, abuse, and unauthorized usage.</li>
                  <li>• Provide customer support and troubleshoot issues.</li>
                  <li>• Improve product reliability, performance, and user experience.</li>
                </ul>
              </Card>

              <SectionTitle
                id="legal-bases"
                title="4) Legal Bases (GDPR)"
                subtitle="If you are in the EEA/UK, we process personal data under these bases."
              />

              <Card title="GDPR legal bases">
                <ul className="space-y-2">
                  <li>
                    • <span className="font-semibold text-white/80">Contract:</span> to provide the Services you request,
                    including authentication, plan enforcement, scanning, and reporting.
                  </li>
                  <li>
                    • <span className="font-semibold text-white/80">Legitimate interests:</span> to secure our Services,
                    prevent abuse, and improve performance (balanced against your rights).
                  </li>
                  <li>
                    • <span className="font-semibold text-white/80">Consent:</span> where required for certain cookies or
                    marketing communications (you can withdraw anytime).
                  </li>
                  <li>
                    • <span className="font-semibold text-white/80">Legal obligation:</span> where required to comply with
                    applicable laws.
                  </li>
                </ul>
              </Card>

              <SectionTitle
                id="sharing"
                title="5) Sharing & Disclosures"
                subtitle="We share data only with service providers needed to run SupaWeb, or when required by law."
              />

              <Card title="Service providers & disclosures">
                <p>
                  We may share limited data with trusted vendors that support our infrastructure, authentication,
                  database, hosting, and payments. These providers are authorized to process data only as necessary to
                  provide services to us under contractual safeguards.
                </p>
                <p className="mt-4">
                  We may also disclose information if required by law, to protect users, prevent fraud/abuse, or enforce
                  our terms and policies.
                </p>
              </Card>

              <SectionTitle
                id="subprocessors"
                title="6) Subprocessors"
                subtitle="Transparency for enterprise buyers. This list may evolve as the product scales."
              />

              <Card title="Current subprocessors (high-level)">
                <p>
                  We use modern infrastructure vendors for hosting, database/auth, and payments. Exact names may vary by
                  region or deployment. For enterprise due diligence, request our latest Subprocessor List by emailing{" "}
                  <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-4 bg-white/[0.04] text-xs font-black uppercase tracking-wider text-white/60">
                    <div className="p-4">Provider</div>
                    <div className="p-4">Purpose</div>
                    <div className="p-4">Data Processed</div>
                    <div className="p-4">Region</div>
                  </div>
                  <div className="divide-y divide-white/10 text-sm text-white/65">
                    <div className="grid grid-cols-1 sm:grid-cols-4">
                      <div className="p-4 font-semibold text-white/80">Hosting/CDN</div>
                      <div className="p-4">Web delivery, API routing</div>
                      <div className="p-4">Requests, logs, report access</div>
                      <div className="p-4">Global</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4">
                      <div className="p-4 font-semibold text-white/80">Database/Auth</div>
                      <div className="p-4">User accounts, entitlements</div>
                      <div className="p-4">Email, user ID, plan status</div>
                      <div className="p-4">Configurable</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4">
                      <div className="p-4 font-semibold text-white/80">Payments</div>
                      <div className="p-4">Subscriptions, invoicing</div>
                      <div className="p-4">Billing metadata (limited)</div>
                      <div className="p-4">Global</div>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs text-white/45">
                  Enterprise add-on: a formal DPA and Subprocessor List are available on request.
                </p>
              </Card>

              <SectionTitle
                id="security"
                title="7) Security"
                subtitle="How we protect data and reduce risk."
              />

              <Card title="Security controls">
                <ul className="space-y-2">
                  <li>• Encryption in transit (TLS) for web/API communications.</li>
                  <li>• Access control and least-privilege principles for internal operations.</li>
                  <li>• Rate limiting and abuse protection for APIs.</li>
                  <li>• Segmentation between scanning (desktop) and reporting (web) architecture.</li>
                  <li>• Continuous monitoring and incident response procedures as the product matures.</li>
                </ul>
                <p className="mt-4">
                  No system is 100% secure. If you believe you found a security issue, email{" "}
                  <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>{" "}
                  with details.
                </p>
              </Card>

              <SectionTitle
                id="retention"
                title="8) Data Retention"
                subtitle="We keep data only as long as needed for business and legal purposes."
              />

              <Card title="Retention principles">
                <p>
                  We retain account information while your account is active. Scan results may be retained to provide
                  reporting access and historical comparisons (when enabled). We may delete or anonymize data when it is
                  no longer necessary for the purposes described in this policy, subject to legal requirements.
                </p>
                <p className="mt-4">
                  You can request deletion of your account data by emailing{" "}
                  <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
              </Card>

              <SectionTitle
                id="international"
                title="9) International Transfers"
                subtitle="Where data may be processed and the safeguards we apply."
              />

              <Card title="Transfers & safeguards">
                <p>
                  Depending on your region and configuration, data may be processed in multiple countries. When required
                  by applicable law, we rely on appropriate transfer mechanisms and contractual safeguards (e.g., SCCs)
                  to protect personal data in transit and at rest.
                </p>
              </Card>

              <SectionTitle
                id="cookies"
                title="10) Cookies"
                subtitle="How cookies are used and how you control them."
              />

              <Card title="Cookie usage">
                <p>
                  We may use cookies and similar technologies for authentication, security, and improving user
                  experience. For details and controls, see our{" "}
                  <Anchor href="/cookies">Cookie Policy</Anchor>.
                </p>
              </Card>

              <SectionTitle
                id="rights"
                title="11) Your Rights (GDPR / CCPA)"
                subtitle="Your privacy rights and how to exercise them."
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Card title="GDPR (EEA/UK)">
                  <ul className="space-y-2">
                    <li>• Right to access, rectify, or delete your personal data.</li>
                    <li>• Right to object or restrict processing in certain circumstances.</li>
                    <li>• Right to data portability.</li>
                    <li>• Right to withdraw consent (where processing relies on consent).</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, contact{" "}
                    <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
                      {SUPPORT_EMAIL}
                    </a>
                    .
                  </p>
                </Card>

                <Card title="CCPA/CPRA (California)">
                  <ul className="space-y-2">
                    <li>• Right to know what personal information is collected and how it is used.</li>
                    <li>• Right to request deletion (subject to exceptions).</li>
                    <li>• Right to correct inaccurate personal information.</li>
                    <li>• Right to opt-out of “sale” or “sharing” (we do not sell personal data).</li>
                  </ul>
                  <p className="mt-4">
                    Requests may be verified to protect your account and prevent fraud.
                  </p>
                </Card>
              </div>

              <SectionTitle
                id="children"
                title="12) Children"
                subtitle="Our Services are not intended for children."
              />

              <Card title="Age restrictions">
                <p>
                  Our Services are not directed to individuals under the age of 16 (or the age required by local law).
                  If you believe a child has provided personal data, contact{" "}
                  <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
              </Card>

              <SectionTitle
                id="changes"
                title="13) Policy Changes"
                subtitle="We may update this policy as the product evolves."
              />

              <Card title="Updates">
                <p>
                  We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated”
                  date above and may provide additional notice if required by law.
                </p>
              </Card>

              <SectionTitle
                id="contact"
                title="14) Contact"
                subtitle="How to reach us about privacy questions or requests."
              />

              <Card title="Contact us">
                <p>
                  For privacy inquiries, rights requests, or enterprise compliance questions, email{" "}
                  <a className="text-blue-300 font-semibold hover:text-blue-200" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
                <p className="mt-4 text-sm text-white/55">
                  Optional enterprise add-ons (available on request): Data Processing Addendum (DPA), Subprocessor List,
                  and security documentation suitable for procurement and investor diligence.
                </p>
              </Card>
            </div>

            {/* Bottom CTA */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black">Need enterprise compliance docs?</h3>
              <p className="mt-2 text-white/65 max-w-3xl">
                If you need a DPA, Subprocessor List, or a procurement-ready compliance pack, contact us and we’ll provide
                the latest materials.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-400"
                >
                  Email {SUPPORT_EMAIL}
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-extrabold text-white/85 hover:bg-white/[0.06]"
                >
                  View Terms of Service
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
