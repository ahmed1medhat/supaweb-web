import Link from "next/link";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import { applyCouponToUserAction, updateUserOverrideAction } from "@/app/admin/users/actions";
import { resolveEffectivePlan } from "@/lib/entitlements";
import { createClient } from "@/utils/supabase/server";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type AdminUserDetailPageProps = {
  params: Promise<{ id: string }> | { id: string };
  searchParams?: Promise<SearchParams> | SearchParams;
};

type UserProfileRow = {
  user_id: string;
  email: string | null;
  plan: string | null;
  subscription_status: string | null;
  billing_cycle: string | null;
  admin_plan_override: string | null;
  admin_override_expires_at: string | null;
  admin_override_notes: string | null;
  updated_at: string;
};

type RedemptionRow = {
  id: string;
  created_at: string;
  applied_plan: string;
  coupon_id: string;
  coupons?: { code: string } | { code: string }[] | null;
};

function toDateTimeLocalValue(value: string | null): string {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const offsetMs = parsed.getTimezoneOffset() * 60_000;
  return new Date(parsed.getTime() - offsetMs).toISOString().slice(0, 16);
}

function formatDateTime(value: string | null): string {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
}

export default async function AdminUserDetailPage({ params, searchParams }: AdminUserDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const supabase = await createClient();

  let profile: UserProfileRow | null = null;
  let loadError: string | null = null;
  let redemptions: RedemptionRow[] = [];

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "user_id,email,plan,subscription_status,billing_cycle,admin_plan_override,admin_override_expires_at,admin_override_notes,updated_at",
    )
    .eq("user_id", resolvedParams.id)
    .maybeSingle();

  if (error) {
    loadError = error.message;
  } else {
    profile = (data ?? null) as UserProfileRow | null;
  }

  if (profile) {
    const { data: redemptionRows, error: redemptionError } = await supabase
      .from("coupon_redemptions")
      .select("id,created_at,applied_plan,coupon_id,coupons(code)")
      .eq("user_id", profile.user_id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (redemptionError) {
      loadError = redemptionError.message;
    } else {
      redemptions = (redemptionRows ?? []) as RedemptionRow[];
    }
  }

  const effectivePlan = profile ? resolveEffectivePlan(profile).effectivePlan : "free";

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">User Details</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage manual plan overrides and apply coupons directly to this user.
          </p>
        </div>
        <Link
          href="/admin/users"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
        >
          Back to Users
        </Link>
      </header>

      <FlashMessage
        success={resolvedSearchParams.success}
        error={resolvedSearchParams.error ?? loadError ?? (!profile ? "User profile not found." : undefined)}
      />

      {profile ? (
        <>
          <article className="rounded-xl border border-white/10 bg-slate-950/30 p-5">
            <h2 className="text-lg font-semibold text-white">Account Snapshot</h2>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <p className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2">
                Email: <span className="font-semibold">{profile.email ?? "Unknown"}</span>
              </p>
              <p className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2">
                User ID: <span className="font-mono text-xs">{profile.user_id}</span>
              </p>
              <p className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-2 uppercase">
                Effective plan: <span className="font-semibold">{effectivePlan}</span>
              </p>
              <p className="rounded-lg border border-blue-400/25 bg-blue-500/10 px-3 py-2 uppercase">
                Base plan: <span className="font-semibold">{profile.plan ?? "free"}</span>
              </p>
              <p className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2">
                Status: <span className="font-semibold">{profile.subscription_status ?? "free"}</span>
              </p>
              <p className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2">
                Last update: <span className="font-semibold">{formatDateTime(profile.updated_at)}</span>
              </p>
            </div>
          </article>

          <div className="grid gap-4 xl:grid-cols-2">
            <section className="rounded-xl border border-white/10 bg-slate-950/30 p-5">
              <h2 className="text-lg font-semibold text-white">Manual Override</h2>
              <p className="mt-2 text-sm text-slate-400">
                Override takes precedence when not expired. Leave plan empty to remove override.
              </p>

              <form action={updateUserOverrideAction} className="mt-4 space-y-4">
                <input type="hidden" name="user_id" value={profile.user_id} />

                <label className="block space-y-2 text-sm">
                  <span className="text-slate-200">Override plan</span>
                  <select
                    name="admin_plan_override"
                    defaultValue={profile.admin_plan_override ?? ""}
                    className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
                  >
                    <option value="">No override</option>
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="scale">Scale</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="text-slate-200">Override expires at</span>
                  <input
                    type="datetime-local"
                    name="admin_override_expires_at"
                    defaultValue={toDateTimeLocalValue(profile.admin_override_expires_at)}
                    className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
                  />
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="text-slate-200">Override notes</span>
                  <textarea
                    name="admin_override_notes"
                    defaultValue={profile.admin_override_notes ?? ""}
                    rows={5}
                    className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
                    placeholder="Investor account, affiliate agreement, contract details, etc."
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Save Override
                </button>
              </form>
            </section>

            <section className="rounded-xl border border-white/10 bg-slate-950/30 p-5">
              <h2 className="text-lg font-semibold text-white">Apply Coupon</h2>
              <p className="mt-2 text-sm text-slate-400">
                Apply a coupon code on behalf of this user.
              </p>

              <form action={applyCouponToUserAction} className="mt-4 space-y-4">
                <input type="hidden" name="user_id" value={profile.user_id} />

                <label className="block space-y-2 text-sm">
                  <span className="text-slate-200">Coupon code</span>
                  <input
                    name="coupon_code"
                    required
                    maxLength={64}
                    placeholder="INVESTOR100"
                    className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 uppercase text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
                >
                  Apply Coupon to User
                </button>
              </form>

              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Recent Redemptions</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {redemptions.length === 0 ? (
                    <p className="text-slate-400">No coupon redemptions for this user yet.</p>
                  ) : (
                    redemptions.map((redemption) => (
                      <div key={redemption.id} className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2">
                        <p className="text-slate-100">
                          Coupon:{" "}
                          {Array.isArray(redemption.coupons)
                            ? redemption.coupons[0]?.code ?? redemption.coupon_id
                            : redemption.coupons?.code ?? redemption.coupon_id}
                        </p>
                        <p className="text-xs uppercase text-slate-300">Applied plan: {redemption.applied_plan}</p>
                        <p className="text-xs text-slate-400">{formatDateTime(redemption.created_at)}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </>
      ) : null}
    </section>
  );
}
