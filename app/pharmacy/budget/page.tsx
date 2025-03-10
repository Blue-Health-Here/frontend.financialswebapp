import ClientLayout from "@/components/layouts/ClientLayout";
import BudgetSection from "@/components/pharmacy/budget/BudgetSection";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Financials Web App",
};

export default async function Dashboard() {
    return (
        <ClientLayout>
            <BudgetSection />
        </ClientLayout>
    );
}