import AdminLayout from "@/components/layouts/AdminLayout";
import { Metadata } from "next";
import ProfileSection from "@/components/admin/profile/ProfileSection";

export const metadata: Metadata = {
    title: "Profile - Financials Web App",
};
export default function Profile() {
    return (
        <AdminLayout>
            <ProfileSection />
        </AdminLayout>
    );
}
