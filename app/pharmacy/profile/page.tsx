import { Metadata } from "next";
import PharmacyLayout from "@/components/layouts/PharmacyLayout";
import ProfileSection from "@/components/pharmacy/profile/ProfileSection";

export const metadata: Metadata = {
    title: "Profile - Financials Web App",
};
export default function Profile() {
    return (
        <PharmacyLayout>
            <ProfileSection />
        </PharmacyLayout>
    );
}
