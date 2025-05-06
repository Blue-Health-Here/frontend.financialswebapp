"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { pharmacyDashboardStatsData } from "@/utils/constants";
import { StatsCard } from "@/components/common/StatsCard";
import { IoSearch } from "react-icons/io5";
import Accordion from "@/components/common/Accordion";
import ExpenseChart from "@/components/common/Linechart";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OnboardingExpenseModal from "../onboarding/OnboardingExpenseModal";
import { setIsAddExpenseModal } from "@/store/features/pharmacy/onboarding/pharmacyOnboardingExpenseSlice";
import { fetchPharmacyAssignChecklist, fetchPharmacyChecklist, fetchPharmacyDashboardStats, fetchPharmacyExpenseGraph } from "@/services/pharmacyServices";
import FileDownloadField from "@/components/common/form/FileDownloadField";
import { StatsCardProps } from "@/utils/types";
import { assignPharmacyStatsValues } from "@/utils/helper";
import SelectField from "@/components/common/form/SelectField";

const DashboardSection = () => {
  const { pharmacyStatsData } = useSelector((state: RootState) => state.global);
  const { expenseGraphData, pharmacyChecklists, pharmacyAssignChecklists } = useSelector((state: RootState) => state.global);
  const [statsUpdatedData, setStatsUpdatedData] = useState<StatsCardProps[]>(pharmacyDashboardStatsData);
  const { isAddExpenseModal } = useSelector(
    (state: RootState) => state.onboarding
  );
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const isFetchedData = useRef(false);

  useEffect(() => {
    if (isFetchedData.current) return;
    
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchPharmacyExpenseGraph(dispatch),
          fetchPharmacyDashboardStats(dispatch),
          fetchPharmacyChecklist(dispatch, "onboarding")
        ]);
        isFetchedData.current = true;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (pharmacyStatsData) {
      const mergedData = assignPharmacyStatsValues(pharmacyStatsData);
      setStatsUpdatedData(mergedData);
    } else {
      setStatsUpdatedData(pharmacyDashboardStatsData);
    }
  }, [pharmacyStatsData]);

  const handleChecklistSelect = async (checklistId: string) => {
    await fetchPharmacyAssignChecklist(dispatch, checklistId, "onboarding");
  };
  
  
console.log("pharmacyAssignChecklists",pharmacyAssignChecklists)

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
          {statsUpdatedData.map((item, index) => (
            <StatsCard
              key={index}
              value={item.value}
              label={item.label}
              color={item.color}
              icon={item.icon}
                />))}
        </div>
        <div className="bg-white w-full h-60 md:h-full  rounded-lg shadow-lg flex items-center justify-center">
          {!loading && expenseGraphData && expenseGraphData.length > 0 ? (
            <ExpenseChart ExpenseData={expenseGraphData} />
          ) : (
            <p>Loading pharmacy expense data...</p>
          )}
        </div>
      </div>
      
      <div className="w-full mt-6 px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-col lg:flex-row gap-4">
          <h1 className="text-xl font-semibold flex-1 text-nowrap md:text-xl lg:text-2xl">
            Onboarding Checklist
          </h1>
          <Formik
              initialValues={{ category: "", search: "" }}
            onSubmit={() => {}}
          >
              {({ isSubmitting }) => (
              <Form className="flex md:min-w-64 flex-wrap pb-6 text-grey gap-2 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                <FileDownloadField title="Reports" className="min-w-48" parentClassName="flex-1" />
                <SelectField
                  className="border-none shadow-lg rounded-lg font-medium min-w-48"
                  parentClassName="flex-1"
                  name="category"
                  options={[
                      { value: "Al Categories", label: "Al Categories" },
                      { value: "operational", label: "Operational" },
                  ]}
                />
                <div className="relative min-w-48 flex-1">
                  <Input
                    name="search"
                    placeholder="Search Checklist"
                    className="border-none shadow-lg rounded-lg font-medium placeholder:text-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                    <IoSearch size={18} />
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
            <div className="flex flex-col gap-6 mt-6">
              <div>
                <p className="font-semibold">Checklist Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                  <div
                    className="bg-primary h-[4px] rounded-full"
                    style={{ width: `${pharmacyChecklists.checklist_progress || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="border-b border-[#F1F5F9] my-2"></div>
              <Accordion
                items={pharmacyChecklists?.checklist?.map((item: any) => ({
                  checklist_name: item.checklist_name,
                  id: item.checklist_id
                }))}
                tasklist={pharmacyAssignChecklists}
                handleEditTasklist={() => {
                  dispatch(setIsAddExpenseModal(true));
                }}
                onChecklistSelect={handleChecklistSelect}
              />
            </div>
      </div>
      {isAddExpenseModal && <OnboardingExpenseModal />}
    </>
  );
};

export default DashboardSection;