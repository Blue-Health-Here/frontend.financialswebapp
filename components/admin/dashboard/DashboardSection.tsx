"use client";

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { PharmacyCard } from "@/components/common/PharmacyCard";
import { pharmacyData, statsData } from "@/utils/constants";
import { StatsCard } from "@/components/common/StatsCard";
import BarChart from "@/components/common/BarChart";
import { IoSearch } from "react-icons/io5";
import { axiosAdmin } from '@/lib/axiosAdmin';

const DashboardSection = () => {
    const [stats, setStats] = useState([]);
    useEffect(() => {
        console.log("admin dashboard")
        fetchAllStats();
    }, []);

    const fetchAllStats = async () => {
        try {
            const response = await axiosAdmin.get("/v1/admin-statistics");
            console.log(response, "res");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h3 className="text-themeGrey text-lg md:text-xl font-medium mb-2">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {statsData.map((item, index) => (
                        <StatsCard
                            key={index}
                            value={item.value}
                            label={item.label}
                            color={item.color}
                            icon={item.icon}
                        />))}
                </div>
                <div className="w-full h-[300px] md:h-full bg-white rounded-lg shadow-lg p-6  flex items-center justify-center">
                    <BarChart
                        Xlabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]}
                        Ylabels={{
                            pharmacy: [80, 100, 220, 180, 80, 120, 120, 140, 160],
                        }}
                        useGradient={false}
                        barColors={["#1E3A8A"]}
                        barThickness={8}
                        yAxisTitle="Total Expense"
                        pointStyle="circle"
                        showTopValues={false}
                        stepSize={50}
                        showXLabels={false}
                    />

                </div>
            </div>

            {/* Pharmacies */}
            <div className="mt-6 p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
                    <h1 className='text-lg md:text-2xl'>Pharmacies</h1>
                    <div className="relative w-[390px] sm:max-w-md">
                        <Input name="email" placeholder="Search Pharmacy" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                        <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                            <IoSearch className="md:w-5 md:h-5" />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pharmacyData.map((pharmacy, index) => (
                        <PharmacyCard key={index} pharmacy={pharmacy} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default DashboardSection