"use client"

import React from 'react'
import { budgetData, budgetStatsData, expenseCategories, pharmacyData } from "@/utils/constants";
import BudgetStatsCard from '@/components/common/BudgetStatsCard';
import { SubmitButton } from '@/components/submit-button';
import { FaPlus } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { IoSearch } from "react-icons/io5";
import { BudgetCard } from '@/components/common/BudgetCard';
import BarChart from '@/components/common/BarChart';
import useWindowSize from '@/hooks/useWindowSize';

const BudgetSection = () => {
    const { width } = useWindowSize();
    return (
        <>
            <h3 className="text-themeGrey font-medium mb-2">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="h-full col-span-1 md:col-span-1 lg:col-span-5 xl:col-span-4 flex justify-between flex-col gap-6">
                    {budgetStatsData.map((item, index) => (
                        <BudgetStatsCard
                            key={index}
                            icon={item.icon}
                            value={item.value}
                            label={item.label}
                            color={item.color} />))}
                </div>
                <div className="w-full col-span-1 md:col-span-1 lg:col-span-7 xl:col-span-8 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                    <BarChart
                        Xlabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]}
                        Ylabels={{
                            Utility: [40, 20, 110, 50, 40, 60, 60, 70, 80, 40, 100],
                            Salary: [50, 30, 90, 40, 90, 100, 60, 70, 40, 80, 100, 30],
                            Rent: [30, 40, 50, 80, 70, 40, 90, 100, 80, 70, 60],
                            Others: [40, 50, 60, 70, 40, 40, 100, 110, 40, 50, 80],
                        }}
                        barColors={["#0C1737", "#152961", "#354E96", "#7889B9"]}
                        barThickness={width > 1400 ? 50 : width > 1200 ? 40 : 30}
                        yAxisTitle="Expenses"
                        pointStyle="circle"
                        showTopValues={true}
                        stepSize={40}
                        borderRadius={8}
                        yTitleColor="black"
                        xLabelColor="black"
                        yLabelColor="black"
                    />
                </div>
            </div>

            <div className="mt-6 px-6 py-8 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold">Expense Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expenseCategories.map((category, index) => (
                        <div key={index} className="p-6 min-h-[135px] bg-white shadow-lg rounded-lg flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-bold">{category.name}</p>
                                <span className={`text-sm font-semibold flex items-center justify-center rounded-full min-w-[60px] min-h-[60px]  ${category.percentage >= 15 ? 'bg-[#FFE8E8] text-[#CD5052]' : 'bg-[#E8FFF3] text-[#50CD89] '}`}>
                                    {category.percentage}%
                                </span>
                            </div>
                            <p className="text-[16px] font-medium">Budgeted Amount: <span className='text-grey float-right'>${category.budget}</span></p>
                            <p className="text-[16px] font-medium">Actual Amount: <span className='text-grey float-right'>${category.actual}</span></p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 px-6 py-8 bg-white shadow-lg rounded-lg">

                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <h1 className="text-xl font-semibold">Expense</h1>
                    <SubmitButton className="bg-secondary hover:bg-[#65acfd]">
                        Report
                    </SubmitButton>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <div className="flex items-center space-x-3">
                        <h4 className="text-[16px] text-gray-700">Add Expense</h4>
                        <SubmitButton className="group w-7 h-7 p-1 bg-secondary hover:bg-primary">
                            <FaPlus className="text-primary group-hover:text-white" size={12} />
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
                    {budgetData.map((budget, index) => (
                        <BudgetCard key={index} budget={budget} />
                    ))}
                </div>
            </div></>
    )
}

export default BudgetSection