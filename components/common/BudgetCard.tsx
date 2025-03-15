"use client"

import { setIsAddExpense } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export const BudgetCard = ({ budget, className }: any) => {
    const [isCloseModal, setIsCloseModal] = useState(false);
    const handleDelete = () => {
        setIsCloseModal(true);
    };
    return (
        <div className={`bg-white p-6 shadow-md rounded-lg flex flex-col ${className}`}>
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-base  sm:text-[20px] font-bold">{budget.name}</h2>
                <div className="flex gap-2">
                    <Image src="/delete-icon.svg" alt="Delete" width={20} height={20} onClick={handleDelete} />
                    <Image src="/edit-icon.svg" alt="Edit" width={20} height={20} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-black text-[14px] font-medium flex-grow">
                <span className="text-xs sm:text-sm text-left">Expense Category</span>
                <span className="text-xs sm:text-sm text-right text-grey">{budget.category}</span>

                <span className="text-xs sm:text-sm text-left">Date</span>
                <span className="text-xs sm:text-sm text-right text-grey">{budget.date}</span>

                <span className="text-xs sm:text-sm text-left">Amount</span>
                <span className="text-xs sm:text-sm text-right text-grey">{budget.amount}</span>
            </div>
            {isCloseModal && <DeleteModal title="Expense"
                content={`<p>
                <span>Are you sure you want to delete this expense?</span> <br />
                <span>You’ll not be able to recover it.</span>
            </p>`}
                handleClose={() => setIsCloseModal(false)}
                handleSuccess={() => console.log("handle success")} />}
        </div>
    );
};
