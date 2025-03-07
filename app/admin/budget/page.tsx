import BudgetSection from "@/components/admin/budget/BudgetSection";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Budget - Financials Web App",
};

export default function AdminBudget() {
    return (
        <AdminLayout>
            <BudgetSection />
        </AdminLayout>
    );
}