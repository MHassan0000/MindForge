import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
    getUserCompanions,
    getUserSessions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionList from "@/components/ui/shared/CompanionList";
import { GraduationCap, BookOpen } from "lucide-react";
import AnimatedProfileContent from "@/components/ui/shared/AnimatedProfileContent";

const Profile = async () => {
    const user = await currentUser();

    if (!user) redirect("/sign-in");

    // Fetch data in parallel
    const [companions, sessionHistory] = await Promise.all([
        getUserCompanions(user.id),
        getUserSessions(user.id)
    ]);

    return (
        <AnimatedProfileContent>
            {/* Header Section */}
            <section className="relative w-full overflow-hidden rounded-3xl bg-black border border-white/5 p-6 sm:p-10 mb-8">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* User Info */}
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-black rounded-full opacity-75 group-hover:opacity-100 transition duration-200 blur"></div>
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-zinc-900">
                                <Image
                                    src={user.imageUrl}
                                    alt={user.firstName!}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-zinc-400 font-medium">
                                {user.emailAddresses[0].emailAddress}
                            </p>

                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex gap-4 sm:gap-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px] backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2 text-green-400">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-bold text-white">{sessionHistory.length}</span>
                            <span className="text-xs text-zinc-400 font-medium">Lessons</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px] backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-2 text-orange-400">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-bold text-white">{companions.length}</span>
                            <span className="text-xs text-zinc-400 font-medium">Created</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="space-y-8">
                {/* Recent Sessions */}
                <section>
                    <CompanionList
                        title="Recent Sessions"
                        items={sessionHistory}
                    />
                </section>

                {/* My Companions */}
                <section>
                    <CompanionList
                        title="My Created Companions"
                        items={companions}
                    />
                </section>
            </div>
        </AnimatedProfileContent>
    );
};

export default Profile;