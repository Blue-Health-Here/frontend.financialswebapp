import PharmacyLayout from "@/components/layouts/PharmacyLayout";
import CoursesPharmacy from "@/components/pharmacy/courses/CoursesPharmacy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses - Financials Web App",
};

export default async function Courses() {
  return (
    <PharmacyLayout>
      <CoursesPharmacy />
    </PharmacyLayout>
  );
}
