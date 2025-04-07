"use client"

import { Input } from "../../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { fetchAllPharmacyMarketingMaterials } from "@/services/pharmacyServices";
import { pharmacyMarketingProps } from "@/utils/types";
import TextMessage from "@/components/common/TextMessage";
import PharmacyInfoCrad from "@/components/common/PharmacyInfoCrad";


const MarketingPharmacy = () => {
    const { marketingMaterials } = useSelector((state: RootState) => state.pharmacyMarketing);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const isFetched = useRef(false);
    
    useEffect(() => {
        if (!isFetched.current) {
            isFetched.current = true;
        fetchAllPharmacyMarketingMaterials(dispatch).finally(() => setLoading(false));
        }
    }, [dispatch]);

    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <h1>Marketing Material</h1>

                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch className="w-5 h-5" />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <TextMessage text="Loading courses..." />
                ):
                (marketingMaterials.length > 0 ? marketingMaterials.map((course: pharmacyMarketingProps, index: number) => (
                    <PharmacyInfoCrad
                     key={index}
                     title={course.title}
                     description={course.description}
                     link={course.link}
                     file_url={course.file_url}
                     filename={course.filename}
                   />
                )) : (
                    <TextMessage text="Courses not found." />
                ))}
            </div>
            
        </div>
    );
};

export default MarketingPharmacy;
