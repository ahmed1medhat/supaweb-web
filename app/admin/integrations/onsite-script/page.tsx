import Link from "next/link";
import CopyButton from "@/app/admin/integrations/_components/copy-button";
import type { SiteRow } from "@/app/admin/integrations/types";
import { buildSiteSnippet } from "@/app/admin/integrations/types";
import { createClient } from "@/utils/supabase/server";

export default async function OnsiteScriptPage() {
  const supabase = await createClient();

  let sites: SiteRow[] = [];
  let loadError: string | null = null;

  const { data, error } = await supabase
    .from("sites")
    .select("id,created_at,updated_at,name,domain,public_key,is_default")
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    loadError = error.message;
  } else {
    sites = (data ?? []) as SiteRow[];
  }

  const defaultSite = sites.find((site) => site.is_default) ?? null;
  const optionAStatus = defaultSite ? "Ready" : "Needs setup";
  const optionBStatus = sites.length > 0 ? "Ready" : "No sites yet";
  const optionASnippet = defaultSite ? buildSiteSnippet(defaultSite.public_key) : "";

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Onsite Script Integration</h1>
          <p className="mt-2 text-sm text-slate-400">
            Embed campaigns with one script tag using default or per-site public keys.
          </p>
        </div>
        <Link
          href="/admin/integrations/sites"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
        >
          Manage Sites
        </Link>
      </header>

      {loadError ? (
        <div role="alert" className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3">
          <p className="text-sm font-semibold text-rose-100">{loadError}</p>
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-100">Default Snippet (Option A)</h2>
          <span
            className={[
              "rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
              defaultSite
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                : "border-amber-400/40 bg-amber-500/15 text-amber-200",
            ].join(" ")}
          >
            {optionAStatus}
          </span>
        </div>

        {defaultSite ? (
          <>
            <p className="mt-2 text-sm text-slate-300">
              Default site: <span className="font-semibold text-cyan-100">{defaultSite.name}</span> ({defaultSite.domain})
            </p>
            <p className="mt-1 text-xs text-slate-400">Allowed domain: {defaultSite.domain}</p>

            <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/70 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Public Key</p>
                <CopyButton value={defaultSite.public_key} label="Copy Key" />
              </div>
              <code className="block break-all rounded-md bg-slate-950/70 px-2 py-1 text-xs text-cyan-100">
                {defaultSite.public_key}
              </code>
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/70 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Snippet</p>
                <CopyButton value={optionASnippet} />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-slate-950/70 px-2 py-2 text-xs text-slate-200">
                {optionASnippet}
              </pre>
            </div>

            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-300">
              <li>Paste the snippet before your closing {`</body>`} tag.</li>
              <li>The script requests active campaign data for the current page path.</li>
              <li>Session and daily frequency suppression are handled in browser storage.</li>
            </ol>
          </>
        ) : (
          <p className="mt-2 text-sm text-amber-200">
            No default site found. Create one in <Link href="/admin/integrations/sites" className="underline">Sites</Link>.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-100">Multi-site Snippet (Option B)</h2>
          <span
            className={[
              "rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
              sites.length > 0
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                : "border-amber-400/40 bg-amber-500/15 text-amber-200",
            ].join(" ")}
          >
            {optionBStatus}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-300">
          Each customer website gets a unique `public_key` and domain allowlist from the `sites` table.
        </p>

        {sites.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">Create a site to generate its public snippet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {sites.map((site) => {
              const snippet = buildSiteSnippet(site.public_key);

              return (
                <article key={site.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                  <p className="text-sm font-semibold text-slate-100">
                    {site.name} {site.is_default ? <span className="text-cyan-300">(Default)</span> : null}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Allowed domain: {site.domain}</p>

                  <div className="mt-2 grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-xs uppercase tracking-wide text-slate-300">Public Key</p>
                        <CopyButton value={site.public_key} label="Copy Key" />
                      </div>
                      <code className="block break-all rounded-md bg-slate-950/70 px-2 py-1 text-xs text-cyan-100">
                        {site.public_key}
                      </code>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-xs uppercase tracking-wide text-slate-300">Snippet</p>
                        <CopyButton value={snippet} />
                      </div>
                      <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-slate-950/70 px-2 py-2 text-xs text-slate-200">
                        {snippet}
                      </pre>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-300">
          <li>Create one site per customer domain.</li>
          <li>Give each customer only their own snippet.</li>
          <li>Domain checks are enforced server-side using Origin/Referer host matching.</li>
        </ol>
      </section>
    </section>
  );
}
