import BudgetDetail from "@/components/admin/budget/BudgetDetail";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Budget Detail - Financials Web App",
};

const BudgetDetailSection = () => {
  return (
    <AdminLayout>
      <BudgetDetail />
    </AdminLayout>
  );
};

export default BudgetDetailSection;
