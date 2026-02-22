import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  AudienceMode,
  CampaignPosition,
  CampaignType,
  FrequencyMode,
  PagesMode,
  PlanMode,
} from "@/app/admin/campaigns/types";

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

type SiteRecord = {
  id: string;
  domain: string;
  is_default: boolean;
};

type UserState = "guest" | "logged_in";
type ViewerPlan = Exclude<PlanMode, "all">;

const ACTIVE_LIMIT = 100;

function normalizeComparablePath(pathname: string): string {
  const cleaned = pathname.split("?")[0].split("#")[0].trim();

  if (!cleaned || cleaned === "/") {
    return "/";
  }

  const withoutTrailing = cleaned.replace(/\/+$/, "");
  return withoutTrailing.length > 0 ? withoutTrailing : "/";
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

function normalizeDomain(value: string): string {
  const trimmed = value.trim().toLowerCase();

  if (!trimmed) {
    return "";
  }

  try {
    const withProtocol = trimmed.includes("://") ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return trimmed.replace(/^www\./, "").replace(/\/.*$/, "");
  }
}

function parseHost(headerValue: string | null): string | null {
  if (!headerValue) {
    return null;
  }

  try {
    return new URL(headerValue).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

function isHostAllowed(requestHost: string, allowedDomain: string): boolean {
  const normalizedHost = normalizeDomain(requestHost);
  const normalizedAllowedDomain = normalizeDomain(allowedDomain);

  if (!normalizedHost || !normalizedAllowedDomain) {
    return false;
  }

  return (
    normalizedHost === normalizedAllowedDomain ||
    normalizedHost.endsWith(`.${normalizedAllowedDomain}`)
  );
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

function normalizeUserState(value: string | null): UserState {
  return value === "logged_in" ? "logged_in" : "guest";
}

function matchesAudienceMode(campaign: CampaignPayload, userState: UserState): boolean {
  if (campaign.audience_mode === "all") {
    return true;
  }

  if (campaign.audience_mode === "guest") {
    return userState === "guest";
  }

  return userState === "logged_in";
}

function normalizeViewerPlan(value: string | null): ViewerPlan | null {
  if (value === "free" || value === "pro" || value === "scale" || value === "enterprise") {
    return value;
  }

  return null;
}

function matchesPlanMode(campaign: CampaignPayload, viewerPlan: ViewerPlan | null): boolean {
  if (campaign.plan_mode === "all") {
    return true;
  }

  return viewerPlan === campaign.plan_mode;
}

function getResponseHeaders(origin: string | null, includeCors: boolean): HeadersInit {
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
    Vary: "Origin",
  };

  if (includeCors && origin) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: {
      ...getResponseHeaders(origin, Boolean(origin)),
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const siteKey = requestUrl.searchParams.get("site_key")?.trim() ?? "";
  const path = requestUrl.searchParams.get("path");

  if (!siteKey || !path) {
    return NextResponse.json(
      { campaign: null, error: "site_key and path are required." },
      {
        status: 400,
        headers: getResponseHeaders(origin, Boolean(origin)),
      },
    );
  }

  const admin = createAdminClient();
  const { data: site, error: siteError } = await admin
    .from("sites")
    .select("id,domain,is_default")
    .eq("public_key", siteKey)
    .maybeSingle();

  if (siteError || !site) {
    return NextResponse.json(
      { campaign: null },
      {
        status: 404,
        headers: getResponseHeaders(origin, Boolean(origin)),
      },
    );
  }

  const siteRecord = site as SiteRecord;
  const originHost = parseHost(origin);
  const refererHost = parseHost(request.headers.get("referer"));
  const allowed = [originHost, refererHost].some((host) => {
    if (!host) {
      return false;
    }

    return isHostAllowed(host, siteRecord.domain);
  });

  if (!allowed) {
    return NextResponse.json(
      { campaign: null },
      {
        status: 403,
        headers: getResponseHeaders(origin, false),
      },
    );
  }

  const normalizedPath = normalizePathname(path);
  const userState = normalizeUserState(requestUrl.searchParams.get("user_state"));
  const viewerPlan = normalizeViewerPlan(requestUrl.searchParams.get("plan"));
  let campaignsQuery = admin
    .from("campaigns")
    .select(
      "id,name,type,priority,title,message,cta_text,cta_url,primary_color,text_color,background_style,position,pages_mode,include_paths,audience_mode,plan_mode,frequency,updated_at",
    )
    .eq("status", "active")
    .order("priority", { ascending: true })
    .order("updated_at", { ascending: false })
    .limit(ACTIVE_LIMIT);

  campaignsQuery = siteRecord.is_default
    ? campaignsQuery.or(`site_id.eq.${siteRecord.id},site_id.is.null`)
    : campaignsQuery.eq("site_id", siteRecord.id);

  const { data: campaignRows, error: campaignsError } = await campaignsQuery;

  if (campaignsError || !campaignRows) {
    return NextResponse.json(
      { campaign: null },
      {
        headers: getResponseHeaders(origin, true),
      },
    );
  }

  const records = campaignRows as CampaignRecord[];
  let selected: CampaignPayload | null = null;

  for (const record of records) {
    const candidate = toPayload(record);

    if (!candidate) {
      continue;
    }

    if (!matchesPagesMode(candidate, normalizedPath)) {
      continue;
    }

    if (!matchesAudienceMode(candidate, userState)) {
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
      headers: getResponseHeaders(origin, true),
    },
  );
}
