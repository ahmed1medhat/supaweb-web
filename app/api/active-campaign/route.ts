import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolveEffectivePlan, type PlanId } from "@/lib/entitlements";
import type {
  AudienceMode,
  CampaignPosition,
  CampaignType,
  FrequencyMode,
  PagesMode,
  PlanMode,
} from "@/app/admin/campaigns/types";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CampaignRecord = {
  id: string;
  name: string | null;
  type: CampaignType | null;
  priority: number | null;
  title: string | null;
  message: string | null;
  cta_text: string | null;
  cta_url: string | null;
  primary_color: string | null;
  text_color: string | null;
  background_style: string | null;
  position: CampaignPosition | null;
  pages_mode: PagesMode | null;
  include_paths: string[] | string | null;
  audience_mode: AudienceMode | null;
  plan_mode: PlanMode | null;
  frequency: FrequencyMode | null;
  updated_at: string | null;
};

type CampaignPayload = {
  id: string;
  name: string | null;
  type: CampaignType;
  priority: number;
  title: string | null;
  message: string | null;
  cta_text: string | null;
  cta_url: string | null;
  primary_color: string | null;
  text_color: string | null;
  background_style: string | null;
  position: CampaignPosition;
  pages_mode: PagesMode;
  include_paths: string[];
  audience_mode: AudienceMode;
  plan_mode: PlanMode;
  frequency: FrequencyMode;
  updated_at: string | null;
};

type ViewerPlan = PlanId;

const ACTIVE_LIMIT = 100;

async function resolveDefaultSiteId(): Promise<string | null> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.from("sites").select("id").eq("is_default", true).maybeSingle();

    if (error || !data?.id) {
      return null;
    }

    return data.id;
  } catch {
    return null;
  }
}

function normalizePathname(pathname: string | null): string {
  if (!pathname) {
    return "/";
  }

  const candidate = pathname.trim();

  if (!candidate) {
    return "/";
  }

  let pathOnly = candidate;

  try {
    if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
      pathOnly = new URL(candidate).pathname;
    }
  } catch {
    pathOnly = candidate;
  }

  if (!pathOnly.startsWith("/")) {
    pathOnly = `/${pathOnly}`;
  }

  return normalizeComparablePath(pathOnly);
}

function normalizeComparablePath(pathname: string): string {
  const cleaned = pathname.split("?")[0].split("#")[0].trim();

  if (!cleaned || cleaned === "/") {
    return "/";
  }

  const withoutTrailing = cleaned.replace(/\/+$/, "");
  return withoutTrailing.length > 0 ? withoutTrailing : "/";
}

function normalizeIncludePaths(value: CampaignRecord["include_paths"]): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/g)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
}

function isValidType(value: CampaignType | null): value is CampaignType {
  return value === "top_bar" || value === "modal" || value === "slide_in";
}

function toPayload(record: CampaignRecord): CampaignPayload | null {
  if (!record.id || !isValidType(record.type)) {
    return null;
  }

  return {
    id: record.id,
    name: record.name,
    type: record.type,
    priority: typeof record.priority === "number" ? record.priority : 100,
    title: record.title,
    message: record.message,
    cta_text: record.cta_text,
    cta_url: record.cta_url,
    primary_color: record.primary_color,
    text_color: record.text_color,
    background_style: record.background_style,
    position:
      record.position === "top" || record.position === "bottom" || record.position === "center"
        ? record.position
        : "top",
    pages_mode: record.pages_mode === "include" ? "include" : "all",
    include_paths: normalizeIncludePaths(record.include_paths),
    audience_mode:
      record.audience_mode === "guest" || record.audience_mode === "logged_in"
        ? record.audience_mode
        : "all",
    plan_mode:
      record.plan_mode === "free" ||
      record.plan_mode === "pro" ||
      record.plan_mode === "scale" ||
      record.plan_mode === "enterprise"
        ? record.plan_mode
        : "all",
    frequency: record.frequency === "daily" ? "daily" : "session",
    updated_at: record.updated_at,
  };
}

function includePathMatches(pathname: string, includePath: string): boolean {
  const normalizedInclude = normalizeComparablePath(
    includePath.startsWith("/") ? includePath : `/${includePath}`,
  );

  if (normalizedInclude.endsWith("*")) {
    const prefix = normalizeComparablePath(normalizedInclude.slice(0, -1));
    if (prefix === "/") {
      return true;
    }

    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  }

  return pathname === normalizedInclude;
}

function matchesPagesMode(campaign: CampaignPayload, pathname: string): boolean {
  if (campaign.pages_mode === "all") {
    return true;
  }

  if (campaign.include_paths.length === 0) {
    return false;
  }

  return campaign.include_paths.some((path) => includePathMatches(pathname, path));
}

function matchesAudienceMode(campaign: CampaignPayload, user: User | null): boolean {
  if (campaign.audience_mode === "all") {
    return true;
  }

  if (campaign.audience_mode === "guest") {
    return !user;
  }

  return Boolean(user);
}

async function resolveViewerPlan(supabase: Awaited<ReturnType<typeof createClient>>, user: User | null) {
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("plan,admin_plan_override,admin_override_expires_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return resolveEffectivePlan(data).effectivePlan;
}

function matchesPlanMode(campaign: CampaignPayload, viewerPlan: ViewerPlan | null): boolean {
  if (campaign.plan_mode === "all") {
    return true;
  }

  return viewerPlan === campaign.plan_mode;
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const pathname = normalizePathname(new URL(request.url).searchParams.get("pathname"));
  const defaultSiteId = await resolveDefaultSiteId();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const viewerPlan = await resolveViewerPlan(supabase, user);

  let campaignsQuery = supabase
    .from("campaigns")
    .select("*")
    .eq("status", "active")
    .order("priority", { ascending: true })
    .order("updated_at", { ascending: false })
    .limit(ACTIVE_LIMIT);

  if (defaultSiteId) {
    campaignsQuery = campaignsQuery.or(`site_id.eq.${defaultSiteId},site_id.is.null`);
  }

  const { data, error } = await campaignsQuery;

  if (error || !data) {
    return NextResponse.json(
      { campaign: null },
      {
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const campaigns = data as CampaignRecord[];

  let selected: CampaignPayload | null = null;

  for (const record of campaigns) {
    const candidate = toPayload(record);

    if (!candidate) {
      continue;
    }

    if (!matchesPagesMode(candidate, pathname)) {
      continue;
    }

    if (!matchesAudienceMode(candidate, user)) {
      continue;
    }

    if (!matchesPlanMode(candidate, viewerPlan)) {
      continue;
    }

    selected = candidate;
    break;
  }

  return NextResponse.json(
    { campaign: selected },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
