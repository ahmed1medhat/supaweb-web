import Link from "next/link";
import FlashMessage from "@/app/admin/campaigns/_components/flash-message";
import CouponForm from "@/app/admin/coupons/_components/coupon-form";
import { updateCouponAction } from "@/app/admin/coupons/actions";
import type { CouponRow } from "@/app/admin/coupons/types";
import { createClient } from "@/utils/supabase/server";

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

type CouponDetailPageProps = {
  params: Promise<{ id: string }> | { id: string };
  searchParams?: Promise<SearchParams> | SearchParams;
};

export default async function CouponDetailPage({ params, searchParams }: CouponDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = (await Promise.resolve(searchParams)) ?? {};
  const supabase = await createClient();

  let coupon: CouponRow | null = null;
  let loadError: string | null = null;

  const { data, error } = await supabase
    .from("coupons")
    .select("id,created_at,updated_at,code,discount_type,discount_value,applies_to_plan,max_redemptions,redemption_count,expires_at,status,notes")
    .eq("id", resolvedParams.id)
    .maybeSingle();

  if (error) {
    loadError = error.message;
  } else {
    coupon = (data ?? null) as CouponRow | null;
  }

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Edit Coupon</h1>
          <p className="mt-2 text-sm text-slate-400">
            Update coupon rules, status, and notes.
          </p>
        </div>
        <Link
          href="/admin/coupons"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
        >
          Back to Coupons
        </Link>
      </header>

      <FlashMessage
        success={resolvedSearchParams.success}
        error={resolvedSearchParams.error ?? loadError ?? (!coupon ? "Coupon not found." : undefined)}
      />

      {coupon ? (
        <CouponForm
          mode="edit"
          submitLabel="Save Coupon"
          action={updateCouponAction}
          values={{
            id: coupon.id,
            code: coupon.code,
            discount_type: coupon.discount_type,
            discount_value: coupon.discount_value,
            applies_to_plan: coupon.applies_to_plan,
            max_redemptions: coupon.max_redemptions,
            expires_at: coupon.expires_at,
            status: coupon.status,
            notes: coupon.notes,
          }}
        />
      ) : null}
    </section>
  );
}
