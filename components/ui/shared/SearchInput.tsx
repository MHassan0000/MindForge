"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("topic") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the first render to prevent initial navigation
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            const currentParams = searchParams.toString();

            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: currentParams,
                    key: "topic",
                    value: searchQuery,
                });
                router.push(newUrl, { scroll: false });
            } else {
                const newUrl = removeKeysFromUrlQuery({
                    params: currentParams,
                    keysToRemove: ["topic"],
                });
                router.push(newUrl, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]); // Only depend on searchQuery, not searchParams

    return (
        <div className="relative w-full md:w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 rounded-full h-11 transition-all hover:bg-zinc-900 hover:border-white/20"
            />
        </div>
    );
};

export default SearchInput;