"use client";

import { useQuery } from "@tanstack/react-query";

import { qxtApiClient } from "../lib/api/core/qxtClient";

export type BillingPlanType =
    | "personal"
    | "workspace"
    | "company";

export interface BillingPlan {
    id: number;

    name: string;

    monthly_price?: number;
    yearly_price?: number;

    currency: string;

    monthly_credits: number;

    fair_use_qxt: number;

    base_multiplier: number;

    plan_type: BillingPlanType;

    seat_limit: number;

    storage_gb: number;

    has_api: boolean;

    has_priority_queue: boolean;
}

async function fetchPlans(): Promise<
    BillingPlan[]
> {
    const res =
        await qxtApiClient.get(
            "/api/v1/billing/plans"
        );

    return res.data?.data || [];
}

export function useBillingPlans() {
    const query = useQuery({
        queryKey: ["billing-plans"],

        queryFn: fetchPlans,

        staleTime: 5 * 60_000,

        gcTime: 10 * 60_000,

        retry: 1,

        refetchOnWindowFocus: false,
    });

    return {
        plans: query.data || [],

        loading: query.isLoading,

        fetching: query.isFetching,

        initialized: query.isFetched,

        error: query.error,
    };
}