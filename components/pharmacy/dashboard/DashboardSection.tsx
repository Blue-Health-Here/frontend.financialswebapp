"use client";

import React from "react";
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
import { setIsAddQuestion } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import AddNewQuestionModal from "@/components/admin/pharmacies/AddNewQuestionModal";

const DashboardSection = () => {
  const { isAddQuestion } = useSelector((state: RootState) => state.pharmacy)
  const dispatch = useDispatch()

  const handleEditQuestion = () => {
    dispatch(setIsAddQuestion(true))
  }
  return (
    <>
      <h3 className="text-themeGrey font-medium mb-2">Statistics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:auto-rows-fr">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statsDataConstant.map((item, index) => (
            <StatsCard key={index} value={item.value} label={item.label} color={item.color} icon={item.icon} />
          ))}
        </div>
        <div className="bg-white w-full h-60 md:h-full  rounded-lg shadow-lg flex items-center justify-center">
          <ExpenseChart />
        </div>
      </div>

      <div className="w-full mt-6 px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-lg font-semibold">{onBoardingchecklists[0].name} Checklist</h1>

          <Formik initialValues={{ type: "", category: "", search: "" }} onSubmit={() => { }}>
            {({ isSubmitting }) => (
              <div className="w-full lg:w-auto">
                <Form className="flex flex-col md:flex-row lg:flex-row w-full gap-4 text-grey">

                  <div className="flex flex-col md:flex-row lg:flex-row w-full lg:w-auto gap-4 mt-4 md:mt-6 mb-4 md:mb-6">
                    <SelectField
                      className="border-none shadow-lg rounded-lg font-medium min-w-48 w-full md:w-1/2 lg:w-auto"
                      name="type"
                      options={[
                        { value: "all", label: "All Types" },
                        { value: "on-boarding", label: "On boarding" },
                        { value: "operational", label: "Operational" },
                      ]}
                    />
                    <SelectField
                      className="border-none shadow-lg rounded-lg font-medium min-w-48 w-full md:w-1/2 lg:w-auto"
                      name="category"
                      options={[
                        { value: "on-boarding", label: "On boarding" },
                        { value: "operational", label: "Operational" },
                      ]}
                    />
                  </div>

                  <div className="relative w-full md:w-full lg:w-auto mt-0 md:mt-6 mb-4 md:mb-6 sm:-mt-2">
                    <Input name="search" placeholder="Search Checklist" className="border-none shadow-lg rounded-lg font-medium placeholder:text-xs w-full" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                      <IoSearch size={18} />
                    </span>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>

        {onBoardingchecklists.map((checklist, index) => (
          <div className="flex flex-col gap-6" key={index}>
            <div className="py-4 flex justify-between items-center gap-4">
              <h1 className="text-lg mb-4">{checklist.name + " Checklist"}</h1>
            </div>
            <div>
              <p className="font-semibold">Checklist Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                <div className="bg-primary h-[4px] rounded-full" style={{ width: `${checklist.progress}%` }}></div>
              </div>
            </div>

            <Accordion key={index} items={checklist.list} handleEditQuestion={handleEditQuestion} />
          </div>
        ))}
      </div>
      {isAddQuestion && <AddNewQuestionModal />}
    </>
  );
};

export default DashboardSection;
