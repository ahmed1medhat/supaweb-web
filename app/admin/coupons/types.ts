export type CouponDiscountType = "percent" | "fixed" | "free";
export type CouponAppliesToPlan = "all" | "pro" | "scale" | "enterprise";
export type CouponStatus = "active" | "paused";

export type CouponRow = {
  id: string;
  created_at: string;
  updated_at: string;
  code: string;
  discount_type: CouponDiscountType;
  discount_value: number | null;
  applies_to_plan: CouponAppliesToPlan;
  max_redemptions: number | null;
  redemption_count: number;
  expires_at: string | null;
  status: CouponStatus;
  notes: string | null;
};
