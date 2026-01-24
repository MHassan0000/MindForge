"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, MessageSquare, Target, Zap, Users } from "lucide-react";
import { features } from "@/constants";


const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/20" },
    green: { bg: "bg-green-500/10", text: "text-green-400", glow: "shadow-green-500/20" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", glow: "shadow-yellow-500/20" },
    pink: { bg: "bg-pink-500/10", text: "text-pink-400", glow: "shadow-pink-500/20" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-400", glow: "shadow-orange-500/20" },
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20 } },
};

const FeaturesSection = () => {
    return (
        <section id="features" className="py-24 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-lg font-medium text-blue-400">
                        <Sparkles className="w-3 h-3" />
                        <span>Why Choose MindForge</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Learn Smarter, Not Harder
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Experience the future of education with AI companions designed to make learning engaging, personalized, and effective.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => {
                        const colors = colorMap[feature.color];
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                className={`relative p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm group hover:border-white/10 transition-all ${colors.glow} hover:shadow-lg`}
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-6 h-6 ${colors.text}`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
