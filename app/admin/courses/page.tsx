import Image from "next/image";
import { Input } from "@/components/ui/input";
import searchIcon from "../../../public/search-icon.svg"
import AdminLayout from "@/components/layouts/AdminLayout";
import InfoCard from "@/components/common/InfoCard";

const corses = ['couse1', 'course2', 'course3', 'course4', 'course5', 'course6']
export default async function Courses() {
    return (
        <AdminLayout>
            <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <h1>Courses</h1>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg" />
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
        </AdminLayout>
    );
}