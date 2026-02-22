import Link from "next/link";
import { redirect } from "next/navigation";
import { resolveEffectivePlan } from "@/lib/entitlements";
import { createClient } from "@/utils/supabase/server";
import { applySelfCouponAction } from "@/app/app/billing/actions";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type BillingPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

type ProfileRow = {
  plan: string | null;
  subscription_status: string | null;
  billing_cycle: string | null;
  admin_plan_override: string | null;
  admin_override_expires_at: string | null;
};

function getMessage(value: SearchParamValue): string | null {
  if (!value) {
    return null;
  }

  const text = Array.isArray(value) ? value[0] : value;
  if (!text) {
    return null;
  }

  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

async function getOrCreateProfile(userId: string, email: string | null): Promise<ProfileRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("plan,subscription_status,billing_cycle,admin_plan_override,admin_override_expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    return data as ProfileRow;
  }

  const { data: created, error: createError } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: userId,
        email: email?.toLowerCase() ?? null,
        plan: "free",
        subscription_status: "free",
        billing_cycle: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("plan,subscription_status,billing_cycle,admin_plan_override,admin_override_expires_at")
    .single();

  if (createError || !created) {
    throw new Error(createError?.message ?? "Unable to create profile.");
  }

  return created as ProfileRow;
}

export default async function AppBillingPage({ searchParams }: BillingPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const success = getMessage(resolvedSearchParams.success);
  const errorMessage = getMessage(resolvedSearchParams.error);

  let profile: ProfileRow = {
    plan: "free",
    subscription_status: "free",
    billing_cycle: null,
    admin_plan_override: null,
    admin_override_expires_at: null,
  };

  try {
    profile = await getOrCreateProfile(user.id, user.email ?? null);
  } catch {
    profile = {
      plan: "free",
      subscription_status: "free",
      billing_cycle: null,
      admin_plan_override: null,
      admin_override_expires_at: null,
    };
  }

  const { effectivePlan, source } = resolveEffectivePlan(profile);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-slate-100">
      <section className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Billing & Coupons</h1>
          <p className="text-sm text-slate-400">Apply promo codes and review your current effective plan.</p>
        </header>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <p className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-2">
              Effective Plan: <span className="font-semibold uppercase">{effectivePlan}</span>
            </p>
            <p className="rounded-lg border border-blue-400/25 bg-blue-500/10 px-3 py-2">
              Base Plan: <span className="font-semibold uppercase">{profile.plan ?? "free"}</span>
            </p>
            <p className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2">
              Status: <span className="font-semibold">{profile.subscription_status ?? "free"}</span>
            </p>
          </div>

          {source === "admin_override" ? (
            <p className="mt-3 text-xs text-amber-300">
              An admin override is currently active for this account.
            </p>
          ) : null}

          {profile.billing_cycle ? (
            <p className="mt-2 text-xs text-slate-400">Billing cycle: {profile.billing_cycle}</p>
          ) : null}
        </div>

        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
          <h2 className="text-lg font-semibold text-white">Apply Coupon</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter your coupon code exactly as provided.
          </p>

          {success ? (
            <p className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
              {success}
            </p>
          ) : null}

          {errorMessage ? (
            <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
              {errorMessage}
            </p>
          ) : null}

          <form action={applySelfCouponAction} className="mt-5 space-y-4">
            <div>
              <label htmlFor="code" className="mb-2 block text-sm font-medium text-slate-200">
                Coupon code
              </label>
              <input
                id="code"
                name="code"
                required
                maxLength={64}
                placeholder="INVESTOR100"
                className="w-full rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-sm uppercase text-slate-100 outline-none ring-cyan-400/50 transition focus:border-cyan-400/40 focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Apply Coupon
            </button>
          </form>
        </section>

        <Link
          href="/app"
          className="inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
        >
          Back to App
        </Link>
      </section>
    </main>
  );
}
