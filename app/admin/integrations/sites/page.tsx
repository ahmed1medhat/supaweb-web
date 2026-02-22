import Link from "next/link";
import CopyButton from "@/app/admin/integrations/_components/copy-button";
import { createSiteAction, setDefaultSiteAction } from "@/app/admin/integrations/sites/actions";
import type { SiteRow } from "@/app/admin/integrations/types";
import { buildSiteSnippet } from "@/app/admin/integrations/types";
import { createClient } from "@/utils/supabase/server";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type SitesPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

function firstValue(value: SearchParamValue): string | undefined {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value;
}

function decodeMessage(value: SearchParamValue): string | undefined {
  const raw = firstValue(value);
  if (!raw) {
    return undefined;
  }

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export default async function SitesPage({ searchParams }: SitesPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const supabase = await createClient();
  const successMessage = decodeMessage(resolvedSearchParams.success);
  const directErrorMessage = decodeMessage(resolvedSearchParams.error);

  let sites: SiteRow[] = [];
  let loadError: string | undefined;

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

  const errorMessage = directErrorMessage ?? loadError;

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Integration Sites</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create public site keys and keep one default site for Option A embeds.
          </p>
        </div>
        <Link
          href="/admin/integrations/onsite-script"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
        >
          Onsite Snippets
        </Link>
      </header>

      {successMessage ? (
        <div role="status" className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3">
          <p className="text-sm font-semibold text-emerald-100">{successMessage}</p>
        </div>
      ) : null}

      {errorMessage ? (
        <div role="alert" className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3">
          <p className="text-sm font-semibold text-rose-100">{errorMessage}</p>
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Create Site</h2>
        <form action={createSiteAction} className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <label className="space-y-1 text-sm text-slate-300">
            <span className="font-medium text-slate-200">Name</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Acme Website"
              className="w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400/40"
            />
          </label>
          <label className="space-y-1 text-sm text-slate-300">
            <span className="font-medium text-slate-200">Domain</span>
            <input
              type="text"
              name="domain"
              required
              placeholder="acme.com"
              className="w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400/40"
            />
          </label>
          <div className="flex flex-col justify-end gap-2">
            <label className="inline-flex items-center gap-2 text-xs text-slate-300">
              <input type="checkbox" name="make_default" className="h-4 w-4 rounded border border-white/20 bg-slate-900" />
              Mark as default
            </label>
            <button
              type="submit"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Create Site
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Sites</h2>
        {sites.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-slate-950/40 px-4 py-6 text-sm text-slate-400">
            No sites found.
          </div>
        ) : (
          sites.map((site) => {
            const snippet = buildSiteSnippet(site.public_key);

            return (
              <article key={site.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">
                      {site.name}{" "}
                      {site.is_default ? (
                        <span className="rounded-md border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-xs uppercase tracking-wide text-emerald-200">
                          Default
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">Allowed domain: {site.domain}</p>
                  </div>

                  {!site.is_default ? (
                    <form action={setDefaultSiteAction}>
                      <input type="hidden" name="site_id" value={site.id} />
                      <button
                        type="submit"
                        className="rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
                      >
                        Set Default
                      </button>
                    </form>
                  ) : null}
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Public Key</p>
                      <CopyButton value={site.public_key} label="Copy Key" />
                    </div>
                    <code className="block break-all rounded-md bg-slate-950/70 px-2 py-1 text-xs text-cyan-100">
                      {site.public_key}
                    </code>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Snippet</p>
                      <CopyButton value={snippet} />
                    </div>
                    <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-slate-950/70 px-2 py-2 text-xs text-slate-200">
                      {snippet}
                    </pre>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </section>
  );
}
