import AdminLayout from "@/components/layouts/AdminLayout";
import CoursesSection from "@/components/admin/courses/CoursesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Courses - Financials Web App",
};

export default async function Courses() {
    return (
        <AdminLayout>
            <CoursesSection />
        </AdminLayout>
    );
}