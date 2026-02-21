"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type PlanId = "free" | "pro" | "scale" | "enterprise";

type Plan = {
  id: PlanId;
  name: string;
  pages: string;
  factors: string;
  description: string;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    pages: "20 pages",
    factors: "400 factors",
    description: "Get started with core crawling and checks.",
  },
  {
    id: "pro",
    name: "Pro",
    pages: "1000 pages",
    factors: "800 factors",
    description: "For growing teams that need deeper coverage.",
  },
  {
    id: "scale",
    name: "Scale",
    pages: "20000 pages",
    factors: "1200 factors",
    description: "Built for large properties and faster iteration.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    pages: "1000000 pages",
    factors: "1600 factors",
    description: "Maximum scale with full operational control.",
  },
];

export default function SelectPlanPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSavingPlan, setIsSavingPlan] = useState<PlanId | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const ensureSession = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session?.user) {
          router.replace("/login");
          return;
        }

        if (isMounted) {
          setUserId(data.session.user.id);
        }
      } catch {
        router.replace("/login");
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    };

    void ensureSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSelectPlan = async (planId: PlanId) => {
    if (!userId) {
      router.replace("/login");
      return;
    }

    setErrorMessage("");
    setIsSavingPlan(planId);

    try {
      const supabase = createClient();
      const subscriptionStatus = planId === "free" ? "free" : "pending";

      const { error } = await supabase.from("profiles").upsert(
        {
          user_id: userId,
          plan: planId,
          subscription_status: subscriptionStatus,
          billing_cycle: null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

      if (error) {
        throw error;
      }

      router.push("/app");
    } catch {
      setErrorMessage("Unable to save your plan. Please try again.");
      setIsSavingPlan(null);
    }
  };

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
        <p className="text-sm text-slate-400">Checking your account...</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-16 text-slate-100">
      <div className="pointer-events-none absolute -top-32 left-8 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <section className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">Choose your plan</h1>
          <p className="mt-3 text-sm text-slate-400">
            Select a plan to set your current scan limits. You can change this later.
          </p>
        </div>

        {errorMessage ? (
          <p className="mx-auto mb-6 max-w-xl rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-300">
            {errorMessage}
          </p>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const isSavingThisPlan = isSavingPlan === plan.id;
            const hasAnotherSaveInProgress = isSavingPlan !== null && !isSavingThisPlan;

            return (
              <article
                key={plan.id}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/30 backdrop-blur-xl"
              >
                <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>

                <div className="mt-6 space-y-2 text-sm">
                  <div className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-cyan-200">
                    {plan.pages}
                  </div>
                  <div className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-blue-200">
                    {plan.factors}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void handleSelectPlan(plan.id)}
                  disabled={isSavingThisPlan || hasAnotherSaveInProgress}
                  className="mt-6 w-full rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingThisPlan ? "Saving..." : "Select"}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
