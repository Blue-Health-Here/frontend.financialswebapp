"use client"

import React, { useEffect, useState } from 'react'
import { budgetStatsData, categories, expenseCategoriesData, fullDatasets, fullLabels } from "@/utils/constants";
import BudgetStatsCard from '@/components/common/BudgetStatsCard';
import { SubmitButton } from '@/components/submit-button';
import { FaPlus } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { IoSearch } from "react-icons/io5";
import { BudgetCard } from '@/components/common/BudgetCard';
import BarChart from '@/components/common/BarChart';
import useWindowSize from '@/hooks/useWindowSize';
import ExpenseCategoryCard from '@/components/common/ExpenseCategoryCard';
import FileDownloadField from '@/components/common/form/FileDownloadField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AddExpenseModal from './AddExpenseModal';
import { setExpenseDetails, setIsAddExpense, setLoading } from '@/store/features/pharmacy/expense/pharmacyExpenseSlice';
import { deletePharmacyExpense, fetchPharmacyExpense, fetchPharmacyExpenseStats } from '@/services/pharmacyServices';
import TextMessage from '@/components/common/TextMessage';
import { BudgetStatsCardProps, PharmacyExpenseProps } from '@/utils/types';
import { assignAdminBudgetStatsValues } from '@/utils/helper';

const BudgetSection = () => {
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const { isAddExpense, expenseData, loading, pharmacyExpenseStats } = useSelector((state: RootState) => state.pharmacyExpense);
    const [statsUpdatedData, setStatsUpdatedData] = useState<BudgetStatsCardProps[]>(budgetStatsData);
    
    let labels, datasets;
    
    if (width > 1400) {
        labels = fullLabels;
        datasets = fullDatasets;
    } else if (width > 1200) {
        labels = fullLabels.slice(0, 9);
        datasets = {
            Utility: fullDatasets.Utility.slice(0, 9),
            Salary: fullDatasets.Salary.slice(0, 9),
            Rent: fullDatasets.Rent.slice(0, 9),
            Others: fullDatasets.Others.slice(0, 9),
        };
    } else if (width > 600) {
        labels = fullLabels.slice(0, 6);
        datasets = {
            Utility: fullDatasets.Utility.slice(0, 6),
            Salary: fullDatasets.Salary.slice(0, 6),
            Rent: fullDatasets.Rent.slice(0, 6),
            Others: fullDatasets.Others.slice(0, 6),
        };
    } else {
        labels = fullLabels.slice(0, 5);
        datasets = {
            Utility: fullDatasets.Utility.slice(0, 5),
            Salary: fullDatasets.Salary.slice(0, 5),
            Rent: fullDatasets.Rent.slice(0, 3),
            Others: fullDatasets.Others.slice(0, 5),
        };
    }
    
    useEffect(() => {
        Promise.all([
            fetchPharmacyExpense(dispatch),
            fetchPharmacyExpenseStats(dispatch)
        ]).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (pharmacyExpenseStats?.length > 0) {
            setStatsUpdatedData(assignAdminBudgetStatsValues(pharmacyExpenseStats));
        } 
    }, [pharmacyExpenseStats]);

    const handleEditExpense = (data: PharmacyExpenseProps) => {
        dispatch(setIsAddExpense(true));
        dispatch(setExpenseDetails(data));
    };

    const handleAddExpense = () => {
        dispatch(setIsAddExpense(true));
        dispatch(setExpenseDetails(null));
    };

    const handleDeleteExpense = (id: string) => {
        deletePharmacyExpense(dispatch, id);
    };
      useEffect(() => {
        if (isAddExpense) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
    
        return () => {
          document.body.style.overflow = "";
        };
      }, [isAddExpense]);
    console.log("expenseData", statsUpdatedData);
    
    return (
        <>
            <h3 className="text-themeGrey font-medium mb-2">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="h-full col-span-1 md:col-span-1 lg:col-span-5 xl:col-span-4 flex justify-between flex-col gap-6">
                    {statsUpdatedData?.map((item, index) => (
                        <BudgetStatsCard
                            key={index}
                            icon={item.icon}
                            value={item.value}
                            label={item.label}
                            color={item.color} />))}
                </div>
                <div className="w-full h-[300px] md:h-full col-span-1 md:col-span-1 lg:col-span-7 xl:col-span-8 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                    <BarChart
                        Xlabels={labels}
                        Ylabels={datasets}
                        barColors={["#0C1737", "#152961", "#354E96", "#7889B9"]}
                        barThickness = {width > 1400 ? 40 : width > 1200 ? 30 : width > 600 ? 20 : 10}
                        topValueSize = {width > 1400 ? 12 : width > 1200 ? 11 : width > 600 ? 10 : 8}
                        borderRadius={width > 1400 ? 8 : width > 1200 ? 7 : width > 600 ? 6 : 3}

                        yAxisTitle="Expenses"
                        pointStyle="circle"
                        showTopValues={true}
                        stepSize={40}
                        yTitleColor="black"
                        xLabelColor="black"
                        yLabelColor="black"
                    />
                </div>
            </div>

            <div className="mt-6 px-6 py-8 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold">Expense Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expenseCategoriesData.map((category, index) => (
                        <ExpenseCategoryCard key={index} category={category} />
                    ))}
                </div>
            </div>

            <div className="mt-6 px-6 py-8 bg-white shadow-lg rounded-lg">

                <div className="flex items-center justify-between">
                    <h1 className="text-lg sm:text-xl font-semibold">Expense</h1>
                    <div className="flex gap-x-4 items-center">
                        <FileDownloadField title='Reports' />
                    </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4 py-6">
                    <div className="flex items-center space-x-3">
                        <h4 className="text-[13px] sm:text-[16px] text-gray-700">Add Expense</h4>
                        <SubmitButton className="group w-7 h-7 p-1 bg-secondary hover:bg-primary"
                            onClick={handleAddExpense}>
                            <FaPlus className="text-primary group-hover:text-white" size={12} />
                        </SubmitButton>
                    </div>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Pharmacy" className="h-[42px] text-xs sm:text-sm border-none shadow-lg rounded-lg font-medium" />
                        <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                            <IoSearch className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <TextMessage text="Loading expense..."/>
                    ) : (
                        expenseData?.length > 0 ? expenseData?.map((budget: PharmacyExpenseProps, index: number) => (
                            <BudgetCard key={budget.id} id={budget.id} budget={budget} categories={categories} handleDeleteModal={handleDeleteExpense} handleEdit={() => handleEditExpense(budget)} />
                        )) : <TextMessage text="Expense not found." />
                    )}
                </div>
            </div>
            {isAddExpense && <AddExpenseModal />}
        </>
    )
}

export default BudgetSection