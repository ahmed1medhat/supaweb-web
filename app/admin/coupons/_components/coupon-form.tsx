import type { CouponAppliesToPlan, CouponDiscountType, CouponStatus } from "@/app/admin/coupons/types";

type CouponFormValues = {
  id?: string;
  code: string;
  discount_type: CouponDiscountType;
  discount_value: number | null;
  applies_to_plan: CouponAppliesToPlan;
  max_redemptions: number | null;
  expires_at: string | null;
  status: CouponStatus;
  notes: string | null;
};

type CouponFormProps = {
  mode: "create" | "edit";
  submitLabel: string;
  action: (formData: FormData) => Promise<void>;
  values: CouponFormValues;
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

export default function CouponForm({ mode, submitLabel, action, values }: CouponFormProps) {
  return (
    <form action={action} className="space-y-5 rounded-xl border border-white/10 bg-slate-950/30 p-5">
      {mode === "edit" && values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-slate-200">Code</span>
          <input
            name="code"
            required
            defaultValue={values.code}
            maxLength={64}
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 uppercase text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
            placeholder="INVESTOR100"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-200">Status</span>
          <select
            name="status"
            defaultValue={values.status}
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-200">Discount type</span>
          <select
            name="discount_type"
            defaultValue={values.discount_type}
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
          >
            <option value="percent">Percent</option>
            <option value="fixed">Fixed</option>
            <option value="free">Free</option>
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-200">Discount value</span>
          <input
            name="discount_value"
            type="number"
            min={1}
            defaultValue={values.discount_value ?? ""}
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
            placeholder="For percent: 1-100. For fixed: cents or units."
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-200">Applies to plan</span>
          <select
            name="applies_to_plan"
            defaultValue={values.applies_to_plan}
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
          >
            <option value="all">All (defaults to Pro)</option>
            <option value="pro">Pro</option>
            <option value="scale">Scale</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="text-slate-200">Max redemptions</span>
          <input
            name="max_redemptions"
            type="number"
            min={1}
            defaultValue={values.max_redemptions ?? ""}
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
            placeholder="Leave empty for unlimited"
          />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span className="text-slate-200">Expires at</span>
          <input
            name="expires_at"
            type="datetime-local"
            defaultValue={toDateTimeLocalValue(values.expires_at)}
            className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="text-slate-200">Notes</span>
        <textarea
          name="notes"
          defaultValue={values.notes ?? ""}
          rows={5}
          className="w-full rounded-lg border border-white/15 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-cyan-400/40 transition focus:border-cyan-400/40 focus:ring-2"
          placeholder="Internal notes about usage, investor mapping, affiliate info, etc."
        />
      </label>

      <button
        type="submit"
        className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        {submitLabel}
      </button>
    </form>
  );
}
