"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
    return (
        <div className="relative w-full md:w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
                placeholder="Search topics..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 bg-zinc-900/50 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 rounded-full h-11 transition-all hover:bg-zinc-900 hover:border-white/20"
            />
        </div>
    );
};

export default SearchInput;