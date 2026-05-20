// hooks/useBilling.ts
"use client";

import { useCallback } from "react";

import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { qxtApiClient } from "../lib/api/core/qxtClient";

import { useWorkspace } from "../context/WorkspaceContext";

/* =========================================================
   TYPES
========================================================= */

export type BillingTarget =
    | "personal"
    | "workspace";

export type BillingStatus =
    | "active"
    | "expired"
    | "free"
    | "cancelled";

export type BillingCycle =
    | "monthly"
    | "yearly";

export type BillingOverview = {
    targetType: BillingTarget;

    workspaceId: string | null;

    plan: string;

    balance: number;

    currency: string;

    renewalDate: string | null;

    subscriptionStatus: BillingStatus;

    qPowerRemaining: number;

    fairUseLimit: number;

    monthlyUsed: number;

    utilizationRatio: number;

    isWorkspaceBilling: boolean;
};

export type CheckoutResponse = {
    object: "checkout_session";

    session_id: string;

    checkout_url: string;
};

export type BillingError = {
    code: string;

    message: string;

    status: number;
};

/* =========================================================
   HELPERS
========================================================= */

function parseError(
    error: any,
    fallback: string
): BillingError {
    const detail =
        error?.response?.data?.detail;

    return {
        code:
            detail?.code ||
            "BILLING_ERROR",

        message:
            detail?.message ||
            detail ||
            fallback,

        status:
            error?.response?.status ||
            500,
    };
}

function normalizeStatus(
    value: unknown
): BillingStatus {
    switch (value) {
        case "active":
            return "active";

        case "expired":
            return "expired";

        case "cancelled":
            return "cancelled";

        default:
            return "free";
    }
}

/* =========================================================
   API
========================================================= */

async function fetchBillingOverview(
    targetType: BillingTarget,
    workspaceId?: string | null
): Promise<BillingOverview> {
    try {
        const params: Record<
            string,
            string
        > = {
            target_type:
                targetType,
        };

        if (
            targetType ===
            "workspace" &&
            workspaceId
        ) {
            params.workspace_id =
                workspaceId;
        }

        const [
            balanceRes,
            subscriptionRes,
        ] = await Promise.all([
            qxtApiClient.get(
                "/api/v1/billing/balance",
                {
                    params,
                }
            ),

            qxtApiClient.get(
                "/api/v1/company/dashboard/overview",
                {
                    params,
                }
            ),
        ]);

        const balanceData =
            balanceRes.data || {};

        const subscriptionData =
            subscriptionRes.data || {};

        const fairUseLimit =
            Number(
                subscriptionData.fair_use_limit ||
                0
            );

        const monthlyUsed =
            Number(
                subscriptionData.monthly_used_qxt ||
                0
            );

        const qPowerRemaining =
            Math.max(
                fairUseLimit -
                monthlyUsed,
                0
            );

        return {
            targetType,

            workspaceId:
                workspaceId ||
                null,

            plan:
                subscriptionData.plan_name ||
                "Free",

            balance: Number(
                balanceData.balance ||
                0
            ),

            currency:
                balanceData.currency ||
                "QXT_CREDITS",

            renewalDate:
                subscriptionData.renewal_date ||
                null,

            subscriptionStatus:
                normalizeStatus(
                    subscriptionData.subscription_status
                ),

            qPowerRemaining,

            fairUseLimit,

            monthlyUsed,

            utilizationRatio:
                fairUseLimit > 0
                    ? monthlyUsed /
                    fairUseLimit
                    : 0,

            isWorkspaceBilling:
                targetType ===
                "workspace",
        };
    } catch (error) {
        console.error(
            "[billing:overview]",
            error
        );

        throw parseError(
            error,
            "Failed to load billing overview."
        );
    }
}

async function createCheckoutSession(
    planId: number,
    billingCycle: BillingCycle
): Promise<CheckoutResponse> {
    try {
        const res =
            await qxtApiClient.post(
                "/api/v1/billing/subscribe",
                {
                    plan_id: planId,
                    billing_cycle:
                        billingCycle,
                }
            );

        return res.data;
    } catch (error) {
        console.error(
            "[billing:checkout]",
            error
        );

        throw parseError(
            error,
            "Failed to create checkout session."
        );
    }
}

/* =========================================================
   HOOK
========================================================= */

export function useBilling(
    autoRefreshMs?: number
) {
    const queryClient =
        useQueryClient();

    const {
        activeWorkspace,
        isWorkspaceMode,
    } = useWorkspace();

    /* =====================================================
       TARGET
    ===================================================== */

    const targetType: BillingTarget =
        isWorkspaceMode
            ? "workspace"
            : "personal";

    const workspaceId =
        activeWorkspace?.id ||
        null;

    /* =====================================================
       QUERY
    ===================================================== */

    const query = useQuery({
        queryKey: [
            "billing",
            targetType,
            workspaceId,
        ],

        queryFn: () =>
            fetchBillingOverview(
                targetType,
                workspaceId
            ),

        staleTime: 30_000,

        gcTime: 5 * 60_000,

        refetchInterval:
            autoRefreshMs ||
            false,

        refetchOnWindowFocus:
            false,

        retry: 1,
    });

    /* =====================================================
       OPTIMISTIC UPDATE
    ===================================================== */

    const decrementQPower =
        useCallback(
            (
                tokensUsed: number
            ) => {
                queryClient.setQueryData<BillingOverview>(
                    [
                        "billing",
                        targetType,
                        workspaceId,
                    ],
                    (old) => {
                        if (!old)
                            return old;

                        const newUsed =
                            old.monthlyUsed +
                            tokensUsed;

                        const newRemaining =
                            Math.max(
                                old.fairUseLimit -
                                newUsed,
                                0
                            );

                        return {
                            ...old,

                            monthlyUsed:
                                newUsed,

                            qPowerRemaining:
                                newRemaining,

                            utilizationRatio:
                                old.fairUseLimit >
                                    0
                                    ? newUsed /
                                    old.fairUseLimit
                                    : 0,
                        };
                    }
                );
            },
            [
                queryClient,
                targetType,
                workspaceId,
            ]
        );

    /* =====================================================
       REFRESH
    ===================================================== */

    const refreshBilling =
        useCallback(async () => {
            await queryClient.invalidateQueries(
                {
                    queryKey: [
                        "billing",
                    ],
                }
            );
        }, [queryClient]);

    /* =====================================================
       CHECKOUT
    ===================================================== */

    const createCheckout =
        useCallback(
            async (
                planId: number,
                billingCycle: BillingCycle
            ) => {
                return createCheckoutSession(
                    planId,
                    billingCycle
                );
            },
            []
        );

    /* =====================================================
       HELPERS
    ===================================================== */

    const isLocked =
        useCallback(() => {
            const data =
                query.data;

            if (!data)
                return false;

            if (
                data.subscriptionStatus ===
                "expired"
            ) {
                return true;
            }

            if (
                data.qPowerRemaining <=
                0
            ) {
                return true;
            }

            return false;
        }, [query.data]);

    const usageWarningLevel =
        useCallback(() => {
            const data =
                query.data;

            if (!data)
                return "safe";

            if (
                data.utilizationRatio >=
                1
            ) {
                return "danger";
            }

            if (
                data.utilizationRatio >=
                0.8
            ) {
                return "warning";
            }

            return "safe";
        }, [query.data]);

    /* =====================================================
       ERROR
    ===================================================== */

    const resolvedError =
        query.error as
        | BillingError
        | Error
        | null;

    /* =====================================================
       RETURN
    ===================================================== */

    return {
        ...query.data,

        loading:
            query.isLoading,

        fetching:
            query.isFetching,

        initialized:
            query.isFetched,


        targetType,

        decrementQPower,

        refreshBilling,

        createCheckout,

        isLocked,

        usageWarningLevel,
    };
}