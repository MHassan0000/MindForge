"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavItems } from "@/constants";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="relative top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Link href="/">
                    <div>
                        <Image src="/images/brainlogo3.png" alt="Logo" width={50} height={50} />
                    </div>
                </Link>
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                    MindForge
                </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                {NavItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-gray-400 hover:text-blue-400 transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Auth Section - Only render on client to prevent hydration mismatch */}
            <div className="hidden md:flex items-center gap-4">
                {isMounted ? (
                    <>
                        <SignedOut>
                            <Link
                                href="/sign-in"
                                className="text-lg font-medium text-black hover:text-white transition-colors bg-white/80 px-5 py-2 rounded-full hover:bg-black"
                            >
                                Log In
                            </Link>
                            <Link href="/sign-up">
                                <button className="px-5 py-2 text-md font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-900/20 transition-all duration-300">
                                    Start Free Trial
                                </button>
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10",
                                    },
                                }}
                            />
                        </SignedIn>
                    </>
                ) : (
                    // Placeholder to prevent layout shift
                    <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
                )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-white focus:outline-hidden">
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl"
                    >
                        <div className="flex flex-col gap-4">
                            {NavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xl font-medium text-gray-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                            {isMounted && (
                                <>
                                    <SignedOut>
                                        <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                                            <button className="w-full text-lg font-medium text-black hover:text-white transition-colors bg-white/80 px-5 py-3 rounded-xl hover:bg-black">
                                                Log In
                                            </button>
                                        </Link>
                                        <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                                            <button className="w-full px-5 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-300">
                                                Start Free Trial
                                            </button>
                                        </Link>
                                    </SignedOut>
                                    <SignedIn>
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                                            <UserButton
                                                appearance={{
                                                    elements: {
                                                        avatarBox: "w-10 h-10",
                                                    },
                                                }}
                                            />
                                            <span className="text-gray-300 font-medium">Manage Account</span>
                                        </div>
                                    </SignedIn>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;