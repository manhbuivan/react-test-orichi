export type DiscountType = "none" | "percent" | "amount";

export interface DiscountOption {
  id: string;
  title: string;
  subtitle?: string;
  label?: string;
  quantity: number;
  discountType: DiscountType;
  amount?: number;
}

export interface DiscountForm {
  campaign: string;
  title: string;
  description?: string;
  options: DiscountOption[];
}

interface Option {
  title: string;
  quantity: number;
  discountType: "none" | "percent" | "amount";
  amount?: number;
  subtitle?: string;
  label?: string;
}

export interface CampaignForm {
  campaign: string;
  description: string;
  options: Option[];
}
