"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { PharmacyCard } from "@/components/common/PharmacyCard";
import BarChart from "@/components/common/BarChart";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import StatsSection from './StatsSection';
import { fetchAllPharmacies, fetchAllStats, fetchExpenseGraph } from '@/services/adminServices';
import { RootState } from '@/store/store';
import { PharmacyCardProps } from '@/utils/types';
import useWindowSize from '@/hooks/useWindowSize';

const DashboardSection = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [useLogScale, setUseLogScale] = useState(true);
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const { adminExpenseGraphData } = useSelector((state: RootState) => state.adminDashboard);
    const hasFetched = useRef(false);
    
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            Promise.all([
                fetchAllStats(dispatch),
                fetchAllPharmacies(dispatch),
                fetchExpenseGraph(dispatch)
            ]).finally(() => setLoading(false));
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

    const calculateStepSize = (dataArray: number[]) => {
        if (!dataArray || dataArray.length === 0) return 20000;
        
        const max = Math.max(...dataArray);
        const min = Math.min(...dataArray);
        
        if (max > 200000 && min < 5000) {
            return 25000; 
        }
        
        if (max < 50000) return 10000;
        if (max < 100000) return 20000;
        if (max < 200000) return 25000;
        if (max < 500000) return 50000;
        return 100000;
    };

    const getChartMaxValue = (dataArray: number[]) => {
        if (!dataArray || dataArray.length === 0) return 160000;
        
        const max = Math.max(...dataArray);
        const step = calculateStepSize(dataArray);
        
        return Math.ceil(max / step) * step;
    };

    const formatChartData = () => {
        if (!adminExpenseGraphData || adminExpenseGraphData.length === 0) {
            return { labels: [], datasets: { pharmacy: [] } };
        }

        const labels = adminExpenseGraphData.map((item: any) => item.pharmacy_name);
        const expenses = adminExpenseGraphData.map((item: any) => item.total_expense);

        return {
            labels,
            datasets: { pharmacy: expenses }
        };
    };

    const chartData = formatChartData();
    
    let labels, datasets;
    if (width > 1400) {
        labels = chartData.labels;
        datasets = { pharmacy: chartData.datasets.pharmacy };
    } else if (width > 1200) {
        const sliceSize = Math.min(9, chartData.labels.length);
        labels = chartData.labels.slice(0, sliceSize);
        datasets = { pharmacy: chartData.datasets.pharmacy.slice(0, sliceSize) };
    } else if (width > 600) {
        const sliceSize = Math.min(7, chartData.labels.length);
        labels = chartData.labels.slice(0, sliceSize);
        datasets = { pharmacy: chartData.datasets.pharmacy.slice(0, sliceSize) };
    } else {
        const sliceSize = Math.min(5, chartData.labels.length);
        labels = chartData.labels.slice(0, sliceSize);
        datasets = { pharmacy: chartData.datasets.pharmacy.slice(0, sliceSize) };
    }

    const toggleScaleType = () => {
        setUseLogScale(!useLogScale);
    };

    return (
        <>
            <h3 className="text-themeGrey text-lg md:text-xl font-medium mb-2">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:auto-rows-fr">
                <StatsSection />
                <div className="w-full h-[300px] md:h-full bg-white rounded-lg shadow-lg p-6 flex flex-col">
                    <div className="hidden">
                        <button 
                            onClick={toggleScaleType}
                            className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                        >
                            {useLogScale ? 'Switch to Linear Scale' : 'Switch to Log Scale'}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        {!loading && adminExpenseGraphData && adminExpenseGraphData.length > 0 ? (
                            <BarChart
                                Xlabels={labels}
                                Ylabels={datasets}
                                useGradient={false}
                                barColors={["#1E3A8A"]}
                                barThickness={8}
                                yAxisTitle="Total Expense"
                                pointStyle="circle"
                                showTopValues={false}
                                stepSize={calculateStepSize(chartData.datasets.pharmacy)}
                                chartMaxValue={getChartMaxValue(chartData.datasets.pharmacy)}
                                showXLabels={true}
                                useLogarithmicScale={useLogScale}
                                showVerticalGridLines={false}
                            />
                        ) : (
                            <p>Loading expense data...</p>
                        )}
                    </div>
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

export default DashboardSection;