"use server";

import { redirect } from "next/navigation";
import { isAdminEmail } from "@/utils/admin";
import { createClient } from "@/utils/supabase/server";
import type {
  AudienceMode,
  CampaignPosition,
  CampaignStatus,
  CampaignType,
  FrequencyMode,
  PagesMode,
  PlanMode,
} from "@/app/admin/campaigns/types";

const VALID_TYPES = new Set<CampaignType>(["top_bar", "modal", "slide_in"]);
const VALID_STATUSES = new Set<CampaignStatus>(["draft", "active", "paused"]);
const VALID_POSITIONS = new Set<CampaignPosition>(["top", "bottom", "center"]);
const VALID_PAGES_MODES = new Set<PagesMode>(["all", "include"]);
const VALID_AUDIENCE_MODES = new Set<AudienceMode>(["all", "guest", "logged_in"]);
const VALID_PLAN_MODES = new Set<PlanMode>(["all", "free", "pro", "scale", "enterprise"]);
const VALID_FREQUENCIES = new Set<FrequencyMode>(["session", "daily"]);
const TOGGLE_STATUSES = new Set<CampaignStatus>(["active", "paused"]);
const HEX_COLOR_REGEX = /^#[0-9a-f]{6}$/i;
const DEFAULT_PRIMARY_COLOR = "#22d3ee";
const DEFAULT_TEXT_COLOR = "#f8fafc";
const DEFAULT_BACKGROUND_STYLE = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNullableString(formData: FormData, key: string): string | null {
  const value = getString(formData, key);
  return value.length > 0 ? value : null;
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected error.";
}

function normalizeEnum<T extends string>(value: string, allowed: Set<T>, fieldLabel: string): T {
  if (!allowed.has(value as T)) {
    throw new Error(`Invalid ${fieldLabel}.`);
  }

  return value as T;
}

function parsePriority(value: string): number {
  if (!value) {
    return 100;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed)) {
    throw new Error("Priority must be a valid number.");
  }

  return parsed;
}

function parseIncludePaths(value: string): string[] | null {
  const paths = value
    .split(/\r?\n/g)
    .map((path) => path.trim())
    .filter((path) => path.length > 0);

  return paths.length > 0 ? paths : null;
}

function parseHexColor(value: string, fallback: string, fieldLabel: string): string {
  if (!value) {
    return fallback;
  }

  if (!HEX_COLOR_REGEX.test(value)) {
    throw new Error(`${fieldLabel} must be a valid hex color like #22d3ee.`);
  }

  return value;
}

function buildCampaignPayload(formData: FormData) {
  const name = getString(formData, "name");

  if (!name) {
    throw new Error("Name is required.");
  }

  const type = normalizeEnum(getString(formData, "type"), VALID_TYPES, "type");
  const status = normalizeEnum(getString(formData, "status"), VALID_STATUSES, "status");
  const position = normalizeEnum(getString(formData, "position"), VALID_POSITIONS, "position");
  const pagesMode = normalizeEnum(getString(formData, "pages_mode"), VALID_PAGES_MODES, "pages mode");
  const audienceMode = normalizeEnum(
    getString(formData, "audience_mode"),
    VALID_AUDIENCE_MODES,
    "audience mode",
  );
  const planMode = normalizeEnum(getString(formData, "plan_mode"), VALID_PLAN_MODES, "plan mode");
  const frequency = normalizeEnum(getString(formData, "frequency"), VALID_FREQUENCIES, "frequency");
  const includePaths = pagesMode === "include" ? parseIncludePaths(getString(formData, "include_paths")) : null;

  if (pagesMode === "include" && !includePaths) {
    throw new Error("Include paths are required when pages mode is include.");
  }

  return {
    name,
    type,
    status,
    priority: parsePriority(getString(formData, "priority")),
    title: getNullableString(formData, "title"),
    message: getNullableString(formData, "message"),
    cta_text: getNullableString(formData, "cta_text"),
    cta_url: getNullableString(formData, "cta_url"),
    primary_color: parseHexColor(getString(formData, "primary_color"), DEFAULT_PRIMARY_COLOR, "Primary color"),
    text_color: parseHexColor(getString(formData, "text_color"), DEFAULT_TEXT_COLOR, "Text color"),
    background_style: getString(formData, "background_style") || DEFAULT_BACKGROUND_STYLE,
    position,
    pages_mode: pagesMode,
    include_paths: includePaths,
    audience_mode: audienceMode,
    plan_mode: planMode,
    frequency,
    updated_at: new Date().toISOString(),
  };
}

async function getAdminSupabaseClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/admin");
  }

  return supabase;
}

function redirectWithError(pathname: string, message: string): never {
  redirect(`${pathname}?error=${encodeURIComponent(message)}`);
}

function redirectWithSuccess(pathname: string, message: string): never {
  redirect(`${pathname}?success=${encodeURIComponent(message)}`);
}

export async function createCampaignAction(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  const templateId = getString(formData, "template_id");
  const createPath = templateId
    ? `/admin/campaigns/new?template=${encodeURIComponent(templateId)}`
    : "/admin/campaigns/new";

  let payload: ReturnType<typeof buildCampaignPayload>;

  try {
    payload = buildCampaignPayload(formData);
  } catch (error) {
    redirectWithError(createPath, toErrorMessage(error));
  }

  const { error } = await supabase.from("campaigns").insert(payload);

  if (error) {
    redirectWithError(createPath, error.message);
  }

  redirectWithSuccess("/admin/campaigns", "Campaign created successfully.");
}

export async function updateCampaignAction(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  const id = getString(formData, "id");

  if (!id) {
    redirectWithError("/admin/campaigns", "Campaign id is required.");
  }

  let payload: ReturnType<typeof buildCampaignPayload>;

  try {
    payload = buildCampaignPayload(formData);
  } catch (error) {
    redirectWithError(`/admin/campaigns/${id}`, toErrorMessage(error));
  }

  const { error } = await supabase.from("campaigns").update(payload).eq("id", id);

  if (error) {
    redirectWithError(`/admin/campaigns/${id}`, error.message);
  }

  redirectWithSuccess("/admin/campaigns", "Campaign updated successfully.");
}

export async function toggleCampaignStatusAction(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  const id = getString(formData, "id");

  if (!id) {
    redirectWithError("/admin/campaigns", "Campaign id is required.");
  }

  const targetStatus = normalizeEnum(
    getString(formData, "target_status"),
    TOGGLE_STATUSES,
    "toggle status",
  );

  const { error } = await supabase
    .from("campaigns")
    .update({ status: targetStatus, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    redirectWithError("/admin/campaigns", error.message);
  }

  const verb = targetStatus === "active" ? "activated" : "paused";
  redirectWithSuccess("/admin/campaigns", `Campaign ${verb}.`);
}
