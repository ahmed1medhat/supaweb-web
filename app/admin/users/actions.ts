"use server";

import { redirect } from "next/navigation";
import { isAdminEmail } from "@/utils/admin";
import { createClient } from "@/utils/supabase/server";

const VALID_OVERRIDE_PLANS = new Set(["", "free", "pro", "scale", "enterprise"]);

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNullableString(formData: FormData, key: string): string | null {
  const value = getString(formData, key);
  return value.length > 0 ? value : null;
}

function withQueryParams(pathname: string, params: Record<string, string | undefined>): string {
  const [basePath, existingQuery = ""] = pathname.split("?");
  const searchParams = new URLSearchParams(existingQuery);

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

function redirectWithError(pathname: string, message: string): never {
  redirect(withQueryParams(pathname, { error: message }));
}

function redirectWithSuccess(pathname: string, message: string): never {
  redirect(withQueryParams(pathname, { success: message }));
}

function parseNullableDate(value: string): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Override expiry must be a valid date/time.");
  }

  return parsed.toISOString();
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

export async function updateUserOverrideAction(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  const userId = getString(formData, "user_id");
  const pathname = `/admin/users/${userId}`;

  if (!userId) {
    redirectWithError("/admin/users", "User id is required.");
  }

  const overridePlanRaw = getString(formData, "admin_plan_override").toLowerCase();
  if (!VALID_OVERRIDE_PLANS.has(overridePlanRaw)) {
    redirectWithError(pathname, "Invalid override plan.");
  }

  let expiresAt: string | null = null;

  try {
    expiresAt = parseNullableDate(getString(formData, "admin_override_expires_at"));
  } catch (error) {
    redirectWithError(pathname, error instanceof Error ? error.message : "Invalid expiry value.");
  }

  const notes = getNullableString(formData, "admin_override_notes");

  const { error } = await supabase
    .from("profiles")
    .update({
      admin_plan_override: overridePlanRaw || null,
      admin_override_expires_at: expiresAt,
      admin_override_notes: notes,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (error) {
    redirectWithError(pathname, error.message);
  }

  redirectWithSuccess(pathname, "Manual override saved.");
}

export async function applyCouponToUserAction(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  const userId = getString(formData, "user_id");
  const pathname = `/admin/users/${userId}`;

  if (!userId) {
    redirectWithError("/admin/users", "User id is required.");
  }

  const code = getString(formData, "coupon_code").toUpperCase();
  if (!code) {
    redirectWithError(pathname, "Coupon code is required.");
  }

  const { data, error } = await supabase.rpc("apply_coupon_to_user", {
    p_code: code,
    p_target_user_id: userId,
  });

  if (error) {
    redirectWithError(pathname, error.message);
  }

  const row = Array.isArray(data) ? data[0] as { applied_plan?: string | null } | undefined : undefined;
  const appliedPlan = row?.applied_plan ? row.applied_plan.toUpperCase() : "PRO";

  redirectWithSuccess(pathname, `Coupon applied. User moved to ${appliedPlan}.`);
}
