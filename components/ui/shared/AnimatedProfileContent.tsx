"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

const AnimatedProfileContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full max-w-5xl mx-auto pb-20"
        >
            {React.Children.map(children, (child) => (
                <motion.div variants={item}>
                    {child}
                </motion.div>
            ))}
        </motion.main>
    );
};

export default AnimatedProfileContent;
