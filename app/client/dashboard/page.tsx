
import DashboardSection from "@/components/client/dashboard/DashboardSection";
import ClientLayout from "@/components/layouts/ClientLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Financials Web App",
};

export default async function Dashboard() {
    return (
        <ClientLayout>
            <DashboardSection />
        </ClientLayout>
    );
}