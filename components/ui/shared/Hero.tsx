import React from "react";
import { Star } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-black">
            {/* Background Gradient/Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-blue-500/20 opacity-30 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxGluayIgdmlld0JveD0iMCAwIDcwMCA3MDAiIHdpZHRoPSI3MDAiIGhlaWdodD0iNzAwIiBvcGFjaXR5PSIxIj48ZGVmcz48ZmlsdGVyIGlkPSJubmlvaXNlRmlsdGVyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcYXJlbnQiLz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNubmlvaXNlRmlsdGVyKSIvPjwvZGVmcz48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjcAwIiBmaWxsPSIjMDAwMDAwIiBvcGFjaXR5PSIwIi8+PHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI3MDAiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

            {/* Trust Badge */}
            <div className="flex flex-col items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm font-medium">Excellent</span>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="bg-blue-500 p-1 rounded-[1px]">
                                <Star className="w-3 h-3 text-white fill-white" />
                            </div>
                        ))}
                    </div>
                    <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4 text-blue-500 fill-blue-500" /> Trustpilot
                    </span>
                </div>

                <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    <span className="text-gray-400 text-sm">Trusted by <span className="text-blue-400 font-semibold">614,384</span> Users</span>
                </div>
            </div>

            {/* Main Headline */}
            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/90 leading-[1.1] tracking-wider">
                    The <span className="text-blue-400 inline-block relative">
                        Shortcut
                        {/* Optional subtle underline or glow */}
                        <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                    </span> <br className="hidden md:block" />
                    to Learning Mastery
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                    From Novice to <span className="text-white font-medium">Expert</span> With Data-Backed AI Tutors
                </p>

                {/* CTA Buttons */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 bg-blue-500 text-white font-bold text-lg rounded-full hover:bg-blue-400 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
                        Start Free Trial
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/10 text-white font-semibold text-lg rounded-full hover:bg-white/5 transition-all">
                        View Demo
                    </button>
                </div>
            </div>

        </section>
    );
};

export default Hero;
