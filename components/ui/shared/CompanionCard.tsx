"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Clock, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CompanionCardProps {
    item: {
        id: string;
        subject: string;
        name: string;
        topic: string;
        duration: number;
        color: string;
    };
}

const CompanionCard = ({ item }: CompanionCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative w-full md:min-w-[350px] md:max-w-[400px] bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 overflow-hidden group"
        >
            {/* Background Glow Effect based on subject color */}
            <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none"
                style={{ backgroundColor: item.color }}
            />
            <div
                className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full blur-[60px] opacity-10 pointer-events-none"
                style={{ backgroundColor: item.color }}
            />

            {/* Header: Subject Badge & Bookmark (Optional placeholder for now) */}
            <div className="flex justify-between items-start mb-4">
                <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black"
                    style={{ backgroundColor: item.color }}
                >
                    {item.subject}
                </span>
                {/* Simple bookmark icon placeholder */}
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                    <Bookmark className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3 mb-6">
                <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {item.name}
                </h3>
                <div className="space-y-1">
                    <p className="text-sm text-gray-400 font-medium">Topic: {item.topic}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.duration} mins duration</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <Link href={`/companion/${item.id}`}>
                <button
                    className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", // Red gradient primarily
                        boxShadow: "0 4px 20px -5px rgba(220, 38, 38, 0.4)"
                    }}
                >
                    <Play className="w-4 h-4 fill-current" />
                    Launch Lesson
                </button>
            </Link>

        </motion.div>
    );
};

export default CompanionCard;