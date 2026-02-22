import Link from "next/link";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import { toggleCouponStatusAction } from "@/app/admin/coupons/actions";
import type { CouponRow } from "@/app/admin/coupons/types";
import { createClient } from "@/utils/supabase/server";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type CouponsPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

function formatDateTime(value: string | null): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function formatDiscount(coupon: CouponRow): string {
  if (coupon.discount_type === "free") {
    return "Free";
  }

  if (coupon.discount_type === "percent") {
    return `${coupon.discount_value ?? 0}%`;
  }

  return `${coupon.discount_value ?? 0}`;
}

export default async function CouponsPage({ searchParams }: CouponsPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const supabase = await createClient();

  let coupons: CouponRow[] = [];
  let loadError: string | null = null;

  const { data, error } = await supabase
    .from("coupons")
    .select("id,created_at,updated_at,code,discount_type,discount_value,applies_to_plan,max_redemptions,redemption_count,expires_at,status,notes")
    .order("created_at", { ascending: false });

  if (error) {
    loadError = error.message;
  } else {
    coupons = (data ?? []) as CouponRow[];
  }

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Coupons</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create, edit, and pause coupon codes. Redemptions are tracked per user.
          </p>
        </div>
        <Link
          href="/admin/coupons/new"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          New Coupon
        </Link>
      </header>

      <FlashMessage success={resolvedSearchParams.success} error={resolvedSearchParams.error ?? loadError ?? undefined} />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-slate-900/90 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Discount</th>
              <th className="px-3 py-2">Applies</th>
              <th className="px-3 py-2">Redemptions</th>
              <th className="px-3 py-2">Expires</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-slate-950/30 text-slate-200">
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-slate-400">
                  No coupons yet.
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => {
                const targetStatus = coupon.status === "active" ? "paused" : "active";
                const toggleLabel = coupon.status === "active" ? "Pause" : "Activate";
                const redemptionLimit = coupon.max_redemptions ?? "∞";

                return (
                  <tr key={coupon.id} className="hover:bg-slate-900/50">
                    <td className="px-3 py-2 font-semibold uppercase text-slate-100">{coupon.code}</td>
                    <td className="px-3 py-2 text-slate-300">{formatDiscount(coupon)}</td>
                    <td className="px-3 py-2 text-slate-300 uppercase">{coupon.applies_to_plan}</td>
                    <td className="px-3 py-2 text-slate-300">
                      {coupon.redemption_count} / {redemptionLimit}
                    </td>
                    <td className="px-3 py-2 text-slate-400">{formatDateTime(coupon.expires_at)}</td>
                    <td className="px-3 py-2">
                      <span
                        className={[
                          "inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold uppercase",
                          coupon.status === "active"
                            ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
                            : "border-amber-400/30 bg-amber-500/15 text-amber-200",
                        ].join(" ")}
                      >
                        {coupon.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/coupons/${coupon.id}`}
                          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
                        >
                          Edit
                        </Link>
                        <form action={toggleCouponStatusAction}>
                          <input type="hidden" name="id" value={coupon.id} />
                          <input type="hidden" name="target_status" value={targetStatus} />
                          <button
                            type="submit"
                            className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
                          >
                            {toggleLabel}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
