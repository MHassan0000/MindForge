import React from "react";
import Navbar from "@/components/ui/shared/Navbar";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>

            <div>
                <Navbar />
            </div>
            <div>{children}</div>
        </main>

    )
}
