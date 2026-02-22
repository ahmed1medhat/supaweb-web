"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AUDIENCE_MODE_OPTIONS,
  CAMPAIGN_POSITION_OPTIONS,
  CAMPAIGN_STATUS_OPTIONS,
  CAMPAIGN_TYPE_OPTIONS,
  FREQUENCY_OPTIONS,
  PAGES_MODE_OPTIONS,
  PLAN_MODE_OPTIONS,
  type AudienceMode,
  type CampaignPosition,
  type CampaignStatus,
  type CampaignType,
  type FrequencyMode,
  type PagesMode,
  type PlanMode,
} from "@/app/admin/campaigns/types";

export type CampaignBuilderInitialValues = {
  id?: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  priority: number;
  title: string;
  message: string;
  cta_text: string;
  cta_url: string;
  primary_color: string;
  text_color: string;
  background_style: string;
  position: CampaignPosition;
  pages_mode: PagesMode;
  include_paths: string;
  audience_mode: AudienceMode;
  plan_mode: PlanMode;
  frequency: FrequencyMode;
};

type VisualCampaignBuilderProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  backHref: string;
  initialValues: CampaignBuilderInitialValues;
  title: string;
  description: string;
  templateName?: string;
  templateId?: string;
  templatePickerHref?: string;
};

function fieldClassName() {
  return "w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400/40";
}

function safeHexColor(value: string, fallback: string): string {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function positionToClasses(type: CampaignType, position: CampaignPosition): string {
  if (type === "top_bar") {
    if (position === "bottom") {
      return "bottom-4";
    }

    if (position === "center") {
      return "top-1/2 -translate-y-1/2";
    }

    return "top-4";
  }

  if (type === "modal") {
    if (position === "top") {
      return "top-8";
    }

    if (position === "bottom") {
      return "bottom-8";
    }

    return "top-1/2 -translate-y-1/2";
  }

  if (position === "top") {
    return "top-6";
  }

  if (position === "center") {
    return "top-1/2 -translate-y-1/2";
  }

  return "bottom-6";
}

export default function VisualCampaignBuilder({
  action,
  submitLabel,
  backHref,
  initialValues,
  title,
  description,
  templateName,
  templateId,
  templatePickerHref,
}: VisualCampaignBuilderProps) {
  const [name, setName] = useState(initialValues.name);
  const [priority, setPriority] = useState(String(initialValues.priority));
  const [type, setType] = useState<CampaignType>(initialValues.type);
  const [status, setStatus] = useState<CampaignStatus>(initialValues.status);
  const [campaignTitle, setCampaignTitle] = useState(initialValues.title);
  const [message, setMessage] = useState(initialValues.message);
  const [ctaText, setCtaText] = useState(initialValues.cta_text);
  const [ctaUrl, setCtaUrl] = useState(initialValues.cta_url);
  const [primaryColor, setPrimaryColor] = useState(initialValues.primary_color);
  const [textColor, setTextColor] = useState(initialValues.text_color);
  const [backgroundStyle, setBackgroundStyle] = useState(initialValues.background_style);
  const [position, setPosition] = useState<CampaignPosition>(initialValues.position);

  const [pagesMode, setPagesMode] = useState<PagesMode>(initialValues.pages_mode);
  const [includePaths, setIncludePaths] = useState(initialValues.include_paths);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>(initialValues.audience_mode);
  const [planMode, setPlanMode] = useState<PlanMode>(initialValues.plan_mode);
  const [frequency, setFrequency] = useState<FrequencyMode>(initialValues.frequency);

  const previewTitle = campaignTitle.trim() || "Your campaign title";
  const previewMessage = message.trim() || "Add campaign messaging to preview how it looks.";
  const previewCta = ctaText.trim() || "CTA";
  const safePrimaryColor = safeHexColor(primaryColor, "#22d3ee");
  const safeTextColor = safeHexColor(textColor, "#f8fafc");

  const previewPositionClass = useMemo(() => positionToClasses(type, position), [position, type]);

  const campaignSurfaceStyle = useMemo(
    () => ({
      background: backgroundStyle || "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: safeTextColor,
      borderColor: `${safePrimaryColor}55`,
    }),
    [backgroundStyle, safePrimaryColor, safeTextColor],
  );

  const ctaStyle = useMemo(
    () => ({
      backgroundColor: safePrimaryColor,
      color: "#020617",
    }),
    [safePrimaryColor],
  );

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
          {templateName ? <p className="mt-1 text-xs text-cyan-200">Template: {templateName}</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {templatePickerHref ? (
            <Link
              href={templatePickerHref}
              className="rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
            >
              Change Template
            </Link>
          ) : null}
          <Link
            href={backHref}
            className="rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            Back
          </Link>
        </div>
      </header>

      <form action={action} className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        {initialValues.id ? <input type="hidden" name="id" value={initialValues.id} /> : null}
        {templateId ? <input type="hidden" name="template_id" value={templateId} /> : null}

        <section className="space-y-5 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-300 md:col-span-2">
              <span className="font-medium text-slate-200">Campaign name *</span>
              <input
                name="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClassName()}
                placeholder="Q2 launch promo"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Priority</span>
              <input
                name="priority"
                type="number"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className={fieldClassName()}
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Status</span>
              <select
                name="status"
                value={status}
                onChange={(event) => setStatus(event.target.value as CampaignStatus)}
                className={fieldClassName()}
              >
                {CAMPAIGN_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Type</span>
              <select
                name="type"
                value={type}
                onChange={(event) => setType(event.target.value as CampaignType)}
                className={fieldClassName()}
              >
                {CAMPAIGN_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Position</span>
              <select
                name="position"
                value={position}
                onChange={(event) => setPosition(event.target.value as CampaignPosition)}
                className={fieldClassName()}
              >
                {CAMPAIGN_POSITION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4">
            <label className="space-y-1 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Title</span>
              <input
                name="title"
                value={campaignTitle}
                onChange={(event) => setCampaignTitle(event.target.value)}
                className={fieldClassName()}
                placeholder="Limited-time offer"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Message</span>
              <textarea
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={`${fieldClassName()} min-h-28`}
                placeholder="Get 20% off your next upgrade."
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-slate-300">
                <span className="font-medium text-slate-200">CTA text</span>
                <input
                  name="cta_text"
                  value={ctaText}
                  onChange={(event) => setCtaText(event.target.value)}
                  className={fieldClassName()}
                  placeholder="Upgrade now"
                />
              </label>

              <label className="space-y-1 text-sm text-slate-300">
                <span className="font-medium text-slate-200">CTA link</span>
                <input
                  name="cta_url"
                  value={ctaUrl}
                  onChange={(event) => setCtaUrl(event.target.value)}
                  className={fieldClassName()}
                  placeholder="/pricing"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-slate-300">
                <span className="font-medium text-slate-200">Primary color</span>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={safePrimaryColor}
                    onChange={(event) => setPrimaryColor(event.target.value)}
                    className="h-10 w-14 rounded-lg border border-white/15 bg-slate-950 p-1"
                  />
                  <input
                    name="primary_color"
                    value={primaryColor}
                    onChange={(event) => setPrimaryColor(event.target.value)}
                    className={fieldClassName()}
                    placeholder="#22d3ee"
                  />
                </div>
              </label>

              <label className="space-y-1 text-sm text-slate-300">
                <span className="font-medium text-slate-200">Text color</span>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={safeTextColor}
                    onChange={(event) => setTextColor(event.target.value)}
                    className="h-10 w-14 rounded-lg border border-white/15 bg-slate-950 p-1"
                  />
                  <input
                    name="text_color"
                    value={textColor}
                    onChange={(event) => setTextColor(event.target.value)}
                    className={fieldClassName()}
                    placeholder="#f8fafc"
                  />
                </div>
              </label>
            </div>

            <label className="space-y-1 text-sm text-slate-300">
              <span className="font-medium text-slate-200">Background</span>
              <input
                name="background_style"
                value={backgroundStyle}
                onChange={(event) => setBackgroundStyle(event.target.value)}
                className={fieldClassName()}
                placeholder="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
              />
            </label>
          </div>

          <section className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Targeting</h2>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-slate-300">
                <span className="font-medium text-slate-200">Pages</span>
                <select
                  name="pages_mode"
                  value={pagesMode}
                  onChange={(event) => setPagesMode(event.target.value as PagesMode)}
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
                <span className="font-medium text-slate-200">Audience</span>
                <select
                  name="audience_mode"
                  value={audienceMode}
                  onChange={(event) => setAudienceMode(event.target.value as AudienceMode)}
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
                <span className="font-medium text-slate-200">Plan</span>
                <select
                  name="plan_mode"
                  value={planMode}
                  onChange={(event) => setPlanMode(event.target.value as PlanMode)}
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
                  value={frequency}
                  onChange={(event) => setFrequency(event.target.value as FrequencyMode)}
                  className={fieldClassName()}
                >
                  {FREQUENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              {pagesMode === "include" ? (
                <label className="space-y-1 text-sm text-slate-300 md:col-span-2">
                  <span className="font-medium text-slate-200">Include paths</span>
                  <textarea
                    name="include_paths"
                    value={includePaths}
                    onChange={(event) => setIncludePaths(event.target.value)}
                    className={`${fieldClassName()} min-h-24`}
                    placeholder="/pricing&#10;/download"
                  />
                </label>
              ) : (
                <input type="hidden" name="include_paths" value={includePaths} />
              )}
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
        </section>

        <section className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Live Preview</h2>
            <span className="text-xs text-slate-500">{type.replace("_", " ")} / {position}</span>
          </div>

          <div className="relative h-[480px] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_#1f2937,_#020617_65%)] p-4">
            <div className="pointer-events-none absolute inset-0 opacity-25">
              <div className="h-8 border-b border-white/10 bg-white/5" />
              <div className="mx-4 mt-4 space-y-3">
                <div className="h-3 w-1/2 rounded bg-white/10" />
                <div className="h-3 w-2/3 rounded bg-white/10" />
                <div className="h-3 w-1/3 rounded bg-white/10" />
                <div className="h-24 w-full rounded-xl bg-white/5" />
              </div>
            </div>

            {type === "top_bar" ? (
              <div
                className={`absolute left-4 right-4 ${previewPositionClass} rounded-xl border p-4 shadow-2xl`}
                style={campaignSurfaceStyle}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{previewTitle}</p>
                    <p className="text-xs opacity-90">{previewMessage}</p>
                  </div>
                  <button type="button" className="rounded-lg px-3 py-2 text-xs font-semibold" style={ctaStyle}>
                    {previewCta}
                  </button>
                </div>
              </div>
            ) : null}

            {type === "modal" ? (
              <div
                className={`absolute left-1/2 w-[92%] max-w-md -translate-x-1/2 ${previewPositionClass} rounded-2xl border p-5 shadow-2xl`}
                style={campaignSurfaceStyle}
              >
                <p className="text-lg font-semibold">{previewTitle}</p>
                <p className="mt-2 text-sm opacity-90">{previewMessage}</p>
                <button type="button" className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold" style={ctaStyle}>
                  {previewCta}
                </button>
              </div>
            ) : null}

            {type === "slide_in" ? (
              <div
                className={`absolute right-4 w-[88%] max-w-sm ${previewPositionClass} rounded-2xl border p-4 shadow-2xl`}
                style={campaignSurfaceStyle}
              >
                <p className="text-sm font-semibold">{previewTitle}</p>
                <p className="mt-1 text-xs opacity-90">{previewMessage}</p>
                <button type="button" className="mt-3 rounded-lg px-3 py-2 text-xs font-semibold" style={ctaStyle}>
                  {previewCta}
                </button>
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900/60 p-3 text-xs text-slate-400">
            <p>CTA URL: {ctaUrl || "(not set)"}</p>
            <p className="mt-1">Audience: {audienceMode} | Plan: {planMode} | Frequency: {frequency}</p>
          </div>
        </section>
      </form>
    </section>
  );
}
