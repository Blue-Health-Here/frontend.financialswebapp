import Image from "next/image";
import { Input } from "@/components/ui/input";
import searchIcon from "../../../public/search-icon.svg"
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminCourseCard from "@/components/common/AdminCourseCard";

const corses = ['couse1', 'course2', 'course3', 'course4', 'course5', 'course6']
export default async function Pharmacies() {
    return (
        <AdminLayout>
            <div className="mt-20 pl-6 pr-6 pt-10 pb-10 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <h1>Courses</h1>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg" />
                        <span className="absolute right-3 top-2.5 text-gray-500">
                            <Image src={searchIcon} alt="" />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {corses.map((course, index) => (
                        <AdminCourseCard key={index} courseName={course} />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}