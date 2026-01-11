import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/ui/shared/CompanionCard";
import SearchInput from "@/components/ui/shared/SearchInput";
import SubjectFilter from "@/components/ui/shared/SubjectFilter";
import AnimatedContent from "@/components/ui/shared/AnimatedContent";
import { Sparkles } from "lucide-react";
interface PageProps {
    searchParams: Promise<{
        subject?: string;
        topic?: string;
        page?: string;
        [key: string]: string | string[] | undefined;
    }>;
}

const CompanionsLibrary = async (props: PageProps) => {
    const filters = await props.searchParams;
    const subject = filters.subject ? String(filters.subject) : "";
    const topic = filters.topic ? String(filters.topic) : "";

    const companions = await getAllCompanions({ subject, topic });

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

            {/* Hero / Header Section */}
            <section className="flex flex-col gap-6 md:flex-row md:items-end justify-between relative z-10">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Learning Companions</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Library</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl">
                        Discover specialized AI tutors designed to help you master any subject. Filter by topic or search for your perfect learning partner.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/5">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>

            {/* Grid Section */}
            <AnimatedContent>
                {companions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {companions.map((companion: any) => (
                            <CompanionCard
                                key={companion.id}
                                item={companion}
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