import React from 'react'
import Image from "next/image";
import { BudgetStatsCardProps } from '@/utils/types';

const BudgetStatsCard: React.FC<BudgetStatsCardProps> = ({ value, icon, label, color }) => {
    return (
        <div className="relative w-full min-w-[260px] flex-1 p-6 bg-white rounded-lg shadow-md flex flex-col gap-2 justify-between">
            <Image src={icon} alt="" width={50} height={50} className="absolute top-0 right-0 sm:h-[60px] sm:w-[60px] md:h-[80px] md:w-[80px]" />
            <p className="text-themeGrey text-sm sm:text-[16px] md:text-lg">{label}</p>
            <h2 className={`text-xl md:text-[2vw] leading-[3vw] font-semibold  ${color}`}>${value}</h2>
        </div>
    )
}

export default BudgetStatsCard