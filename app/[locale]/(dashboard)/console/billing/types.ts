import type {
  PaymentMethod,
  InvoiceItem,
} from "@/app/lib/api/console/billing";

export interface BillingPlan {
  id: number;
  name: string;
  plan_type: string;

  monthly_credits: number | null;
  monthly_price: number | null;
  yearly_price: number | null;

  seat_limit: number | null;
  storage_gb: number | null;

  has_api: boolean;
  has_priority_queue: boolean;

  features: string[];
  recommended?: boolean;
}

export interface WalletInfo {
  balance: number;
  currency: string;

  added: number;
  consumed: number;
  remaining: number;

  usage_percent: number;
}

export interface SubscriptionInfo {
  has_subscription: boolean;

  plan_id?: number;

  plan_name: string;
  status: string;

  billing_cycle: string | null;
  renews_at: string | null;
  cancel_at_period_end?: boolean;

  monthly_credits: number;
  scheduled_plan_name?: string | null;
  cheduled_change_at?: string | null; 
}

export interface TransactionEntry {
  id: string;
  amount: number;
  transaction_type: string;
  reference_id: string;
  created_at: string;
}

export interface ConsoleBillingResponse {
  wallet: WalletInfo;

  subscription: SubscriptionInfo;

  plans: BillingPlan[];

  payment_methods: PaymentMethod[];

  invoices: InvoiceItem[];

  transactions: TransactionEntry[];
}