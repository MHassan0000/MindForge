import CompanionForm from "@/components/ui/shared/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewCompanionPage = async () => {
    const { userId } = await auth();
    if (!userId) return redirect("/sign-in")
    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8 pt-32">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                    Create Your AI Companion
                </h1>
                <CompanionForm />
            </div>
        </div>
    );
};

export default NewCompanionPage;