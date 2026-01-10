import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-6">
      {/* Back to Home Button */}
      <Link href="/" className="self-start ml-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </Link>

      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-900 border border-white/10 shadow-2xl",
            headerTitle: "text-white text-2xl font-bold",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
            socialButtonsBlockButtonText: "text-white",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-zinc-800 border-white/10 text-white placeholder:text-gray-500 focus:ring-blue-500",
            footerActionLink: "text-blue-400 hover:text-blue-300",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-blue-400 hover:text-blue-300",
            formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",
            formHeaderTitle: "text-white",
            formHeaderSubtitle: "text-gray-400",
            dividerLine: "bg-white/10",
            dividerText: "text-gray-400",
            otpCodeFieldInput: "bg-zinc-800 border-white/10 text-white",
          },
        }}
      />
    </div>
  );
}
