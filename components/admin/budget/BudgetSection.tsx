"use client"

import React from 'react'
import { budgetStatsData, expenseCategories, pharmacyData } from "@/utils/constants";
import BudgetStatsCard from '@/components/common/BudgetStatsCard';
import { SubmitButton } from '@/components/submit-button';
import { FaPlus } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { IoSearch } from "react-icons/io5";
import { BudgetCard } from '@/components/common/BudgetCard';
import BarChart from '@/components/common/BarChart';

const BudgetSection = () => {
    return (
        <>
            <h3 className="text-[#5E5873] font-medium">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="h-full col-span-1 md:col-span-6 lg:col-span-5 xl:col-span-4 flex justify-between flex-col gap-6">
                    {budgetStatsData.map((item, index) => (
                        <BudgetStatsCard
                            key={index}
                            value={item.value}
                            label={item.label}
                            color={item.color} />))}
                </div>
                <div className="w-full col-span-1 md:col-span-6 lg:col-span-7 xl:col-span-8 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                    <BarChart
                        Xlabels={["Jan", "Feb", "Mar", "Apr", "May"]}
                        Ylabels={{
                            Utility: [10, 20, 30, 40, 50],
                            Salary: [20, 30, 40, 50, 60],
                            Rent: [30, 40, 50, 60, 70],
                            Others: [40, 50, 60, 70, 80]
                        }}
                        barColors={["#0C1737", "#152961", "#354E96", "#7889B9"]}
                        barThickness={40}
                        yAxisTitle="Expenses"
                        pointStyle="circle"
                        showTopValues={true}
                        stepSize={40}
                    />
                </div>
            </div>

            <div className="mt-6 p-6 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold">Expense Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expenseCategories.map((category, index) => (
                        <div key={index} className="p-4 min-h-[135px] bg-white shadow-lg rounded-lg flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-medium">{category.name}</p>
                                <span className={`text-sm font-semibold p-4 rounded-full ${category.percentage >= 15 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {category.percentage}%
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm">Budgeted Amount: <span className='text-[16px] font-medium float-right'>{category.budget}</span></p>
                            <p className="text-gray-500 text-sm">Actual Amount: <span className='text-[16px] font-medium float-right'>{category.actual}</span></p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">

                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <h1 className="text-xl font-semibold">Expense</h1>
                    <SubmitButton className="bg-secondary hover:bg-[#65acfd]">
                        Save Changes
                    </SubmitButton>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <div className="flex items-center space-x-3">
                        <h4 className="text-[16px] text-gray-700">Add Categories</h4>
                        <SubmitButton className="w-7 h-7 p-1 text-white bg-secondary hover:bg-[#65acfd]">
                            <FaPlus className="text-white" size={12} />
                        </SubmitButton>
                    </div>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                        <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                            <IoSearch className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pharmacyData.map((pharmacy, index) => (
                        <BudgetCard key={index} pharmacy={pharmacy} />
                    ))}
                </div>
            </div></>
    )
}

export default BudgetSection