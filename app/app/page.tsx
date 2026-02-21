import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type PlanId = "free" | "pro" | "scale" | "enterprise";

type ProfileRow = {
  plan: string | null;
  subscription_status: string | null;
  billing_cycle: string | null;
};

const PLAN_LIMITS: Record<PlanId, { pages: number; factors: number }> = {
  free: { pages: 20, factors: 400 },
  pro: { pages: 1000, factors: 800 },
  scale: { pages: 20000, factors: 1200 },
  enterprise: { pages: 1000000, factors: 1600 },
};

function normalizePlan(plan: string | null | undefined): PlanId {
  if (plan === "pro" || plan === "scale" || plan === "enterprise") {
    return plan;
  }

  return "free";
}

async function getOrCreateProfile(userId: string): Promise<ProfileRow> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("plan,subscription_status,billing_cycle")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (data) {
    return data;
  }

  const { data: created, error: createError } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: userId,
        plan: "free",
        subscription_status: "free",
        billing_cycle: null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("plan,subscription_status,billing_cycle")
    .single();

  if (createError || !created) {
    throw new Error(createError?.message ?? "Unable to create profile.");
  }

  return created;
}

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let profile: ProfileRow = {
    plan: "free",
    subscription_status: "free",
    billing_cycle: null,
  };

  try {
    profile = await getOrCreateProfile(user.id);
  } catch {
    profile = {
      plan: "free",
      subscription_status: "free",
      billing_cycle: null,
    };
  }

  const normalizedPlan = normalizePlan(profile.plan);
  const limits = PLAN_LIMITS[normalizedPlan];
  const subscriptionStatus = profile.subscription_status ?? "free";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-14 text-slate-100">
      <section className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome, {user.email ?? "User"}</h1>

        <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
          <h2 className="text-xl font-semibold text-white">Your Plan</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <p className="rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-2">
              Plan: <span className="font-semibold uppercase">{normalizedPlan}</span>
            </p>
            <p className="rounded-lg border border-blue-400/25 bg-blue-500/10 px-3 py-2">
              Limits: <span className="font-semibold">{limits.pages} pages / {limits.factors} factors</span>
            </p>
            <p className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2">
              Subscription: <span className="font-semibold">{subscriptionStatus}</span>
            </p>
          </div>

          {profile.billing_cycle ? (
            <p className="mt-3 text-xs text-slate-400">Billing cycle: {profile.billing_cycle}</p>
          ) : null}

          <Link
            href="/download"
            className="mt-6 inline-flex rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Download Desktop App
          </Link>
        </article>

        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
          <h2 className="text-xl font-semibold text-white">My Reports</h2>
          <p className="mt-3 text-sm text-slate-400">
            No reports yet. Run a scan from Desktop to see results here.
          </p>
        </section>
      </section>
    </main>
  );
}
