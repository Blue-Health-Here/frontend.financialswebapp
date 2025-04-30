"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { PharmacyCard } from "@/components/common/PharmacyCard";
import BarChart from "@/components/common/BarChart";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import StatsSection from './StatsSection';
import { fetchAllPharmacies, fetchAllStats } from '@/services/adminServices';
import { RootState } from '@/store/store';
import { PharmacyCardProps } from '@/utils/types';
import useWindowSize from '@/hooks/useWindowSize';

const DashboardSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchAllStats(dispatch);
            fetchAllPharmacies(dispatch).finally(() => setLoading(false));
        }
    }, []);
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredPharmacies = pharmacies.filter((pharmacy: PharmacyCardProps) => {
        const nameMatches = pharmacy.pharmacy_name.toLowerCase().includes(searchQuery.toLowerCase());
        const expenseMatches = pharmacy.expense !== null && pharmacy.expense.toString().includes(searchQuery);
        return nameMatches || expenseMatches;
    });

    const fullLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
    const fullDatasets = [80, 100, 220, 180, 80, 120, 120, 140, 160]
    let labels, datasets;

    if (width > 1400) {
        labels = fullLabels;
        datasets = fullDatasets;
    } else if (width > 1200) {
        labels = fullLabels.slice(0, 9);
        datasets = fullDatasets.slice(0, 9);
    } else if (width > 600) {
        labels = fullLabels.slice(0, 7);
        datasets = fullDatasets.slice(0, 7);
    } else {
        labels = fullLabels.slice(0, 5);
        datasets = fullDatasets.slice(0, 5);
    }

    return (
        <>
            <h3 className="text-themeGrey text-lg md:text-xl font-medium mb-2">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr">
                <StatsSection />
                <div className="w-full h-[300px] md:h-full bg-white rounded-lg shadow-lg p-6  flex items-center justify-center">
                    <BarChart
                        Xlabels={labels}
                        Ylabels={{ pharmacy: datasets }}
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
                        <Input
                            name="search"
                            placeholder="Search Pharmacy"
                            className="h-[42px] border-none shadow-lg rounded-lg font-medium"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                            <IoSearch className="md:w-5 md:h-5" />
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p>Loading pharmacies...</p>
                    ) : (
                        filteredPharmacies.length > 0 ? (
                            filteredPharmacies.map((pharmacy: PharmacyCardProps, index: number) => (
                                <PharmacyCard key={index} pharmacy={pharmacy} />
                            ))
                        ) : (
                            <p>No pharmacies match your search criteria.</p>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardSection