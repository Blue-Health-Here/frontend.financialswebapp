"use client"

import React from 'react'
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { pharmacyBudgetDetail } from '@/utils/constants';
import { BudgetDetailCard } from './BudgetDetailCard';

const BudgetSection = () => {
  return (
    <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
        <h1 className='text-lg md:text-2xl'>Pharmacies Budgeting </h1>
        <div className="relative w-[390px] sm:max-w-md">
          <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
          <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
            <IoSearch className="w-5 h-5" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pharmacyBudgetDetail.map((pharmacy: any, index: number) => (
          <BudgetDetailCard key={pharmacy.id} pharmacy={pharmacy} />
        ))}
      </div>
    </div>
  )
}

export default BudgetSection