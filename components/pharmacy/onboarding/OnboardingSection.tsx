"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { onBoardingchecklists } from "@/utils/constants";
import { IoSearch, IoDownload } from "react-icons/io5";
import Accordion from "@/components/common/Accordion";
import { Form, Formik } from "formik";
import OnboardingExpenseModal from "./OnboardingExpenseModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsAddExpenseModal } from "@/store/features/pharmacy/onboarding/pharmacyOnboardingExpenseSlice";
import FileDownloadField from "@/components/common/form/FileDownloadField";
import SelectField from "@/components/common/form/SelectField";

const OnboardingSection = () => {
  const { isAddExpenseModal } = useSelector(
    (state: RootState) => state.onboarding
  );
  const dispatch = useDispatch();

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
      <div className="w-full mt-6 px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-col lg:flex-row gap-4">
          <h1 className="text-lg md:text-xl font-semibold flex-1 text-nowrap lg:text-2xl">
            {onBoardingchecklists[0].name}
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
  );
};

export default OnboardingSection;
