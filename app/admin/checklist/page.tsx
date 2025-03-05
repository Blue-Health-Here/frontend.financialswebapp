import ChecklistSection from "@/components/admin/checklist/ChecklistSection";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checklist - Financials Web App",
};

export default function Checklist() {
    return (
        <AdminLayout>
            <ChecklistSection />
        </AdminLayout>
    );
}
