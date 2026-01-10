import Hero from "@/components/ui/shared/Hero";
import CompanionCard from "@/components/ui/shared/CompanionCard";
import CompanionList from "@/components/ui/shared/CompanionList";
import Cta from "@/components/ui/shared/Cta";
import { recentSessions } from "@/constants";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Hero />

      <div className="container mx-auto px-4 py-12 space-y-12 max-w-7xl">
        {/* Companion Cards Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Active Sessions</h2>
          </div>
          {/* Scrollable container for cards on mobile, grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSessions.slice(0, 3).map((session) => (
              <CompanionCard key={session.id} item={session} />
            ))}
          </div>
        </section>

        {/* Lower Section: List + CTA */}
        <section className="flex flex-col lg:flex-row gap-6">
          <CompanionList items={recentSessions} className="lg:w-2/3 w-full" />
          <Cta className="lg:w-1/3 w-full min-h-[400px]" />
        </section>
      </div>
    </main>
  );
}
