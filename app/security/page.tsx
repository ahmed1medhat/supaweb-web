export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <section className="pt-28 pb-16 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-bold tracking-widest uppercase mb-6">
            Trust & Security
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Security at SupaWeb
          </h1>

          <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
            SupaWeb is built as a Revenue Intelligence platform with a strict separation
            of responsibilities: the Desktop Agent executes scans locally, while the Web
            Dashboard visualizes results. We prioritize secure authentication, least-privilege
            access, and controlled data handling.
          </p>

          {/* Quick badges */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">
                Authentication
              </div>
              <div className="text-lg font-extrabold">Supabase Auth</div>
              <p className="text-sm text-slate-400 mt-2">
                Session-based access, token validation, and secure identity handling.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">
                Payments
              </div>
              <div className="text-lg font-extrabold">Polar Subscriptions</div>
              <p className="text-sm text-slate-400 mt-2">
                Billing handled externally; plan entitlements synced via webhooks.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">
                Hosting
              </div>
              <div className="text-lg font-extrabold">Vercel Infrastructure</div>
              <p className="text-sm text-slate-400 mt-2">
                Secure deployment pipeline with environment variable isolation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-10 shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-4">Security Principles</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Our security model is designed around practical enterprise expectations:
              strong identity controls, limited data retention, and clear operational boundaries.
            </p>

            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15 text-primary font-black">
                  ✓
                </span>
                <div>
                  <div className="font-bold">Least Privilege by Default</div>
                  <div className="text-slate-400">
                    Access is scoped to authenticated users and validated entitlements.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15 text-primary font-black">
                  ✓
                </span>
                <div>
                  <div className="font-bold">Separation of Responsibilities</div>
                  <div className="text-slate-400">
                    Desktop executes scans; the web dashboard visualizes results.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15 text-primary font-black">
                  ✓
                </span>
                <div>
                  <div className="font-bold">Controlled Data Handling</div>
                  <div className="text-slate-400">
                    Structured intelligence is uploaded — not a full raw site mirror.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15 text-primary font-black">
                  ✓
                </span>
                <div>
                  <div className="font-bold">Secure-by-Design Integrations</div>
                  <div className="text-slate-400">
                    Billing events are validated through Polar webhook signatures before
                    updating entitlements.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Data Flow */}
          <div className="rounded-3xl border border-white/10 bg-[#0b1222] p-10 shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-4">High-Level Data Flow</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              This is how SupaWeb processes scans from Desktop to Web in a controlled,
              predictable pipeline.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "1) User Authentication",
                  desc: "User signs in via Supabase Auth. Desktop receives a short-lived access token for API requests.",
                },
                {
                  title: "2) Plan Entitlement Verification",
                  desc: "Server reads subscription status from Supabase (synced by Polar webhook). Desktop treats plan as read-only.",
                },
                {
                  title: "3) Local Scan Execution",
                  desc: "Desktop crawls, runs factors, models revenue impact locally. Plan caps enforce crawl and factor ceilings.",
                },
                {
                  title: "4) Intelligence Packaging",
                  desc: "Desktop compiles a structured results package (findings, scores, evidence pointers) for upload.",
                },
                {
                  title: "5) Secure Upload + Web Visualization",
                  desc: "Package is uploaded over HTTPS to Vercel API endpoints. Dashboard renders reports and exports.",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="font-extrabold">{s.title}</div>
                  <div className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-xs text-slate-400 leading-relaxed">
                Note: SupaWeb intentionally limits what the desktop app displays.
                The desktop is an execution agent — all reporting, dashboards, exports,
                comparisons, and sharing happen on the web.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-8">
              <h3 className="text-xl font-extrabold mb-3">Encryption & Transport</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                All web requests and uploads use HTTPS/TLS. Secrets are stored as environment
                variables on the server and never shipped in client code.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-8">
              <h3 className="text-xl font-extrabold mb-3">Access Control</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                API endpoints validate Supabase-issued access tokens. Plan enforcement is
                applied server-side for entitlement truth.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-8">
              <h3 className="text-xl font-extrabold mb-3">Plan Enforcement</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Crawl pages and factor counts are capped per plan. Desktop UI does not allow plan
                selection or overrides.
              </p>
            </div>
          </div>

          {/* Responsible Disclosure */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 to-transparent p-10">
            <h3 className="text-2xl font-extrabold mb-4">Responsible Disclosure</h3>
            <p className="text-slate-300 leading-relaxed max-w-3xl">
              If you believe you’ve found a security issue, please report it privately.
              We investigate credible reports and prioritize fixes based on impact.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@supaweblabs.com?subject=Security%20Report%20-%20SupaWeb"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold hover:bg-blue-500 transition-all shadow-lg shadow-primary/30"
              >
                Report a Security Issue
              </a>

              <a
                href="/privacy"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold hover:bg-white/10 transition-all"
              >
                View Privacy Policy
              </a>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Please avoid sharing sensitive details publicly. Include steps to reproduce,
              affected URLs, and expected vs actual behavior.
            </p>
          </div>

          {/* Compliance Roadmap */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0b1222] p-10">
            <h3 className="text-2xl font-extrabold mb-4">Compliance & Roadmap</h3>
            <p className="text-slate-400 leading-relaxed">
              SupaWeb aims to meet enterprise security expectations. Where applicable,
              we publish improvements as the platform evolves.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">
                  Current
                </div>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• Token-based authentication & authorization</li>
                  <li>• Webhook signature validation for billing events</li>
                  <li>• Server-side environment variable isolation</li>
                  <li>• Controlled reporting boundary (Desktop vs Web)</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">
                  Roadmap (Planned)
                </div>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• Security status page</li>
                  <li>• Formalized incident response playbook</li>
                  <li>• SOC 2 readiness track (if/when required)</li>
                  <li>• DPA + subprocessor listing publication</li>
                </ul>
                <p className="mt-4 text-xs text-slate-400">
                  Roadmap items are targets and may change based on customer requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom contact */}
          <div className="mt-12 text-center text-sm text-slate-400">
            Need help? Contact{" "}
            <a className="text-primary hover:underline" href="mailto:support@supaweblabs.com">
              support@supaweblabs.com
            </a>
            .
          </div>
        </div>
      </section>
    </div>
  );
}
