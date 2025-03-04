

import AdminLayout from "@/components/layouts/AdminLayout";
import CategoryContent from "@/components/common/CategoryContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories - Financials Web App",
};

export default function Categories() {

    return (
        <AdminLayout>
            <CategoryContent />
        </AdminLayout>
    );
}

