export type PlanId = "free" | "pro" | "scale" | "enterprise";
export type EffectivePlanSource = "profile" | "admin_override";

export type ProfileEntitlementRow = {
  plan: string | null;
  admin_plan_override: string | null;
  admin_override_expires_at: string | null;
};

export function isPlanId(value: string | null | undefined): value is PlanId {
  return value === "free" || value === "pro" || value === "scale" || value === "enterprise";
}

function parseDate(value: string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function normalizePlan(plan: string | null | undefined): PlanId {
  if (plan === "pro" || plan === "scale" || plan === "enterprise") {
    return plan;
  }

  return "free";
}

export function hasActiveAdminOverride(
  profile: Pick<ProfileEntitlementRow, "admin_plan_override" | "admin_override_expires_at"> | null | undefined,
  now = new Date(),
): boolean {
  if (!profile?.admin_plan_override) {
    return false;
  }

  if (!isPlanId(profile.admin_plan_override)) {
    return false;
  }

  const expiresAt = parseDate(profile.admin_override_expires_at);
  if (!expiresAt) {
    return true;
  }

  return expiresAt.getTime() > now.getTime();
}

export function resolveEffectivePlan(
  profile: ProfileEntitlementRow | null | undefined,
  now = new Date(),
): {
  effectivePlan: PlanId;
  source: EffectivePlanSource;
} {
  if (hasActiveAdminOverride(profile, now) && isPlanId(profile?.admin_plan_override)) {
    return {
      effectivePlan: profile.admin_plan_override,
      source: "admin_override",
    };
  }

  return {
    effectivePlan: normalizePlan(profile?.plan),
    source: "profile",
  };
}
