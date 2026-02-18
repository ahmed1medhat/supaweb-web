"use client";

import React, { useMemo, useState } from "react";

const LAST_UPDATED = "February 18, 2026";
const COMPANY = "SupaWeb Labs";
const PRODUCT = "SupaWeb";
const DOMAIN = "supaweblabs.com";
const SUPPORT_EMAIL = "support@supaweblabs.com";

/**
 * Cookie Policy (Enterprise-style) — UI + content in one file.
 * Notes:
 * - This page is written to be strong for reviews (e.g., Polar) and enterprise users.
 * - It explains categories, controls, retention, third parties, and “Do Not Track / GPC” notes.
 */

type CookieCategoryKey = "essential" | "analytics" | "functional" | "marketing";

type CookieCategory = {
  key: CookieCategoryKey;
  title: string;
  required: boolean;
  description: string;
  examples: string[];
};

type ExampleCookie = {
  name: string;
  provider: string;
  purpose: string;
  category: CookieCategoryKey;
  retention: string;
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/70">
      {children}
    </span>
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

function Toggle({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "w-full rounded-2xl border px-5 py-4 text-left transition",
        disabled
          ? "border-white/10 bg-white/[0.03] opacity-75 cursor-not-allowed"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold text-white">{label}</div>
          <div className="mt-1 text-sm text-white/60">
            {disabled
              ? "Always active — required for core security and functionality."
              : checked
              ? "Enabled"
              : "Disabled"}
          </div>
        </div>

        <div
          className={[
            "relative h-7 w-12 shrink-0 rounded-full border transition",
            disabled
              ? "border-white/10 bg-white/[0.06]"
              : checked
              ? "border-blue-400/30 bg-blue-500/60"
              : "border-white/15 bg-white/[0.05]",
          ].join(" ")}
          aria-hidden
        >
          <div
            className={[
              "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition",
              checked ? "left-6" : "left-1",
            ].join(" ")}
          />
        </div>
      </div>
    </button>
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

export default function CookiePolicyPage() {
  const categories: CookieCategory[] = useMemo(
    () => [
      {
        key: "essential",
        title: "Strictly Necessary (Essential)",
        required: true,
        description:
          "Required to operate the Services securely (e.g., session security, authentication, fraud prevention, load balancing). Disabling these may break login and core functionality.",
        examples: [
          "Session tokens / authentication cookies",
          "CSRF protection cookies",
          "Security / rate-limit signals",
        ],
      },
      {
        key: "analytics",
        title: "Analytics",
        required: false,
        description:
          "Used to understand usage and improve product performance (e.g., page views, feature adoption, reliability). We use aggregated metrics where possible.",
        examples: ["Traffic analytics", "Performance monitoring", "Feature usage"],
      },
      {
        key: "functional",
        title: "Functional",
        required: false,
        description:
          "Enable enhanced features and personalization (e.g., remembering preferences like theme or region).",
        examples: ["Remember language/theme", "UI preferences", "Saved settings"],
      },
      {
        key: "marketing",
        title: "Marketing",
        required: false,
        description:
          "Used to measure marketing effectiveness and show relevant messaging. We do not sell personal data.",
        examples: ["Attribution tracking", "Campaign performance", "Referral measurement"],
      },
    ],
    []
  );

  const [prefs, setPrefs] = useState<Record<CookieCategoryKey, boolean>>({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  // Example cookie table entries (safe, non-committal).
  // You can later replace providers with your actual stack (e.g., Vercel, Supabase auth, analytics provider).
  const cookieExamples: ExampleCookie[] = useMemo(
    () => [
      {
        name: "supaweb_session",
        provider: PRODUCT,
        purpose: "Maintains authenticated session and security context.",
        category: "essential",
        retention: "Session (or up to 30 days depending on settings)",
      },
      {
        name: "csrf_token",
        provider: PRODUCT,
        purpose: "Helps protect against CSRF and unauthorized requests.",
        category: "essential",
        retention: "Session",
      },
      {
        name: "pref_theme",
        provider: PRODUCT,
        purpose: "Remembers UI preferences (e.g., dark mode).",
        category: "functional",
        retention: "Up to 12 months",
      },
      {
        name: "analytics_id",
        provider: "Analytics Provider",
        purpose: "Counts visits and feature usage to improve reliability and UX.",
        category: "analytics",
        retention: "Up to 13 months",
      },
      {
        name: "utm_attribution",
        provider: "Marketing Provider",
        purpose: "Measures marketing campaign performance and attribution.",
        category: "marketing",
        retention: "Up to 90 days",
      },
    ],
    []
  );

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "what-are-cookies", label: "What are Cookies?" },
    { id: "categories", label: "Cookie Categories" },
    { id: "controls", label: "Your Choices & Controls" },
    { id: "cookie-list", label: "Example Cookie List" },
    { id: "third-parties", label: "Third Parties" },
    { id: "retention", label: "Retention" },
    { id: "international", label: "International Users" },
    { id: "updates", label: "Updates" },
    { id: "contact", label: "Contact" },
  ];

  const savePrefs = () => {
    // For now: localStorage only. Later: you can sync to user profile/server if needed.
    try {
      localStorage.setItem("supaweb_cookie_prefs", JSON.stringify(prefs));
      alert("Saved cookie preferences.");
    } catch {
      alert("Could not save preferences in this browser.");
    }
  };

  const acceptAll = () => {
    setPrefs({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
  };

  const rejectOptional = () => {
    setPrefs({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  const enabledCount = Object.values(prefs).filter(Boolean).length;

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
            <Chip>Enterprise Cookie Policy</Chip>
            <Chip>Consent & Controls</Chip>
            <Chip>Transparency</Chip>
            <Chip>No Data Selling</Chip>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight">
            Cookie Policy
          </h1>

          <p className="mt-4 text-white/60 max-w-3xl leading-relaxed">
            This Cookie Policy explains how{" "}
            <span className="font-semibold text-white/80">{COMPANY}</span> uses
            cookies and similar technologies on{" "}
            <span className="font-semibold text-white/80">{DOMAIN}</span> and
            across the {PRODUCT} Services.
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
                  href="/privacy"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/[0.06]"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/[0.06]"
                >
                  Terms of Service
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b1224] p-4">
              <div className="text-xs font-black uppercase tracking-widest text-white/60">
                Quick summary
              </div>
              <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm text-white/65">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-extrabold text-white/85">Essential cookies</div>
                  <div className="mt-1">Always on — required for security & login.</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-extrabold text-white/85">Optional cookies</div>
                  <div className="mt-1">You can enable or disable at any time.</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="font-extrabold text-white/85">No data selling</div>
                  <div className="mt-1">We don’t sell personal information.</div>
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
                  Preference status
                </div>
                <div className="mt-2 text-sm text-white/65">
                  Enabled categories:{" "}
                  <span className="font-extrabold text-white/85">
                    {enabledCount}/{categories.length}
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    onClick={acceptAll}
                    className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-extrabold text-white hover:bg-blue-400"
                  >
                    Accept all
                  </button>
                  <button
                    onClick={rejectOptional}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-extrabold text-white/85 hover:bg-white/[0.06]"
                  >
                    Reject optional
                  </button>
                  <button
                    onClick={savePrefs}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-extrabold text-white/85 hover:bg-white/[0.06]"
                  >
                    Save preferences
                  </button>
                </div>
                <p className="mt-3 text-xs text-white/50">
                  Note: Preferences are stored in your browser (localStorage) for
                  now.
                </p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="space-y-12">
            <SectionTitle
              id="overview"
              title="1) Overview"
              subtitle="Cookies help us operate securely and improve product quality."
            />
            <Card title="What this policy covers">
              <p>
                We use cookies and similar technologies (e.g., local storage,
                device identifiers, pixels) to:
              </p>
              <ul className="mt-4 space-y-2">
                <li>• Keep the Services secure (authentication, fraud prevention, abuse protection).</li>
                <li>• Remember settings (language, theme, preferences).</li>
                <li>• Understand performance and reliability (error rates, page speed, feature usage).</li>
                <li>• Measure marketing and referral effectiveness (when enabled).</li>
              </ul>
              <p className="mt-4">
                For personal data handling details, see our{" "}
                <Anchor href="/privacy">Privacy Policy</Anchor>.
              </p>
            </Card>

            <SectionTitle
              id="what-are-cookies"
              title="2) What are Cookies?"
              subtitle="Small files or identifiers stored on your device."
            />
            <Card title="Cookies and similar technologies">
              <p>
                Cookies are small text files stored on your device when you visit
                a website. Similar technologies include local storage, SDK
                identifiers, and tracking pixels. These technologies can be
                first-party (set by {PRODUCT}) or third-party (set by providers we
                use).
              </p>
              <p className="mt-4">
                Some cookies are essential, while others are optional and used
                only when you consent (where required by law).
              </p>
            </Card>

            <SectionTitle
              id="categories"
              title="3) Cookie Categories"
              subtitle="We group cookies into clear categories to make consent simple."
            />

            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((cat) => (
                <Card key={cat.key} title={cat.title}>
                  <p>{cat.description}</p>
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="text-xs font-black uppercase tracking-widest text-white/60">
                      Examples
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-white/65">
                      {cat.examples.map((ex) => (
                        <li key={ex}>• {ex}</li>
                      ))}
                    </ul>
                    <div className="mt-3 text-xs text-white/50">
                      Status:{" "}
                      <span className="font-extrabold text-white/75">
                        {cat.required ? "Always enabled" : "Optional"}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <SectionTitle
              id="controls"
              title="4) Your Choices & Controls"
              subtitle="You can control optional cookie categories and manage them in your browser."
            />
            <div className="grid lg:grid-cols-2 gap-6">
              <Card title="Cookie preference controls">
                <p>
                  You can enable or disable optional cookies using the controls
                  below. Essential cookies cannot be disabled because the
                  Services depend on them for core security and authentication.
                </p>

                <div className="mt-6 space-y-3">
                  <Toggle
                    checked={prefs.essential}
                    disabled
                    label="Essential cookies"
                    onChange={() => {}}
                  />
                  <Toggle
                    checked={prefs.analytics}
                    label="Analytics cookies"
                    onChange={(next) =>
                      setPrefs((p) => ({ ...p, analytics: next }))
                    }
                  />
                  <Toggle
                    checked={prefs.functional}
                    label="Functional cookies"
                    onChange={(next) =>
                      setPrefs((p) => ({ ...p, functional: next }))
                    }
                  />
                  <Toggle
                    checked={prefs.marketing}
                    label="Marketing cookies"
                    onChange={(next) =>
                      setPrefs((p) => ({ ...p, marketing: next }))
                    }
                  />
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={savePrefs}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-400"
                  >
                    Save preferences
                  </button>
                  <button
                    onClick={rejectOptional}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-extrabold text-white/85 hover:bg-white/[0.06]"
                  >
                    Reject optional
                  </button>
                </div>
              </Card>

              <Card title="Browser-level controls">
                <p>
                  Most browsers allow you to delete cookies or block them. You can
                  manage this in your browser settings. Note that blocking
                  essential cookies may prevent login and core features from
                  working.
                </p>
                <p className="mt-4">
                  Some browsers also offer “Do Not Track” signals. Because there
                  is no universally accepted standard, our response may vary
                  depending on local legal requirements and the features you use.
                </p>
                <p className="mt-4">
                  If you use Global Privacy Control (GPC) where applicable, we
                  honor it to the extent required by law and supported by our
                  systems.
                </p>
              </Card>
            </div>

            <SectionTitle
              id="cookie-list"
              title="5) Example Cookie List"
              subtitle="This is a representative list. Actual cookies may vary by environment and features."
            />
            <Card title="Representative examples (not exhaustive)">
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-white/[0.04]">
                    <tr className="text-white/70">
                      <th className="px-4 py-3 font-extrabold">Name</th>
                      <th className="px-4 py-3 font-extrabold">Provider</th>
                      <th className="px-4 py-3 font-extrabold">Purpose</th>
                      <th className="px-4 py-3 font-extrabold">Category</th>
                      <th className="px-4 py-3 font-extrabold">Retention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {cookieExamples.map((c) => (
                      <tr key={c.name} className="text-white/65">
                        <td className="px-4 py-3 font-semibold text-white/80">
                          {c.name}
                        </td>
                        <td className="px-4 py-3">{c.provider}</td>
                        <td className="px-4 py-3">{c.purpose}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-bold text-white/70">
                            {c.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">{c.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-white/50">
                Replace “Analytics Provider” and “Marketing Provider” with your actual vendors when you finalize them.
              </p>
            </Card>

            <SectionTitle
              id="third-parties"
              title="6) Third Parties"
              subtitle="Some cookies may be set by providers that help us run and improve the Services."
            />
            <Card title="Third-party services">
              <p>
                Depending on enabled features and your consent choices, we may
                use third-party providers for analytics, performance monitoring,
                billing, customer support, or security. These providers may set
                cookies or similar identifiers to deliver their services.
              </p>
              <p className="mt-4">
                We require vendors to maintain reasonable security measures and
                to process data under contractual protections appropriate for an
                enterprise SaaS environment.
              </p>
            </Card>

            <SectionTitle
              id="retention"
              title="7) Retention"
              subtitle="We keep cookies only as long as needed for their purpose."
            />
            <Card title="How long we keep cookies">
              <p>
                Cookie retention depends on type and purpose. Some cookies are
                session-based (deleted when you close your browser). Others may
                persist for a fixed period (e.g., preference or analytics cookies).
              </p>
              <p className="mt-4">
                We periodically review retention settings and minimize duration
                where possible while maintaining security and product reliability.
              </p>
            </Card>

            <SectionTitle
              id="international"
              title="8) International Users"
              subtitle="Consent and cookie use may differ by jurisdiction."
            />
            <Card title="Regional requirements">
              <p>
                If you are located in the EEA/UK, we request consent for optional
                cookie categories where required (e.g., analytics/marketing).
              </p>
              <p className="mt-4">
                If you are located in regions with additional rights (e.g., U.S.
                states with privacy laws), you may have rights related to data
                usage and sharing. See our <Anchor href="/privacy">Privacy Policy</Anchor>{" "}
                for details.
              </p>
            </Card>

            <SectionTitle
              id="updates"
              title="9) Updates"
              subtitle="We may update this policy as the product evolves."
            />
            <Card title="Policy updates">
              <p>
                We may update this Cookie Policy from time to time. If changes
                are material, we will take reasonable steps to notify you (for
                example by posting a notice on the website or within the product).
              </p>
            </Card>

            <SectionTitle
              id="contact"
              title="10) Contact"
              subtitle="Questions about cookies or privacy? Contact us."
            />
            <Card title="Contact us">
              <p>
                For questions, requests, or privacy concerns, email{" "}
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
            </Card>

            {/* Bottom CTA */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-black">
                Want the full enterprise compliance pack?
              </h3>
              <p className="mt-2 text-white/65 max-w-3xl">
                If procurement requests a cookie inventory, subprocessor list, or
                a Data Processing Addendum (DPA), email support and we’ll provide
                the latest documents.
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
