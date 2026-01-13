import CompanionForm from "@/components/ui/shared/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { getUserPlan } from "@/lib/actions/subscription.actions";
import Link from "next/link";
import { AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewCompanionPage = async () => {
    const { userId } = await auth();
    if (!userId) return redirect("/sign-in");

    const canCreateCompanion = await newCompanionPermissions();
    const userPlan = await getUserPlan();

    // If user cannot create a companion, show upgrade UI
    if (!canCreateCompanion) {
        return (
            <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 pt-32">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Limit Reached Card */}
                    <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 p-8 sm:p-12">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 space-y-6">
                            {/* Icon */}
                            <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-orange-400" />
                            </div>

                            {/* Message */}
                            <div className="space-y-3">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                    Companion Limit Reached
                                </h1>
                                <p className="text-zinc-400 max-w-md mx-auto">
                                    You've reached the maximum of{" "}
                                    <span className="text-white font-semibold">
                                        {userPlan.companionLimit} companions
                                    </span>{" "}
                                    on your{" "}
                                    <span className="text-white font-semibold">
                                        {userPlan.displayName}
                                    </span>
                                    . Upgrade to create more AI companions.
                                </p>
                            </div>

                            {/* Plan Comparison */}
                            <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Current Plan</p>
                                    <p className="text-lg font-bold text-white">{userPlan.displayName}</p>
                                    <p className="text-sm text-zinc-400">{userPlan.companionLimit} companions</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                                    <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">Recommended</p>
                                    <p className="text-lg font-bold text-white">Pro Plan</p>
                                    <p className="text-sm text-zinc-400">Unlimited companions</p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                                <Link href="/subscription">
                                    <Button className="h-12 px-8 rounded-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Upgrade Plan
                                    </Button>
                                </Link>
                                <Link href="/companion">
                                    <Button variant="outline" className="h-12 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white">
                                        View My Companions
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Normal companion creation form
    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 pt-32">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                    Create Your AI Companion
                </h1>
                <CompanionForm />
            </div>
        </div>
    );
};

export default NewCompanionPage;