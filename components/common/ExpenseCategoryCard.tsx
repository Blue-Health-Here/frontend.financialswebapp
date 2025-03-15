import React from 'react'

const ExpenseCategoryCard = ({ category }: any) => {
    return (
        <div className="p-6 min-h-[135px] bg-white shadow-lg rounded-lg flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p className="text-lg sm:text-xl font-bold">{category.name}</p>
                <span className={`text-sm font-semibold flex items-center justify-center rounded-full sm:min-w-[60px] sm:min-h-[60px] min-w-[40px] min-h-[40px]   ${category.percentage >= 15 ? 'bg-[#FFE8E8] text-[#CD5052]' : 'bg-[#E8FFF3] text-[#50CD89] '}`}>
                    {category.percentage}%
                </span>
            </div>
            <p className="text-[12px] sm:text-[16px] font-medium">Budgeted Amount: <span className='text-grey float-right'>${category.budget}</span></p>
            <p className="text-[12px] sm:text-[16px] font-medium">Actual Amount: <span className='text-grey float-right'>${category.actual}</span></p>
        </div>
    )
}

export default ExpenseCategoryCard