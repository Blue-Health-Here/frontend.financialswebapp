import AdminLayout from "@/components/layouts/AdminLayout";
import CoursesSection from "@/components/admin/courses/CoursesSection";

export default async function Courses() {
    return (
        <AdminLayout>
            <CoursesSection />
        </AdminLayout>
    );
}