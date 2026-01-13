"use client";

import { Star } from "lucide-react";
import BlurText from "../BlurText";
import Squares from "../Squares";
const Hero = () => {
    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-black">
            {/* Squares Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction='diagonal'
                    borderColor='#333'
                    hoverFillColor='#222'
                />
            </div>
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
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/90 leading-[1.1]">
                    <BlurText
                        text="The"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-white/90 inline-block mr-2"
                        as="span"
                    />
                    <span className="text-blue-400 inline-block relative">
                        <BlurText
                            text="Shortcut"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-blue-400 inline-block"
                            as="span"
                        />
                        {/* Optional subtle underline or glow */}
                        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                    </span> <br className="hidden md:block" />
                    <BlurText
                        text="to Learning Mastery"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-white/90 inline-block"
                        as="span"
                    />
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-6">
                    <BlurText
                        text="From Novice to"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-gray-400 inline-block mr-2"
                        as="span"
                    />
                    <span className="text-white font-medium inline-block mr-1">
                        <BlurText
                            text="Expert"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-white inline-block"
                            as="span"
                        />
                    </span>
                    <BlurText
                        text="With Data-Backed AI Tutors"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-gray-400 inline-block"
                        as="span"
                    />
                </p>

                {/* CTA Buttons */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <button
                        onClick={scrollToFeatures}
                        className="px-8 py-4 bg-transparent border border-white/10 text-white font-semibold text-lg rounded-full hover:bg-white/5 transition-all tracking-wider cursor-pointer"
                    >
                        View Demo
                    </button>
                </div>
            </div>

        </section>
    );
};

export default Hero;
