import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getBookmarkedCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/ui/shared/CompanionCard";
import AnimatedProfileContent from "@/components/ui/shared/AnimatedProfileContent";
import { Bookmark, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BookmarksPage = async () => {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

    return (
        <AnimatedProfileContent>
            {/* Header */}
            <section className="relative w-full overflow-hidden rounded-3xl bg-black border border-white/5 p-6 sm:p-10 mb-8">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                            <Bookmark className="w-6 h-6 text-yellow-400 fill-current" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Bookmarks</h1>
                            <p className="text-zinc-400 text-sm">{bookmarkedCompanions.length} saved companions</p>
                        </div>
                    </div>
                    <Link href="/profile">
                        <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Profile
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Companions Grid */}
            {bookmarkedCompanions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {bookmarkedCompanions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            item={companion}
                            isBookmarked={true}
                        />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-20">
                    <div className="w-20 h-20 mx-auto rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                        <Bookmark className="w-10 h-10 text-zinc-600" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">No Bookmarks Yet</h2>
                    <p className="text-zinc-400 max-w-md mx-auto mb-6">
                        Start bookmarking companions you want to revisit later. Click the bookmark icon on any companion card.
                    </p>
                    <Link href="/companion">
                        <Button className="bg-white text-black hover:bg-zinc-200">
                            Browse Companions
                        </Button>
                    </Link>
                </div>
            )}
        </AnimatedProfileContent>
    );
};

export default BookmarksPage;