export type CampaignType = "top_bar" | "modal" | "slide_in";
export type CampaignStatus = "draft" | "active" | "paused";
export type PagesMode = "all" | "include";
export type AudienceMode = "all" | "guest" | "logged_in";
export type PlanMode = "all" | "free" | "pro" | "scale" | "enterprise";
export type FrequencyMode = "session" | "daily";
export type CampaignPosition = "top" | "bottom" | "center";

export type CampaignRow = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  priority: number;
  title: string | null;
  message: string | null;
  cta_text: string | null;
  cta_url: string | null;
  primary_color: string;
  text_color: string;
  background_style: string;
  position: CampaignPosition;
  pages_mode: PagesMode;
  include_paths: string[] | null;
  audience_mode: AudienceMode;
  plan_mode: PlanMode;
  frequency: FrequencyMode;
};

export const CAMPAIGN_TYPE_OPTIONS: Array<{ label: string; value: CampaignType }> = [
  { label: "Top Bar", value: "top_bar" },
  { label: "Modal", value: "modal" },
  { label: "Slide In", value: "slide_in" },
];

export const CAMPAIGN_STATUS_OPTIONS: Array<{ label: string; value: CampaignStatus }> = [
  { label: "Draft", value: "draft" },
  { label: "Active", value: "active" },
  { label: "Paused", value: "paused" },
];

export const CAMPAIGN_POSITION_OPTIONS: Array<{ label: string; value: CampaignPosition }> = [
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
  { label: "Center", value: "center" },
];

export const PAGES_MODE_OPTIONS: Array<{ label: string; value: PagesMode }> = [
  { label: "All Pages", value: "all" },
  { label: "Include Specific Paths", value: "include" },
];

export const AUDIENCE_MODE_OPTIONS: Array<{ label: string; value: AudienceMode }> = [
  { label: "All Users", value: "all" },
  { label: "Guests", value: "guest" },
  { label: "Logged In", value: "logged_in" },
];

export const PLAN_MODE_OPTIONS: Array<{ label: string; value: PlanMode }> = [
  { label: "All Plans", value: "all" },
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Scale", value: "scale" },
  { label: "Enterprise", value: "enterprise" },
];

export const FREQUENCY_OPTIONS: Array<{ label: string; value: FrequencyMode }> = [
  { label: "Per Session", value: "session" },
  { label: "Daily", value: "daily" },
];
