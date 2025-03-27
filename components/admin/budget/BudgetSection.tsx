"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { pharmacyBudgetDetail } from '@/utils/constants';
import { BudgetDetailCard } from './BudgetDetailCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchBudgetingList } from '@/services/adminServices';
import TextMessage from '@/components/common/TextMessage';
import { BudgetDetailCardProps } from '@/utils/types';

const BudgetSection = () => {
  const [loading, setLoading] = useState(true);
  const {pharmacyList} = useSelector((state: RootState) => state.expense)
  const dispatch = useDispatch();
  
  useEffect(() => {
      fetchBudgetingList(dispatch).finally(() => setLoading(false))
  }, [])

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
        {loading ? (
          <TextMessage text="Loading pharmacies..." />
              ) : (
                pharmacyList.length > 0 ?( pharmacyList.map((budget: BudgetDetailCardProps, index: number) => (
                  <BudgetDetailCard key={index} budget={budget} />
                      ))
                ) : (
                    <TextMessage text="No pharmacies match your search criteria." />
                )
            )}
      </div>
    </div>
  )
}

export default BudgetSection