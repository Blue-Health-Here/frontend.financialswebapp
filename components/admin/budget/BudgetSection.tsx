import React from 'react'
import { Input } from "@/components/ui/input";
import { pharmacyData } from "@/utils/constants";
import { BudgetCard } from "@/components/common/BudgetCard";
import { IoSearch } from "react-icons/io5";
const BudgetSection = () => {
    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                <h1>Pharmacies Budgeting </h1>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg" />
                    <span className="absolute right-3 top-2.5 text-grey cursor-pointer">
                        <IoSearch className="w-5 h-5" />
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pharmacyData.map((pharmacy, index) => (
                    <BudgetCard key={index} pharmacy={pharmacy} />
                ))}
            </div>
        </div>
    )
}

export default BudgetSection