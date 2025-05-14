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
import { fetchPharmacyAssignChecklist, fetchPharmacyChecklist, fetchPharmacyDashboardStats, fetchPharmacyExpenseGraph } from "@/services/pharmacyServices";
import FileDownloadField from "@/components/common/form/FileDownloadField";
import { StatsCardProps } from "@/utils/types";
import { assignPharmacyStatsValues } from "@/utils/helper";
import { setIsAddQuestion, setSelectedChecklistItem } from "@/store/features/global/globalSlice";
import AddNewQuestionModal from "@/components/common/AddNewQuestionModal";
import TextMessage from "@/components/common/TextMessage";

const DashboardSection = () => {
  const { pharmacyStatsData, expenseGraphData, pharmacyChecklists, pharmacyAssignChecklists, isAddQuestion } = useSelector((state: RootState) => state.global);
  const [statsUpdatedData, setStatsUpdatedData] = useState<StatsCardProps[]>(pharmacyDashboardStatsData);
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    if (isAddQuestion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddQuestion]);

  const handleEditClick = (item: any) => {
    console.log("item", item)
    dispatch(setSelectedChecklistItem(item))
    dispatch(setIsAddQuestion(true));
  };

  const filteredPharmacyChecklists = pharmacyChecklists?.checklist?.filter((checklist: any) => {
    const nameMatches = checklist.checklist_name.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatches
  });
  
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
          {expenseGraphData && expenseGraphData.length > 0 ? (
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
            onSubmit={() => { }}
          >
            {({ isSubmitting }) => (
              <Form className="flex md:min-w-64 flex-wrap pb-6 text-grey gap-2 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                <FileDownloadField title="Reports" className="min-w-48" parentClassName="flex-1" />
                <div className="relative min-w-48 flex-1">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredPharmacyChecklists?.length > 0 ? (
            <Accordion
              items={filteredPharmacyChecklists.map((item: any) => ({
                checklist_name: item.checklist_name,
                id: item.checklist_id
              }))}
              tasklist={pharmacyAssignChecklists}
              handleEditTasklist={(item: any) => handleEditClick(item)}
              onChecklistSelect={handleChecklistSelect}
            />
          ) : (
            <TextMessage text="Checklist Not found" />
          )}
        </div>
      </div>
      {isAddQuestion && <AddNewQuestionModal selectedType="onboarding" isUpdatedMode={true} />}
    </>
  );
};

export default DashboardSection;