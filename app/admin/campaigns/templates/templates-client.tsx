"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CAMPAIGN_TEMPLATE_CATEGORY_LABELS,
  type CampaignTemplate,
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

type CampaignTemplatesClientProps = {
  templates: CampaignTemplate[];
  isAdmin: boolean;
  isAuthenticated: boolean;
};

export default function CampaignTemplatesClient({
  templates,
  isAdmin,
  isAuthenticated,
}: CampaignTemplatesClientProps) {
  const router = useRouter();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const createHref = useMemo(() => {
    if (!selectedTemplateId) {
      return "/admin/campaigns/new";
    }

    return `/admin/campaigns/new?template=${encodeURIComponent(selectedTemplateId)}`;
  }, [selectedTemplateId]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Campaign Templates</h1>
          <p className="mt-2 text-sm text-slate-400">
            Select a template, then create your campaign in the visual builder.
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            disabled={!selectedTemplateId}
            onClick={() => {
              if (!selectedTemplateId) {
                return;
              }

              router.push(createHref);
            }}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-55"
          >
            Create Campaign
          </button>
          {isAdmin ? (
            <p className="text-[11px] text-slate-400">
              selectedTemplateId: {selectedTemplateId ?? "none"} | isAdmin: {String(isAdmin)} |
              isAuthenticated: {String(isAuthenticated)}
            </p>
          ) : null}
        </div>
      </header>

      <div className="space-y-6">
        {CATEGORY_ORDER.map((category) => {
          const items = templates.filter((template) => template.category === category);

          return (
            <section key={category} className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-100">
                {CAMPAIGN_TEMPLATE_CATEGORY_LABELS[category]}
                <span className="ml-2 text-sm font-normal text-slate-400">({items.length})</span>
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((template) => {
                  const selected = selectedTemplateId === template.id;

                  return (
                    <article
                      key={template.id}
                      className={[
                        "flex h-full flex-col rounded-xl border bg-slate-950/40 p-4 transition",
                        selected
                          ? "border-cyan-300/70 ring-2 ring-cyan-400/30"
                          : "border-white/10 hover:border-cyan-400/35",
                      ].join(" ")}
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

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTemplateId(template.id)}
                          className={[
                            "inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition",
                            selected
                              ? "bg-cyan-400 text-slate-950"
                              : "border border-white/15 text-slate-200 hover:border-cyan-300/50 hover:text-white",
                          ].join(" ")}
                        >
                          {selected ? "Selected" : "Select template"}
                        </button>
                        <Link
                          href={`/admin/campaigns/new?template=${encodeURIComponent(template.id)}`}
                          className="inline-flex items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
                        >
                          Quick use
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div>
        <Link
          href="/admin/campaigns"
          className="inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
        >
          Back to Campaigns
        </Link>
      </div>
    </section>
  );
}
