"use server";

import { redirect } from "next/navigation";
import type { CouponAppliesToPlan, CouponDiscountType, CouponStatus } from "@/app/admin/coupons/types";
import { isAdminEmail } from "@/utils/admin";
import { createClient } from "@/utils/supabase/server";

const VALID_DISCOUNT_TYPES = new Set<CouponDiscountType>(["percent", "fixed", "free"]);
const VALID_APPLIES_TO_PLAN = new Set<CouponAppliesToPlan>(["all", "pro", "scale", "enterprise"]);
const VALID_STATUSES = new Set<CouponStatus>(["active", "paused"]);

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

function normalizeEnum<T extends string>(value: string, allowed: Set<T>, label: string): T {
  if (!allowed.has(value as T)) {
    throw new Error(`Invalid ${label}.`);
  }

  return value as T;
}

function parsePositiveInt(value: string, label: string): number {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${label} must be a positive number.`);
  }

  return parsed;
}

function parseOptionalPositiveInt(value: string, label: string): number | null {
  if (!value) {
    return null;
  }

  return parsePositiveInt(value, label);
}

function parseDiscountValue(discountType: CouponDiscountType, value: string): number | null {
  if (discountType === "free") {
    return null;
  }

  if (!value) {
    throw new Error("Discount value is required for percent or fixed coupons.");
  }

  const parsed = parsePositiveInt(value, "Discount value");

  if (discountType === "percent" && parsed > 100) {
    throw new Error("Percent discount must be between 1 and 100.");
  }

  return parsed;
}

function parseExpiresAt(value: string): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Expires at must be a valid date/time.");
  }

  return parsed.toISOString();
}

function buildCouponPayload(formData: FormData) {
  const code = getString(formData, "code").toUpperCase();
  if (!code) {
    throw new Error("Coupon code is required.");
  }

  const discountType = normalizeEnum(
    getString(formData, "discount_type"),
    VALID_DISCOUNT_TYPES,
    "discount type",
  );
  const appliesToPlan = normalizeEnum(
    getString(formData, "applies_to_plan"),
    VALID_APPLIES_TO_PLAN,
    "applies to plan",
  );
  const status = normalizeEnum(getString(formData, "status"), VALID_STATUSES, "status");
  const discountValue = parseDiscountValue(discountType, getString(formData, "discount_value"));
  const maxRedemptions = parseOptionalPositiveInt(getString(formData, "max_redemptions"), "Max redemptions");
  const expiresAt = parseExpiresAt(getString(formData, "expires_at"));
  const notes = getNullableString(formData, "notes");

  return {
    code,
    discount_type: discountType,
    discount_value: discountValue,
    applies_to_plan: appliesToPlan,
    max_redemptions: maxRedemptions,
    expires_at: expiresAt,
    status,
    notes,
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

export async function createCouponAction(formData: FormData) {
  const pathname = "/admin/coupons/new";
  const supabase = await getAdminSupabaseClient();

  let payload: ReturnType<typeof buildCouponPayload>;

  try {
    payload = buildCouponPayload(formData);
  } catch (error) {
    redirectWithError(pathname, toErrorMessage(error));
  }

  const { error } = await supabase.from("coupons").insert(payload);
  if (error) {
    redirectWithError(pathname, error.message);
  }

  redirectWithSuccess("/admin/coupons", "Coupon created.");
}

export async function updateCouponAction(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  const id = getString(formData, "id");

  if (!id) {
    redirectWithError("/admin/coupons", "Coupon id is required.");
  }

  let payload: ReturnType<typeof buildCouponPayload>;

  try {
    payload = buildCouponPayload(formData);
  } catch (error) {
    redirectWithError(`/admin/coupons/${id}`, toErrorMessage(error));
  }

  const { error } = await supabase.from("coupons").update(payload).eq("id", id);
  if (error) {
    redirectWithError(`/admin/coupons/${id}`, error.message);
  }

  redirectWithSuccess("/admin/coupons", "Coupon updated.");
}

export async function toggleCouponStatusAction(formData: FormData) {
  const supabase = await getAdminSupabaseClient();
  const id = getString(formData, "id");
  const targetStatus = normalizeEnum(getString(formData, "target_status"), VALID_STATUSES, "status");

  if (!id) {
    redirectWithError("/admin/coupons", "Coupon id is required.");
  }

  const { error } = await supabase
    .from("coupons")
    .update({ status: targetStatus, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    redirectWithError("/admin/coupons", error.message);
  }

  const verb = targetStatus === "active" ? "activated" : "paused";
  redirectWithSuccess("/admin/coupons", `Coupon ${verb}.`);
}
