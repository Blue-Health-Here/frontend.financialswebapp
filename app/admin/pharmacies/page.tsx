import Image from "next/image";
import { Input } from "@/components/ui/input";
import { PharmacyCard } from "@/components/common/PharmacyCard";
import { pharmacyData } from "@/utils/constants";
import searchIcon from "../../../public/search-icon.svg"
import AdminLayout from "@/components/layouts/AdminLayout";

export default async function Pharmacies() {
    return (
        <AdminLayout>
            <div className="mt-20 pl-6 pr-6 pt-12 pb-12 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <h1>Pharmacies</h1>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg" />
                        <span className="absolute right-3 top-2.5 text-gray-500">
                            <Image src={searchIcon} alt="" />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pharmacyData.map((pharmacy, index) => (
                        <PharmacyCard key={index} pharmacy={pharmacy} />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}