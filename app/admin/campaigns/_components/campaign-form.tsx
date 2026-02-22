import Link from "next/link";
import {
  AUDIENCE_MODE_OPTIONS,
  CAMPAIGN_STATUS_OPTIONS,
  CAMPAIGN_TYPE_OPTIONS,
  FREQUENCY_OPTIONS,
  PAGES_MODE_OPTIONS,
  PLAN_MODE_OPTIONS,
  type CampaignRow,
} from "@/app/admin/campaigns/types";

type CampaignFormProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  backHref: string;
  campaign?: CampaignRow | null;
};

function fieldClassName() {
  return "w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400/40";
}

export default function CampaignForm({
  action,
  submitLabel,
  backHref,
  campaign,
}: CampaignFormProps) {
  return (
    <form action={action} className="space-y-6">
      {campaign ? <input type="hidden" name="id" value={campaign.id} /> : null}

      <section className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-300">
          <span className="font-medium text-slate-200">Name *</span>
          <input
            name="name"
            required
            defaultValue={campaign?.name ?? ""}
            className={fieldClassName()}
            placeholder="Spring promo"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          <span className="font-medium text-slate-200">Priority</span>
          <input
            name="priority"
            type="number"
            defaultValue={campaign?.priority ?? 100}
            className={fieldClassName()}
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          <span className="font-medium text-slate-200">Type</span>
          <select name="type" defaultValue={campaign?.type ?? "top_bar"} className={fieldClassName()}>
            {CAMPAIGN_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          <span className="font-medium text-slate-200">Status</span>
          <select name="status" defaultValue={campaign?.status ?? "draft"} className={fieldClassName()}>
            {CAMPAIGN_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-300 md:col-span-2">
          <span className="font-medium text-slate-200">Title</span>
          <input
            name="title"
            defaultValue={campaign?.title ?? ""}
            className={fieldClassName()}
            placeholder="Limited-time offer"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300 md:col-span-2">
          <span className="font-medium text-slate-200">Message</span>
          <textarea
            name="message"
            defaultValue={campaign?.message ?? ""}
            className={`${fieldClassName()} min-h-28`}
            placeholder="Get 20% off your next upgrade."
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          <span className="font-medium text-slate-200">CTA Text</span>
          <input
            name="cta_text"
            defaultValue={campaign?.cta_text ?? ""}
            className={fieldClassName()}
            placeholder="Upgrade now"
          />
        </label>

        <label className="space-y-1 text-sm text-slate-300">
          <span className="font-medium text-slate-200">CTA URL</span>
          <input
            name="cta_url"
            defaultValue={campaign?.cta_url ?? ""}
            className={fieldClassName()}
            placeholder="/pricing"
          />
        </label>
      </section>

      <section className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Targeting</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-300">
            <span className="font-medium text-slate-200">Pages Mode</span>
            <select
              name="pages_mode"
              defaultValue={campaign?.pages_mode ?? "all"}
              className={fieldClassName()}
            >
              {PAGES_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-sm text-slate-300">
            <span className="font-medium text-slate-200">Audience Mode</span>
            <select
              name="audience_mode"
              defaultValue={campaign?.audience_mode ?? "all"}
              className={fieldClassName()}
            >
              {AUDIENCE_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-sm text-slate-300">
            <span className="font-medium text-slate-200">Plan Mode</span>
            <select
              name="plan_mode"
              defaultValue={campaign?.plan_mode ?? "all"}
              className={fieldClassName()}
            >
              {PLAN_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-sm text-slate-300">
            <span className="font-medium text-slate-200">Frequency</span>
            <select
              name="frequency"
              defaultValue={campaign?.frequency ?? "session"}
              className={fieldClassName()}
            >
              {FREQUENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-sm text-slate-300 md:col-span-2">
            <span className="font-medium text-slate-200">Include Paths (one path per line)</span>
            <textarea
              name="include_paths"
              defaultValue={(campaign?.include_paths ?? []).join("\n")}
              className={`${fieldClassName()} min-h-24`}
              placeholder="/pricing&#10;/download"
            />
            <p className="text-xs text-slate-500">Used only when Pages Mode is set to Include Specific Paths.</p>
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {submitLabel}
        </button>
        <Link
          href={backHref}
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
