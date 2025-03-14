"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { operationalchecklists } from "@/utils/constants";
import { IoSearch, IoDownload } from "react-icons/io5";
import Accordion from "@/components/common/Accordion";
import { Form, Formik } from "formik";
import SelectField from "@/components/common/form/SelectField";

const OperationsSection = () => {
  return (
    <>
      <div className="w-full mt-6 px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-col lg:flex-row gap-4">
                {/* Onboarding Checklist Title */}
                <h1
                  className=" text-lg sm:text-lg font-semibold flex-1 text-nowrap 
                    lg:text-2xl"
                >
                  {operationalchecklists[0].name}
                </h1>
      
                {/* Container for Button & Form */}
                <div className="flex flex-col sm:flex-col-reverse md:flex-row gap-4">
                  {/* Formik Form */}
                  <Formik
                    initialValues={{ category: "", search: "" }}
                    onSubmit={() => {}}
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
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z"
                              fill="#1E3A8A"
                            />
                          </svg>
                          Report
                        </button>
                        {/* Dropdown */}
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
      
                        {/* Search Input */}
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
      
                        {/* Report Button (moved after dropdowns for small screens) */}
                        <button
                          className="sm:hidden border-none shadow-lg rounded-md font-semibold 
                  min-w-40 h-10 text-md 
                  sm:min-w-32 sm:h-8 sm:text-sm 
                  md:min-w-36 md:h-9 md:text-sm 
                  bg-[#93C5FD] hover:bg-blue-400 transition-all 
                  flex items-center gap-x-2 justify-center text-[#1E3A8A]"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
            <Accordion key={index} items={checklist.list} />
          </div>
        ))}
      </div>
    </>
  );
};

export default OperationsSection;
