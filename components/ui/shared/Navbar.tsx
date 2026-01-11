"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavItems } from "@/constants";

const Navbar = () => {
    return (
        <nav className="relative top-0 left-0 right-0  flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Link href="/">
                    <div>
                        <Image src="/images/brainlogo2.png" alt="Logo" width={40} height={40} />
                    </div>
                </Link>
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70 tracking-wider">
                    MindForge
                </span>
            </div>

            {/* Navigation Links */}
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

            {/* Auth Section */}
            <div className="flex items-center gap-4">
                <SignedOut>
                    <Link
                        href="/sign-in"
                        className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
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
            </div>
        </nav>
    );
};

export default Navbar;