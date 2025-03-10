import React from 'react'
import Image from "next/image";

interface BudgetStatsCardProps {
    value?: string;
    icon: string;
    label?: string;
    color?: string;
}

const BudgetStatsCard: React.FC<BudgetStatsCardProps> = ({ value, icon, label, color }) => {
    return (
        <div className="relative w-full min-w-[260px] flex-1 p-6 bg-white rounded-lg shadow-md flex flex-col gap-2 justify-between">
            <Image src={icon} alt="" width={80} height={80} className="absolute top-0 right-0" />
            <p className="text-themeGrey text-lg">{label}</p>
            <h2 className={`text-[2vw] leading-[3vw] font-semibold  ${color}`}>{value}</h2>
        </div>
    )
}

export default BudgetStatsCard