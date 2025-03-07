
import DashboardSection from "@/components/admin/dashboard/DashboardSection";
import AdminLayout from "@/components/layouts/AdminLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Financials Web App",
};

export default async function Dashboard() {
    return (
        <AdminLayout>
            <DashboardSection />
        </AdminLayout>
    );
}