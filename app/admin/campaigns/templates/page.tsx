import Link from "next/link";
import {
  CAMPAIGN_TEMPLATES,
  CAMPAIGN_TEMPLATE_CATEGORY_LABELS,
  type CampaignTemplateCategory,
} from "@/app/admin/campaigns/template-library";

const CATEGORY_ORDER: CampaignTemplateCategory[] = ["top_bar", "modal", "slide_in", "others"];

function typeLabel(value: string) {
  if (value === "top_bar") {
    return "Top bar";
  }

  if (value === "slide_in") {
    return "Slide-in";
  }

  return "Modal";
}

export default function CampaignTemplatesPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Campaign Templates</h1>
          <p className="mt-2 text-sm text-slate-400">
            Pick a template, then customize content, design, and targeting in the visual builder.
          </p>
        </div>
        <Link
          href="/admin/campaigns"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
        >
          Back to Campaigns
        </Link>
      </header>

      <div className="space-y-6">
        {CATEGORY_ORDER.map((category) => {
          const items = CAMPAIGN_TEMPLATES.filter((template) => template.category === category);

          return (
            <section key={category} className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-100">
                {CAMPAIGN_TEMPLATE_CATEGORY_LABELS[category]}
                <span className="ml-2 text-sm font-normal text-slate-400">({items.length})</span>
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((template) => (
                  <article
                    key={template.id}
                    className="flex h-full flex-col rounded-xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-100">{template.name}</h3>
                      <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-cyan-200">
                        {typeLabel(template.type)}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-300">{template.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">{template.message}</p>

                    <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-400">
                      <span>CTA: {template.ctaText}</span>
                      <span>{template.position}</span>
                    </div>

                    <Link
                      href={`/admin/campaigns/new?template=${encodeURIComponent(template.id)}`}
                      className="mt-4 inline-flex items-center justify-center rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Use template
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
