import AnimatedProfileContent from "@/components/ui/shared/AnimatedProfileContent";
import { Button } from "@/components/ui/button";
import { Target, DollarSign, Globe, Zap, ArrowRight } from "lucide-react";

const Affiliate = () => {
    return (
        <AnimatedProfileContent>
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden rounded-3xl bg-black border border-white/5 p-8 sm:p-16 mb-8 text-center sm:text-left flex flex-col">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400">
                            <Zap className="w-3 h-3 fill-current" />
                            <span>Become a Partner</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
                            Earn while you <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">share knowledge.</span>
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-xl">
                            Join the MindForge Affiliate Program and earn 30% commission on every referral. Help others discover their AI companion.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button className="h-12 px-8 text-lg rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-bold">
                                Join Program <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button variant="outline" className="h-12 px-8 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white">
                                Learn More
                            </Button>
                        </div>
                    </div>


                </div>
            </section>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <DollarSign className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">30% Commission</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Earn industry-leading commissions on all initial payments and recurring subscriptions for 12 months.
                    </p>
                </div>
                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Globe className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Global Payments</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Get paid in your local currency via PayPal, Stripe, or direct bank transfer. No hidden fees.
                    </p>
                </div>
                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Real-time Tracking</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Monitor your clicks, conversions, and earnings in real-time with our advanced affiliate dashboard.
                    </p>
                </div>
            </div>

            {/* How it works */}
            <section className="p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-white/5">
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                    <div className="md:w-1/3">
                        <h2 className="text-3xl font-bold text-white mb-4">How it works</h2>
                        <p className="text-zinc-400">Three simple steps to start earning with MindForge today.</p>
                    </div>
                    <div className="md:w-2/3 space-y-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white font-bold border border-white/10">1</div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Sign up for an account</h4>
                                <p className="text-zinc-400 text-sm">Join our affiliate network in under 2 minutes. Approval is instant.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white font-bold border border-white/10">2</div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Share your unique link</h4>
                                <p className="text-zinc-400 text-sm">Post it on your blog, social media, or share directly with friends.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white font-bold border border-white/10">3</div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Start earning commission</h4>
                                <p className="text-zinc-400 text-sm">Get paid automatically every month once you reach the $50 threshold.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AnimatedProfileContent>
    );
};

export default Affiliate;