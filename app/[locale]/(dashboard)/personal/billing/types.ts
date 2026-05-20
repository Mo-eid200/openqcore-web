// types.ts

export interface BillingPlan {
    id: string;
    name: string;
    price: string;
    period: "monthly" | "yearly";
    features: string[];
    recommended?: boolean;
}

export interface BillingHistoryEntry {
    id: string;
    amount: string;
    status: "paid" | "pending" | "failed";
    date: string;
    method: string;
    invoiceUrl?: string;
}

export interface PaymentMethod {
    id: string;
    type: "card" | "paypal";
    last4: string;
    brand?: string;
    addedAt: string;
    isDefault?: boolean;
}