import Image from "next/image";
import searchIcon from "../../../public/search-icon.svg"
import { Input } from "@/components/ui/input";
import { PharmacyCard } from "@/components/common/PharmacyCard";
import { pharmacyData, statsData } from "@/utils/constants";
import { StatsCard } from "@/components/common/StatsCard";
import AdminLayout from "@/components/layouts/AdminLayout";

export default async function Dashboard() {
    return (
        <AdminLayout>
            {/* Statistics */}
            <div className="mt-4">
                <h3 className="text-[#5E5873] p-2">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {statsData.map((item, index) => (
                            <StatsCard key={index} value={item.value} label={item.label} color={item.color} />
                        ))}
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                        <p className="text-gray-500">[Insert Chart Component Here]</p>
                    </div>
                </div>
            </div>

            {/* Pharmacies */}
            <div className="mt-6 pl-6 pr-6 pt-12 pb-12 bg-white shadow-lg rounded-lg">
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