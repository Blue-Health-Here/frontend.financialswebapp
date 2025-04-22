"use client";
import Image from "next/image";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

interface BudgetCardProps {
  budget: any;
  id: string;
  categories?: any;
  className?: string;
  item?: any;
  handleEdit?: Function;
  handleDeleteModal?: (id: string) => void;
}
export const BudgetCard = ({
  id,
  item,
  budget,
  categories,
  className,
  handleEdit,
  handleDeleteModal,
}: BudgetCardProps) => {
  const [isCloseModal, setIsCloseModal] = useState(false);
  const handleDelete = () => {
    setIsCloseModal(true);
  };

  const categoryName =
    categories?.find((cat: any) => cat.id === budget.category_id)?.name || "";

  const handleSuccess = () => {
    if (handleDeleteModal) handleDeleteModal(id);
    setIsCloseModal(false);
    return undefined;
  };
  return (
    <div
      className={`bg-white p-6 shadow-md rounded-lg flex flex-col ${className}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm sm:text-lg md:text-xl font-bold">
          {budget.title}
        </h2>
        <div className="flex gap-2">
          <Image
            src="/delete-icon.svg"
            alt="Delete"
            width={15}
            height={15}
            className="md:w-[20px] md:h-[20px] cursor-pointer"
            onClick={handleDelete}
          />
          <Image
            src="/edit-icon.svg"
            alt="Edit"
            width={15}
            height={15}
            className="md:w-[20px] md:h-[20px] cursor-pointer"
            onClick={() => handleEdit && handleEdit(item)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-4 text-black text-xs md:text-[14px] font-medium">
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm">Expense Category</span>
          <span className="text-xs sm:text-sm  text-grey">{categoryName}</span>
        </div>
        <hr className="mb-1 border-[#F1F5F9]" />

        <div className="flex justify-between">
          <span className="text-xs sm:text-sm">Date</span>
          <span className="text-xs sm:text-sm  text-grey">
            {budget.expense_date}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs sm:text-sm">Amount</span>
          <span className="text-xs sm:text-sm  text-grey">{budget.amount.toLocaleString()}</span>
        </div>
      </div>
      {isCloseModal && (
        <DeleteModal
          title="Expense"
          content={`<p>
            <span>Are you sure you want to delete this expense?</span> <br />
            <span>You’ll not be able to recover it.</span>
        </p>`}
          handleClose={() => setIsCloseModal(false)}
          handleSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
