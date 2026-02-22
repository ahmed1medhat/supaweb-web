import Link from "next/link";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import { toggleCampaignStatusAction } from "@/app/admin/campaigns/actions";
import type { CampaignRow } from "@/app/admin/campaigns/types";
import { createClient } from "@/utils/supabase/server";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type CampaignsPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export default async function CampaignsPage({ searchParams }: CampaignsPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const supabase = await createClient();

  let campaigns: CampaignRow[] = [];
  let loadError: string | null = null;

  const { data, error } = await supabase
    .from("campaigns")
    .select("id,created_at,updated_at,name,type,status,priority,title,message,cta_text,cta_url,primary_color,text_color,background_style,position,pages_mode,include_paths,audience_mode,plan_mode,frequency")
    .order("priority", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    loadError = error.message;
  } else {
    campaigns = (data ?? []) as CampaignRow[];
  }

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Campaigns</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create onsite campaigns. Priority controls which campaign appears first.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/campaigns/templates"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            Templates
          </Link>
          <Link
            href="/admin/campaigns/new"
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            New Campaign
          </Link>
        </div>
      </header>

      <FlashMessage success={resolvedSearchParams.success} error={resolvedSearchParams.error ?? loadError ?? undefined} />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-slate-900/90 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Priority</th>
              <th className="px-3 py-2">Updated</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-slate-950/30 text-slate-200">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-slate-400">
                  No campaigns yet.
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => {
                const targetStatus = campaign.status === "active" ? "paused" : "active";
                const toggleLabel = campaign.status === "active" ? "Pause" : "Activate";

                return (
                  <tr key={campaign.id} className="hover:bg-slate-900/50">
                    <td className="px-3 py-2 font-medium text-slate-100">{campaign.name}</td>
                    <td className="px-3 py-2 text-slate-300">{campaign.type}</td>
                    <td className="px-3 py-2">
                      <span
                        className={[
                          "inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold uppercase",
                          campaign.status === "active"
                            ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
                            : campaign.status === "paused"
                              ? "border-amber-400/30 bg-amber-500/15 text-amber-200"
                              : "border-slate-400/30 bg-slate-500/15 text-slate-200",
                        ].join(" ")}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-300">{campaign.priority}</td>
                    <td className="px-3 py-2 text-slate-400">{formatDateTime(campaign.updated_at)}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/campaigns/${campaign.id}`}
                          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
                        >
                          Edit
                        </Link>
                        <form action={toggleCampaignStatusAction}>
                          <input type="hidden" name="id" value={campaign.id} />
                          <input type="hidden" name="target_status" value={targetStatus} />
                          <button
                            type="submit"
                            className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
                          >
                            {toggleLabel}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
