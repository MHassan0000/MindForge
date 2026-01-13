'use server';

import { auth } from "@clerk/nextjs/server";

export type PlanType = 'basic_plan' | 'core_learner' | 'pro_plan';

export interface PlanDetails {
    name: string;
    displayName: string;
    companionLimit: number | 'unlimited';
    conversationLimit: number | 'unlimited';
    canSaveHistory: boolean;
    color: string;
}

const PLAN_DETAILS: Record<PlanType, PlanDetails> = {
    basic_plan: {
        name: 'basic_plan',
        displayName: 'Basic Plan',
        companionLimit: 3,
        conversationLimit: 10,
        canSaveHistory: false,
        color: 'gray',
    },
    core_learner: {
        name: 'core_learner',
        displayName: 'Core Learner',
        companionLimit: 10,
        conversationLimit: 'unlimited',
        canSaveHistory: true,
        color: 'blue',
    },
    pro_plan: {
        name: 'pro_plan',
        displayName: 'Pro Plan',
        companionLimit: 'unlimited',
        conversationLimit: 'unlimited',
        canSaveHistory: true,
        color: 'purple',
    },
};

/**
 * Returns the user's current subscription plan based on Clerk billing.
 */
export const getUserPlan = async (): Promise<PlanDetails> => {
    const { has } = await auth();

    if (has({ plan: 'pro_plan' })) {
        return PLAN_DETAILS.pro_plan;
    } else if (has({ plan: 'core_learner' })) {
        return PLAN_DETAILS.core_learner;
    } else {
        // Default to basic plan (free tier)
        return PLAN_DETAILS.basic_plan;
    }
};

/**
 * Checks if the current user can save session history.
 * Only Core Learner and Pro Plan users have this feature.
 */
export const canSaveSessionHistory = async (): Promise<boolean> => {
    const plan = await getUserPlan();
    return plan.canSaveHistory;
};
