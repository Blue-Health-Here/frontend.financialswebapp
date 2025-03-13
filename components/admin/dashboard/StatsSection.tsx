"use client";

import { StatsCard } from "@/components/common/StatsCard";
import { RootState } from "@/store/store";
import { statsDataConstant } from "@/utils/constants";
import { assignStatsValues } from "@/utils/helper";
import { StatsCardProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StatsSection = () => {
    const { stats } = useSelector((state: RootState) => state.adminDashboard);
    const [statsUpdatedData, setStatsUpdatedData] = useState<StatsCardProps[]>(statsDataConstant);
    
    useEffect(() => {
        if (stats) {
            setStatsUpdatedData(assignStatsValues(stats));
        }
    }, [stats]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statsUpdatedData.map((item, index) => (
                <StatsCard
                    key={index}
                    value={item.value}
                    label={item.label}
                    color={item.color}
                    icon={item.icon}
                />))}
        </div>
    )
};

export default StatsSection;