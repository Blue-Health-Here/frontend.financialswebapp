
import ClientLayout from "@/components/layouts/PharmacyLayout";
import DashboardSection from "@/components/pharmacy/dashboard/DashboardSection";

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