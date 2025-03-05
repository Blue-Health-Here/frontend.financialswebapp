import MarketingSection from "@/components/admin/marketing/MarketingSection";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Marketing - Financials Web App",
};

export default async function Marketing() {
    return (
        <AdminLayout>
            <MarketingSection />
        </AdminLayout>
    );
}