"use client";

import { motion } from "framer-motion";
import {
    Instagram,
    Twitter,
    Linkedin,
    Github,
    Mail,
    Heart,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: "Features", href: "/#features" },
            { label: "Companions", href: "/companion" },
            { label: "Pricing", href: "/pricing" },
            { label: "Enterprise", href: "/enterprise" },
        ],
        company: [
            { label: "About Us", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
        ],
        legal: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
        ],
    };

    return (
        <footer className="relative bg-black pt-20 pb-10 overflow-hidden border-t border-white/10">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container  mx-auto px-4 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start lg:place-items-center gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <h3 className="text-3xl font-bold bg-clip-text text-white">
                                MindForge
                            </h3>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Empowering your learning journey with AI-driven companions. Master new skills faster, smarter, and with personalized support.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Twitter, href: "https://twitter.com" },
                                { icon: Github, href: "https://github.com" },
                                { icon: Linkedin, href: "https://linkedin.com" },
                                { icon: Instagram, href: "https://instagram.com" },
                            ].map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                                    >
                                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className=" space-y-6">
                        <h4 className="text-white font-semibold text-lg">Product</h4>
                        <ul className="space-y-4">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className=" space-y-6">
                        <h4 className="text-white font-semibold text-lg">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>

                {/* Bottom Bar */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm font-medium">
                        © {currentYear} MindForge. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.label} href={link.href} className="text-gray-500 hover:text-white text-sm transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                        <span>by Alpha Tech</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
