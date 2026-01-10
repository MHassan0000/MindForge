"use client";

import { PricingTable } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
};

export default function SubscriptionPage() {
    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-linear-to-b from-blue-950/20 to-black py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent)]" />

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        className="flex items-center justify-center gap-2 mb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <Sparkles className="w-8 h-8 text-blue-400" />
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-blue-300">
                            Choose Your Plan
                        </h1>
                        <motion.div
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <Sparkles className="w-8 h-8 text-blue-400" />
                        </motion.div>
                    </motion.div>

                    <motion.p
                        className="text-xl text-gray-400 max-w-2xl mx-auto mt-6"
                        {...fadeInUp}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Unlock the full potential of AI-powered learning with premium features
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {[
                            {
                                title: "Unlimited AI Companions",
                                description: "Create as many AI tutors as you need"
                            },
                            {
                                title: "Extended Sessions",
                                description: "Longer learning sessions without limits"
                            },
                            {
                                title: "Priority Support",
                                description: "Get help when you need it most"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-zinc-900/50 border border-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-zinc-900/70 transition-colors"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <motion.div
                                    className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Sparkles className="w-6 h-6 text-blue-400" />
                                </motion.div>
                                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Pricing Table Section */}
            <motion.div
                className="max-w-7xl mx-auto px-6 py-20"
                {...fadeIn}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <PricingTable
                        appearance={{
                            elements: {
                                rootBox: "mx-auto",
                                card: "bg-zinc-900 border border-white/10 shadow-2xl rounded-xl",
                                cardHeader: "bg-gradient-to-br from-blue-600/10 to-transparent border-b border-white/10",
                                cardPricingItem: "text-white",
                                cardPrice: "text-white text-4xl font-bold",
                                cardPriceText: "text-gray-400",
                                cardFeature: "text-gray-300",
                                cardFeatureIcon: "text-blue-400",
                                cardButton: "bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all",
                                cardButtonText: "text-white",
                                badge: "bg-blue-600 text-white",
                                footer: "text-gray-400",
                            },
                        }}
                    />
                </div>

                {/* Trust Indicators */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <p className="text-gray-500 text-sm">
                        🔒 Secure payment powered by Clerk • Cancel anytime • No hidden fees
                    </p>
                </motion.div>
            </motion.div>

            {/* FAQ Preview */}
            <motion.div
                className="max-w-4xl mx-auto px-6 pb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Got Questions?</h2>
                    <p className="text-gray-400">Here are some common questions about our plans</p>
                </div>

                <motion.div
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {[
                        {
                            question: "Can I upgrade or downgrade my plan?",
                            answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle."
                        },
                        {
                            question: "What payment methods do you accept?",
                            answer: "We accept all major credit cards, debit cards, and digital wallets through our secure payment provider Stripe."
                        },
                        {
                            question: "Is there a free trial available?",
                            answer: "Yes! All new users get access to create their first AI companion for free. Premium features require a subscription."
                        }
                    ].map((faq, index) => (
                        <motion.details
                            key={index}
                            className="bg-zinc-900/50 border border-white/10 rounded-lg p-6 backdrop-blur-sm group"
                            variants={fadeInUp}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                                <span>{faq.question}</span>
                                <span className="text-blue-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <motion.p
                                className="text-gray-400 mt-4 text-sm"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.3 }}
                            >
                                {faq.answer}
                            </motion.p>
                        </motion.details>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
