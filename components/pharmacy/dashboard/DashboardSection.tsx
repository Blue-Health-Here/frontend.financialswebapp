"use client"

import React from 'react'
import { Input } from "@/components/ui/input";
import { onBoardingchecklists, pharmacyData, statsData } from "@/utils/constants";
import { StatsCard } from "@/components/common/StatsCard";
import { IoSearch } from "react-icons/io5";
import Accordion from '@/components/common/Accordion';
import ExpenseChart from '@/components/common/Linechart';
import { Form, Formik } from 'formik';
import SelectField from '@/components/common/form/SelectField';

const DashboardSection = () => {
    return (
        <>
            <h3 className="text-themeGrey font-medium mb-2">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
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
                <div className="bg-white rounded-lg shadow-lg p-6  flex items-center justify-center">
                    <ExpenseChart />

                </div>
            </div>

            <div className="w-full mt-6  px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg">
                <div className="flex justify-end items-end">
                    <Formik
                        initialValues={{ type: "", category: "", search: "" }}
                        onSubmit={() => { }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex  min-w-64 text-grey gap-2 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                                <SelectField
                                    className="border-none shadow-lg rounded-lg font-medium min-w-48"
                                    name="type"
                                    options={[
                                        { value: "all", label: "All Types" },
                                        { value: "on-boarding", label: "On boarding" },
                                        { value: "operational", label: "Operational" },
                                    ]}
                                />
                                <SelectField
                                    className="border-none shadow-lg rounded-lg font-medium min-w-48"
                                    name="category"
                                    options={[
                                        { value: "on-boarding", label: "On boarding" },
                                        { value: "operational", label: "Operational" },
                                    ]}
                                />
                                <div className="relative sm:max-w-md">
                                    <Input name="search" placeholder="Search Checklist" className="border-none shadow-lg rounded-lg font-medium placeholder:text-xs" />
                                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                                        <IoSearch size={18} />
                                    </span>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                {onBoardingchecklists.map((checklist, index) => (
                    <div className="flex flex-col gap-6" key={index}>
                        <div className="py-4 flex justify-between items-center gap-4">
                            <h1 className="text-lg mb-4">{checklist.name + " Checklist"}</h1>
                        </div>
                        <div>
                            <p className='font-semibold'>Checklist Progress</p>
                            <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                                <div className="bg-primary h-[4px] rounded-full" style={{ width: `${checklist.progress}%` }}></div>
                            </div>
                        </div>
                        <div className="border-b border-[#F1F5F9] my-2"></div>
                        <Accordion key={index} items={checklist.list} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default DashboardSection