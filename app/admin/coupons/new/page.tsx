import Link from "next/link";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import CouponForm from "@/app/admin/coupons/_components/coupon-form";
import { createCouponAction } from "@/app/admin/coupons/actions";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type NewCouponPageProps = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

export default async function NewCouponPage({ searchParams }: NewCouponPageProps) {
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">New Coupon</h1>
          <p className="mt-2 text-sm text-slate-400">
            Configure plan targeting, limits, and expiration settings.
          </p>
        </div>
        <Link
          href="/admin/coupons"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
        >
          Back to Coupons
        </Link>
      </header>

      <FlashMessage success={resolvedSearchParams.success} error={resolvedSearchParams.error} />

      <CouponForm
        mode="create"
        submitLabel="Create Coupon"
        action={createCouponAction}
        values={{
          code: "",
          discount_type: "percent",
          discount_value: 10,
          applies_to_plan: "all",
          max_redemptions: null,
          expires_at: null,
          status: "active",
          notes: null,
        }}
      />
    </section>
  );
}
