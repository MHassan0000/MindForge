"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";

interface SubjectFilterProps {
    value: string;
    onChange: (value: string) => void;
}

const SubjectFilter = ({ value, onChange }: SubjectFilterProps) => {
    return (
        <div className="w-full md:w-[200px]">
            <Select onValueChange={onChange} value={value || "all"}>
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