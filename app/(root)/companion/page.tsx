"use client";

import { useEffect, useState } from "react";
import { getAllCompanions, getUserBookmarkIds } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/ui/shared/CompanionCard";
import SearchInput from "@/components/ui/shared/SearchInput";
import SubjectFilter from "@/components/ui/shared/SubjectFilter";
import AnimatedContent from "@/components/ui/shared/AnimatedContent";
import { Sparkles } from "lucide-react";

const CompanionsLibrary = () => {
    const [allCompanions, setAllCompanions] = useState<Companion[]>([]);
    const [filteredCompanions, setFilteredCompanions] = useState<Companion[]>([]);
    const [bookmarkIds, setBookmarkIds] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all companions on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [companions, bookmarks] = await Promise.all([
                    getAllCompanions({ limit: 1000 }), // Fetch all companions
                    getUserBookmarkIds()
                ]);
                setAllCompanions(companions || []);
                setFilteredCompanions(companions || []);
                setBookmarkIds(bookmarks);
            } catch (error) {
                console.error("Error fetching companions:", error);
                setAllCompanions([]);
                setFilteredCompanions([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Client-side filtering - runs instantly whenever search or subject changes
    useEffect(() => {
        let filtered = allCompanions;

        // Filter by subject
        if (selectedSubject && selectedSubject !== "all") {
            filtered = filtered.filter(companion =>
                companion.subject?.toLowerCase() === selectedSubject.toLowerCase()
            );
        }

        // Filter by search query (topic or name)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(companion =>
                companion.topic?.toLowerCase().includes(query) ||
                companion.name?.toLowerCase().includes(query)
            );
        }

        setFilteredCompanions(filtered);
    }, [searchQuery, selectedSubject, allCompanions]);

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

            {/* Hero / Header Section */}
            <section className="flex flex-col gap-6 md:flex-row md:items-end justify-between relative z-10">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-lg font-medium">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Learning Companions</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
                        Explore the <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">Library</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl">
                        Discover specialized AI tutors designed to help you master any subject. Filter by topic or search for your perfect learning partner.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/5">
                    <SearchInput value={searchQuery} onChange={setSearchQuery} />
                    <SubjectFilter value={selectedSubject} onChange={setSelectedSubject} />
                </div>
            </section>

            {/* Grid Section */}
            <AnimatedContent>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Loading companions...</h3>
                    </div>
                ) : filteredCompanions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCompanions.map((companion) => (
                            <CompanionCard
                                key={companion.id}
                                item={companion}
                                isBookmarked={bookmarkIds.has(companion.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">No companions found</h3>
                        <p className="text-gray-400 max-w-md">
                            Try adjusting your filters or search terms to find what you're looking for.
                        </p>
                    </div>
                )}
            </AnimatedContent>
        </main>
    );
};

export default CompanionsLibrary;