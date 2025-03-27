"use client"

import React, { useEffect, useRef, useState } from 'react'
import { budgetData, budgetStatsData, categories, expenseCategories, fullDatasets, fullLabels, pharmacyBudgetDetail } from "@/utils/constants";
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
import AddExpenseModal from './AddExpenseModal';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenseDetail, setIsAddExpense } from '@/store/features/admin/expense/adminExpenseSlice';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import { deletePharmacyExpense, fetchAdminExpense, fetchAdminExpenseStats } from '@/services/adminServices';
import TextMessage from '@/components/common/TextMessage';
import { AdminExpenseProps, BudgetStatsCardProps } from '@/utils/types';
import { assignAdminBudgetStatsValues } from '@/utils/helper';

const BudgetDetail = () => {
    const params = useParams();
    const pharmacyId = params?.pharmacy_id;
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const { isAddExpense, expenseData, adminExpenseStats } = useSelector((state: RootState) => state.expense);
    const [loading, setLoading] = useState(true);
    const [statsUpdatedData, setStatsUpdatedData] = useState<BudgetStatsCardProps[]>(budgetStatsData);

    useEffect(() => {
        fetchAdminExpense(dispatch, pharmacyId).finally(() => setLoading(false))
        fetchAdminExpenseStats(dispatch, pharmacyId).finally(() => setLoading(false))

        if(adminExpenseStats){
            setStatsUpdatedData(assignAdminBudgetStatsValues(adminExpenseStats))
        }
    }, [])
      
    const handleEditExpense = (data: AdminExpenseProps) => {
        dispatch(setIsAddExpense(true))
        dispatch(setExpenseDetail(data))
    };

    const handleAddExpense = () => {
        dispatch(setIsAddExpense(true));
        dispatch(setExpenseDetail(null));
    };

     const handleDeleteExpense = (expenseId: string) => {
        deletePharmacyExpense(dispatch, expenseId);
        fetchAdminExpense(dispatch, pharmacyId)
    };

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

    return (
        <>
            <h3 className="text-themeGrey text-lg md:text-xl font-medium mb-2">Statistics</h3>
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
                        yAxisTitle="Expenses"
                        pointStyle="circle"
                        showTopValues={true}
                        stepSize={40}
                        barThickness={width > 1400 ? 40 : width > 1200 ? 30 : width > 600 ? 20 : 10}
                        topValueSize={width > 1400 ? 12 : width > 1200 ? 11 : width > 600 ? 10 : 8}
                        borderRadius={width > 1400 ? 8 : width > 1200 ? 7 : width > 600 ? 6 : 3}
                        yTitleColor="black"
                        xLabelColor="black"
                        yLabelColor="black"
                    />
                </div>
            </div>

            <div className="mt-6 px-6 py-8 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-base sm:text-2xl font-semibold flex-1 text-nowrap md:text-xl lg:text-2xl">Expense Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expenseCategories.map((category, index) => (
                        <ExpenseCategoryCard key={index} category={category} />
                    ))}
                </div>
            </div>

            <div className="mt-6 px-6 py-8 bg-white shadow-lg rounded-lg">

                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-base sm:text-2xl font-semibold flex-1 text-nowrap md:text-xl lg:text-2xl">Expense</h1>
                    <div className="flex gap-x-4 items-center">
                        <FileDownloadField title='Reports' />
                    </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4 py-6">
                    <div className="flex items-center space-x-3">
                        <h4 className="text-xs sm:text-sm md:text-[16px] text-gray-700">Add Expense</h4>
                        <SubmitButton className="group w-6 h-6 md:w-7 md:h-7 p-1 bg-secondary hover:bg-primary"
                            onClick={handleAddExpense}>
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
                {loading ? (
                        <TextMessage text="Loading expense..."/>
                    ) : (
                        expenseData?.length > 0 ? expenseData?.map((budget: AdminExpenseProps) => (
                            <BudgetCard key={budget.id} id={budget.id} budget={budget} categories={categories} handleDeleteModal={handleDeleteExpense} handleEdit={() => handleEditExpense(budget)} />
                        )) : <TextMessage text="Expense not found." />
                    )}
                </div>
            </div>
            {isAddExpense && <AddExpenseModal />}
        </>
    )
}

export default BudgetDetail