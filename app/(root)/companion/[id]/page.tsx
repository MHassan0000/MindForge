import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import AnimatedContent from "@/components/ui/shared/AnimatedContent";
import { Clock, BookOpen, ArrowLeft, Info, MessageSquare } from "lucide-react";
import Link from "next/link";
import CompanionComponent from "@/components/ui/shared/CompanionComponent"; // Cleaned up import

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    if (!user) return redirect('/sign-in');
    if (!companion || !companion.name) return redirect('/companion');

    const { name, subject, topic, duration, voice, style } = companion;
    const color = getSubjectColor(subject) || "#ffffff";

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
            <AnimatedContent>
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/companion" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Library
                    </Link>
                </div>

                {/* Session Header Card */}
                <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                    {/* Background Glow */}
                    <div
                        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none"
                        style={{ backgroundColor: color }}
                    />
                    <div
                        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-[100px] opacity-10 pointer-events-none"
                        style={{ backgroundColor: color }}
                    />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex items-start gap-6">
                            {/* Icon Box */}
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                                style={{ backgroundColor: color }}
                            >
                                <BookOpen className="w-10 h-10 text-black/70" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">
                                        {name}
                                    </h1>
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white/90 shadow-sm"
                                        style={{ backgroundColor: color }}
                                    >
                                        {subject}
                                    </span>
                                </div>
                                <p className="text-lg text-gray-300 font-medium max-w-2xl">
                                    {topic}
                                </p>
                            </div>
                        </div>

                        {/* Metadata / Actions */}
                        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span>{duration} minutes</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
                                <Info className="w-4 h-4 text-purple-400" />
                                <span>Session Active</span>
                            </div>
                        </div>
                    </div>
                </article>




                <div className="mt-15">

                    <CompanionComponent
                        companionId={id}
                        subject={subject}
                        topic={topic}
                        name={name}
                        userName={user.firstName!}
                        userImage={user.imageUrl!}
                        style={style || "casual"}
                        voice={voice || "male"}
                        duration={duration || 10}
                    />
                </div>
            </AnimatedContent>
        </main >
    )
}

export default CompanionSession;