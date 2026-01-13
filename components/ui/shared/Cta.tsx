"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Cta = ({ className }: { className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 group ${className}`}
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0  bg-linear-to-b from-black via-zinc-950 to-black opacity-100" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* Floating elements animation */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"
            />

            <div className="relative z-10 flex flex-col items-center gap-2">
                <div className=" bg-white/10 rounded-3xl backdrop-blur-sm border border-black">
                    {/* <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-300" /> */}
                    <Image className="rounded-3xl" src="/images/soundlogo1.png" width={100} height={100} alt="Sound Logo" />
                </div>

                <h2 className="text-3xl font-bold text-white leading-tight">
                    Create your own<br />
                    <span className="text-blue-200">AI Companion</span>
                </h2>

                <p className="text-blue-100 text-sm max-w-[200px]">
                    Pick a name, subject, voice and personality - and start learning through voice conversations that feel natural and fun.
                </p>
            </div>
            <Link href={`/companion/new`}>
                <button className="relative z-10 group/btn flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all active:scale-95 hover:scale-105">
                    <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
                    Create New
                </button>
            </Link>

        </motion.div>
    );
};

export default Cta;