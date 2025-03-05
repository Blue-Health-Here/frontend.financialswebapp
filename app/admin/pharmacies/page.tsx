import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";
import PharmaciesSection from "@/components/admin/pharmacies/PharmaciesSection";

export const metadata: Metadata = {
    title: "Pharmacies - Financials Web App",
};

export default async function Pharmacies() {
    return (
        <AdminLayout>
            <PharmaciesSection />
        </AdminLayout>
    );
}