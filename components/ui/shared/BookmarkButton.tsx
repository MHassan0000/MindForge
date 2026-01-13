"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
    companionId: string;
    initialBookmarked: boolean;
}

const BookmarkButton = ({ companionId, initialBookmarked }: BookmarkButtonProps) => {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    const handleToggle = () => {
        startTransition(async () => {
            if (isBookmarked) {
                await removeBookmark(companionId, pathname);
                setIsBookmarked(false);
            } else {
                await addBookmark(companionId, pathname);
                setIsBookmarked(true);
            }
        });
    };

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleToggle}
            disabled={isPending}
            className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                isBookmarked
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-white/5 text-white hover:bg-white/10",
                isPending && "opacity-50 cursor-not-allowed"
            )}
        >
            <Bookmark
                className={cn(
                    "w-4 h-4 transition-all",
                    isBookmarked && "fill-current"
                )}
            />
        </motion.button>
    );
};

export default BookmarkButton;
