"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSubject = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(initialSubject);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip the first render to prevent initial navigation
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const currentParams = searchParams.toString();
        let newUrl = "";

        if (subject === "all" || !subject) {
            newUrl = removeKeysFromUrlQuery({
                params: currentParams,
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: currentParams,
                key: "subject",
                value: subject,
            });
        }
        router.push(newUrl, { scroll: false });
    }, [subject]); // Only depend on subject, not searchParams

    return (
        <div className="w-full md:w-[200px]">
            <Select onValueChange={setSubject} value={subject || "all"}>
                <SelectTrigger className="w-full h-11 rounded-full bg-zinc-900/50 border-white/10 text-gray-300 focus:ring-blue-500 hover:bg-zinc-900 hover:border-white/20 transition-all">
                    <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-gray-300">
                    <SelectItem value="all" className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                        All Subjects
                    </SelectItem>
                    {subjects.map((item) => (
                        <SelectItem
                            key={item}
                            value={item}
                            className="capitalize focus:bg-zinc-800 focus:text-white cursor-pointer"
                        >
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SubjectFilter;