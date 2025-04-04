"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { operationalchecklists } from "@/utils/constants";
import { IoSearch } from "react-icons/io5";
import Accordion from "@/components/common/Accordion";
import { Form, Formik } from "formik";
import SelectField from "@/components/common/form/SelectField";
import OperationsExpenseModal from "./OperationsExpenseModal";
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from "react-redux";
import { setIsAddOperationsExpense } from "@/store/features/pharmacy/operations/operationsExpenseSlice";
import FileDownloadField from "@/components/common/form/FileDownloadField";


const OperationsSection = () => {
  const { isAddOperationsExpense } = useSelector((state: RootState) => state.operations)
  const dispatch = useDispatch()

  return (
    <>
      <div className="w-full mt-6 px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg">
      <div className="py-4 flex items-center justify-between flex-wrap gap-4 pb-6">
                 <h1 className=" text-lg md:text-2xl font-semibold flex-1 text-nowrap">
                   {operationalchecklists[0].name}
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

        {operationalchecklists.map((checklist, index) => (
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
            <Accordion key={index} items={checklist.list} handleEditQuestion={() => { dispatch(setIsAddOperationsExpense(true)) }} />
          </div>
        ))}
      </div>
      {isAddOperationsExpense && <OperationsExpenseModal />}
    </>
  );
};

export default OperationsSection;
