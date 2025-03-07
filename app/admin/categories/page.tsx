

import CategoriesSection from "@/components/admin/categories/CategoriesSection";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories - Financials Web App",
};

export default function Categories() {

    return (
        <AdminLayout>
            <CategoriesSection />
        </AdminLayout>
    );
}

