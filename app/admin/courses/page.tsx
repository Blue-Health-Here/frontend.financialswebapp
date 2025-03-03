import Image from "next/image";
import { Input } from "@/components/ui/input";
import searchIcon from "../../../public/search-icon.svg"
import AdminLayout from "@/components/layouts/AdminLayout";
import InfoCard from "@/components/common/InfoCard";
import { Button } from "@/components/ui/button";
// import AddCourseModal from "@/components/admin/AddCourseModal";

const corses = ['couse1', 'course2', 'course3', 'course4', 'course5', 'course6']
export default async function Courses() {
    return (
        <AdminLayout>
            <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <div className="flex items-center justify-between gap-3">
                        <h1>Courses</h1><Button className="w-6 h-7 text-2xl text-white pb-2.5">+</Button>
                    </div>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg" />
                        <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                            <Image src={searchIcon} alt="" />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {corses.map((course, index) => (
                        <InfoCard key={index} courseName={course} />
                    ))}
                </div>
            </div>
            {/* <AddCourseModal /> */}
        </AdminLayout>
    );
}