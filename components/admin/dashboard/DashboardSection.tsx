"use client";

import React, { useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input";
import { PharmacyCard } from "@/components/common/PharmacyCard";
import BarChart from "@/components/common/BarChart";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import StatsSection from './StatsSection';
import { fetchAllPharmacies, fetchAllStats } from '@/services/adminServices';
import { RootState } from '@/store/store';
import { PharmacyCardProps } from '@/utils/types';

const DashboardSection = () => {
    const dispatch = useDispatch();
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchAllStats(dispatch);
            fetchAllPharmacies(dispatch);
        }
    }, []);

    return (
        <>
            <h3 className="text-themeGrey text-lg md:text-xl font-medium mb-2">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr">
                <StatsSection />
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
                    {pharmacies.length > 0 && pharmacies.map((pharmacy: PharmacyCardProps, index: number) => (
                        <PharmacyCard key={index} pharmacy={pharmacy} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default DashboardSection