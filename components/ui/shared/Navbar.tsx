import Link from "next/link";
import Image from "next/image";
import { NavItems } from "@/constants";
const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="">
                    <Image src="/images/soundlogo2.png" alt="Logo" width={50} height={50} />
                </div>
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-wider">
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

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
                <Link
                    href="/sign-in"
                    className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
                >
                    Log In
                </Link>
                <button className="px-5 py-2 text-md font-medium text-blue-400 bg-white/5 border border-white/10 rounded-full hover:bg-blue-500/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
                    Start Free Trial
                </button>
            </div>
        </nav>
    );
};

export default Navbar;