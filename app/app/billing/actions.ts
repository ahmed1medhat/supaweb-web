"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
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

type CouponApplyResult = {
  applied_plan: string | null;
};

export async function applySelfCouponAction(formData: FormData) {
  const pathname = "/app/billing";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const code = getString(formData, "code").toUpperCase();
  if (!code) {
    redirectWithError(pathname, "Coupon code is required.");
  }

  const { data, error } = await supabase.rpc("apply_coupon_to_user", {
    p_code: code,
    p_target_user_id: user.id,
  });

  if (error) {
    redirectWithError(pathname, error.message);
  }

  const row = Array.isArray(data) ? (data[0] as CouponApplyResult | undefined) : undefined;
  const appliedPlan = row?.applied_plan ? row.applied_plan.toUpperCase() : "PRO";

  redirectWithSuccess(pathname, `Coupon applied successfully. Effective plan updated to ${appliedPlan}.`);
}
