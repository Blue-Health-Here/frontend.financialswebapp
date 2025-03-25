import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";
import PharmacyDetail from "@/components/admin/pharmacies/PharmacyDetail";

export const metadata: Metadata = {
    title: "Pharmacy Detail - Financials Web App",
};

export default async function PharmacyDetailSection() {
    return (
        <AdminLayout>
            <PharmacyDetail />
        </AdminLayout>
    );
}