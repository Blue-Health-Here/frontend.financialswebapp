"use client"

import React from 'react'
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import InfoCard from "@/components/common/InfoCard";
import { marketinMaterial } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AddMarketingModal from './AddMarketingModal';
import { setIsAddMarketing } from '@/store/features/marketing/marketingSlice';
import { SubmitButton } from '@/components/submit-button';
import { FaPlus } from "react-icons/fa";

const MarketingSection = () => {
    const { isAddMarketing } = useSelector((state: RootState) => state.marketing)
    const dispatch = useDispatch()
    const handleAddMarketing = () => {
        dispatch(setIsAddMarketing(true))
    }
    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <h1>Marketing Material</h1><SubmitButton onClick={handleAddMarketing} className="w-7 h-7 p-1 text-white"><FaPlus className="text-white" size={12} /></SubmitButton>
                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Marketing Material" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch className="w-5 h-5" />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketinMaterial.map((marketing, index) => (
                    <InfoCard key={index} courseName={marketing} />
                ))}
            </div>
            {isAddMarketing && <AddMarketingModal />}
        </div>
    )
}

export default MarketingSection