import type { CampaignBuilderInitialValues } from "@/app/admin/campaigns/_components/visual-campaign-builder";
import type { CampaignTemplate } from "@/app/admin/campaigns/template-library";
import type { CampaignRow } from "@/app/admin/campaigns/types";

export const DEFAULT_PRIMARY_COLOR = "#22d3ee";
export const DEFAULT_TEXT_COLOR = "#f8fafc";
export const DEFAULT_BACKGROUND_STYLE = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";

export function buildInitialValuesFromTemplate(template: CampaignTemplate): CampaignBuilderInitialValues {
  return {
    name: template.name,
    type: template.type,
    status: "draft",
    priority: 100,
    title: template.title,
    message: template.message,
    cta_text: template.ctaText,
    cta_url: template.ctaLink,
    primary_color: template.primaryColor || DEFAULT_PRIMARY_COLOR,
    text_color: template.textColor || DEFAULT_TEXT_COLOR,
    background_style: template.backgroundStyle || DEFAULT_BACKGROUND_STYLE,
    position: template.position,
    pages_mode: "all",
    include_paths: "",
    audience_mode: "guest",
    plan_mode: "all",
    frequency: "session",
  };
}

export function buildInitialValuesFromCampaign(campaign: CampaignRow): CampaignBuilderInitialValues {
  return {
    id: campaign.id,
    name: campaign.name,
    type: campaign.type,
    status: campaign.status,
    priority: campaign.priority,
    title: campaign.title ?? "",
    message: campaign.message ?? "",
    cta_text: campaign.cta_text ?? "",
    cta_url: campaign.cta_url ?? "",
    primary_color: campaign.primary_color || DEFAULT_PRIMARY_COLOR,
    text_color: campaign.text_color || DEFAULT_TEXT_COLOR,
    background_style: campaign.background_style || DEFAULT_BACKGROUND_STYLE,
    position: campaign.position ?? "top",
    pages_mode: campaign.pages_mode,
    include_paths: (campaign.include_paths ?? []).join("\n"),
    audience_mode: campaign.audience_mode,
    plan_mode: campaign.plan_mode,
    frequency: campaign.frequency,
  };
}
