import React from 'react'
import Image from "next/image";

const BudgetStatsCard = ({ value, label, color }: { value: string; label: string; color: string }) => {
    return (
        <div className="relative w-full min-w-[260px] flex-1 p-6 bg-white rounded-lg shadow-md flex flex-col justify-between">
            <Image src="/statistic-dollar-total-expenese.svg" alt="" width={40} height={40} className="absolute top-0 right-0" />
            <p className="text-gray-500 text-sm">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
    )
}

export default BudgetStatsCard