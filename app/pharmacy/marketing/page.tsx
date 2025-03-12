import DashboardSection from "@/components/admin/dashboard/DashboardSection";
import PharmacyLayout from "@/components/layouts/PharmacyLayout";
import MarketingPharmacy from "@/components/pharmacy/marketing/MarketingPharmacy";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Financials Web App",
};

export default async function Marketing() {
  return (
    <PharmacyLayout>
      <MarketingPharmacy/>
    </PharmacyLayout>
  );
}
