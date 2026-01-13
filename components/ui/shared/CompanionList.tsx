"use client";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
interface CompanionListProps {
    items: Array<{
        id: string;
        subject: string;
        name: string;
        topic: string;
        duration: number;
    }>;
    className?: string;
    title?: string;
}

const CompanionList = ({ items, className, title }: CompanionListProps) => {
    return (
        <div className={`bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl p-8 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">{title || "Recently completed lessons"}</h2>
                <Link href="/companion">
                    <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                        View all <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>

            {/* List Header Labels */}
            <div className="flex justify-between text-sm text-gray-500 mb-4 px-2">
                <span>Lessons</span>
                <span>Subject</span>
            </div>

            {/* List Items */}
            <div className="space-y-3">
                {items.map((item, index) => {
                    const color = getSubjectColor(item.subject) || "#6366f1";
                    return (
                        <motion.div
                            key={`${item.id}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors gap-4"
                        >
                            <div className="flex items-center gap-4">
                                {/* Avatar/Icon Box */}
                                <Link href={`/companion/${item.id}`}>
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 cursor-pointer bg-black"

                                    >
                                        <Image src={`/icons/${item.subject}.svg`} alt={item.subject} width={50} height={50} className="w-6 h-6 invert" />
                                    </div>
                                </Link>

                                {/* Text Info */}
                                <div>
                                    <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors cursor-pointer">
                                        {item.name}
                                    </h4>
                                    <p className="text-sm text-gray-400 line-clamp-1">{item.topic}</p>
                                </div>
                            </div>

                            {/* Subject Badge */}
                            <div className="flex items-center justify-between sm:w-auto w-full">
                                <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/10 bg-black/40 text-gray-300 uppercase tracking-wide">
                                    <Link href={`/companion`}>
                                        {item.subject}
                                    </Link>
                                </span>
                                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white sm:hidden block" />
                            </div>

                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default CompanionList;
