
import PharmacyLayout from "@/components/layouts/PharmacyLayout";
import OnboardingSection from "@/components/pharmacy/onboarding/OnboardingSection";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Financials Web App",
};

export default async function Onboarding() {
    return (
        <PharmacyLayout>
           <OnboardingSection/>
        </PharmacyLayout>
    );
}