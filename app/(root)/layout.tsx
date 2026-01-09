import React from "react";
import Navbar from "@/components/ui/shared/Navbar";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>

            <Navbar />
            <main>{children}</main>
        </>

    )
}
