"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { onBoardingchecklists, statsDataConstant } from "@/utils/constants";
import { StatsCard } from "@/components/common/StatsCard";
import { IoSearch } from "react-icons/io5";
import Accordion from "@/components/common/Accordion";
import ExpenseChart from "@/components/common/Linechart";
import { Form, Formik } from "formik";
import SelectField from "@/components/common/form/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OnboardingExpenseModal from "../onboarding/OnboardingExpenseModal";
import { setIsAddExpenseModal } from "@/store/features/pharmacy/onboarding/pharmacyOnboardingExpenseSlice";
import { fetchPharmacyDashboardStats, fetchPharmacyExpenseGraph } from "@/services/pharmacyServices";

const DashboardSection = () => {
  const { pharmacyStatsData } = useSelector((state: RootState) => state.global);
  const { expenseGraphData } = useSelector((state: RootState) => state.global);
  const { isAddExpenseModal } = useSelector((state: RootState) => state.onboarding);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPharmacyExpenseGraph(dispatch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!pharmacyStatsData) {
      fetchPharmacyDashboardStats(dispatch);
    }
  }, [dispatch, pharmacyStatsData]);

  // const statsData = [
  //   {
  //     value: 0,
  //     label: "Categories",
  //     color: "text-custom-green",
  //     icon: "/statistics-Category.svg",
  //   },
  //   {
  //     value: 0,
  //     label: "Pharmacies",
  //     color: "text-custom-purple",
  //     icon: "/statistics-pharmacy.svg",
  //   },
  //   {
  //     value: `$${pharmacyStatsData?.monthly_expense ?? 0}`,
  //     label: "Total monthly expense",
  //     color: "text-custom-orange",
  //     icon: "/statistics-expense.svg",
  //   },
  //   {
  //     value: pharmacyStatsData?.assigned_courses ?? 0,
  //     label: "Total task completed",
  //     color: "text-custom-red",
  //     icon: "/statistics-task.svg",
  //   },
  // ];

  useEffect(() => {
    if (isAddExpenseModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddExpenseModal]);
  return (
    <>
      <h3 className="text-themeGrey font-medium mb-2">Statistics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:auto-rows-fr">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pharmacyStatsData.map((item: any, index: number) => (
            <StatsCard
              key={index}
              value={item.value}
              label={item.label}
              color={item.color}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="bg-white w-full h-60 md:h-full  rounded-lg shadow-lg flex items-center justify-center">
          <ExpenseChart ExpenseData={expenseGraphData} />
        </div>
      </div>
      <>
        <div className="w-full mt-6 px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-col lg:flex-row gap-4">
            {/* Onboarding Checklist Title */}
            <h1
              className=" text-xl sm:text-2xl font-semibold flex-1 text-nowrap 
                   md:text-xl lg:text-2xl"
            >
              {onBoardingchecklists[0].name}
            </h1>

            {/* Container for Button & Form */}
            <div className="flex flex-col sm:flex-col-reverse md:flex-row gap-4">
              <Formik
                initialValues={{ category: "", search: "" }}
                onSubmit={() => { }}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4">
                    <button
                      className="hidden border-none shadow-lg rounded-md font-semibold 
                  min-w-40 h-10 text-md 
                  sm:min-w-32 sm:h-8 sm:text-sm 
                  md:min-w-36 md:h-9 md:text-sm 
                  bg-[#93C5FD] hover:bg-blue-400 transition-all 
                  sm:flex items-center gap-x-2 justify-center text-[#1E3A8A]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
                          fill="#1E3A8A"
                        />
                      </svg>
                      Report
                    </button>
                    <SelectField
                      className="border-none shadow-lg rounded-lg font-medium 
                  min-w-48 h-10 
                  sm:min-w-36 sm:h-8 
                  md:min-w-40 md:h-9"
                      name="category"
                      options={[
                        { value: "Al Categories", label: "Al Categories" },
                        { value: "operational", label: "Operational" },
                      ]}
                    />
                    <div className="relative sm:max-w-md">
                      <Input
                        name="search"
                        placeholder="Search Checklist"
                        className="border-none shadow-lg rounded-lg font-medium placeholder:text-xs 
                    min-w-48 h-10 
                    sm:min-w-36 sm:h-8 
                    md:min-w-40 md:h-9"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch size={18} />
                      </span>
                    </div>

                    <button
                      className="sm:hidden border-none shadow-lg rounded-md font-semibold 
                  min-w-40 h-10 text-md 
                  sm:min-w-32 sm:h-8 sm:text-sm 
                  md:min-w-36 md:h-9 md:text-sm 
                  bg-[#93C5FD] hover:bg-blue-400 transition-all 
                  flex items-center gap-x-2 justify-center text-[#1E3A8A]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
                          fill="#1E3A8A"
                        />
                      </svg>
                      Report
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {onBoardingchecklists.map((checklist, index) => (
            <div className="flex flex-col gap-6 mt-6" key={index}>
              <div>
                <p className="font-semibold">Checklist Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                  <div
                    className="bg-primary h-[4px] rounded-full"
                    style={{ width: `${checklist.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="border-b border-[#F1F5F9] my-2"></div>
              <Accordion
                key={index}
                items={checklist.list}
                handleEditQuestion={() => {
                  dispatch(setIsAddExpenseModal(true));
                }}
              />
            </div>
          ))}
        </div>
        {isAddExpenseModal && <OnboardingExpenseModal />}
      </>
    </>
  );
};

export default DashboardSection;
