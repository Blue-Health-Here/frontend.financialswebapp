"use client"

import { Input } from "../../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IoSearch } from "react-icons/io5";
import MarketingInfo from "./MarketingInfo";



const MarketingPharmacy = () => {
    const { isAddCourse } = useSelector((state: RootState) => state.course);
    const dispatch = useDispatch();


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
                <MarketingInfo/>
                <MarketingInfo/>
                <MarketingInfo/>
                <MarketingInfo/>
                <MarketingInfo/>
                <MarketingInfo/>
            </div>
            
        </div>
    );
};

export default MarketingPharmacy;
