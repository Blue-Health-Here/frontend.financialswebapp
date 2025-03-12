
import PharmacyLayout from "@/components/layouts/PharmacyLayout";
import OperationsSection from "@/components/pharmacy/operations/OperationsSection";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Financials Web App",
};

export default async function Operations() {
    return (
        <PharmacyLayout>
           <OperationsSection/>
        </PharmacyLayout>
    );
}