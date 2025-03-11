"use client"

import { setIsAddExpense } from "@/store/features/pharmacy/expense/pharmacyExpense";
import { useDispatch } from "react-redux";
import Image from "next/image";

export const BudgetCard = ({ budget, className }: any) => {
    const dispatch = useDispatch();
    return (
        <div className={`bg-white p-6 shadow-md rounded-lg flex flex-col ${className}`}>
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold">{budget.name}</h2>
                <div className="flex gap-2 cursor-pointer">
                    <Image src="/delete-icon.svg" alt="Delete" width={20} height={20} />
                    <Image src="/edit-icon.svg" alt="Edit" width={20} height={20} onClick={() => { dispatch(setIsAddExpense(true)) }} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-black text-[14px] font-medium flex-grow">
                <span className="text-left">Expense Category</span>
                <span className="text-right text-grey">{budget.category}</span>

                <span className="text-left">Date</span>
                <span className="text-right text-grey">{budget.date}</span>

                <span className="text-left">Amount</span>
                <span className="text-right text-grey">{budget.amount}</span>
            </div>
        </div>
    );
};
