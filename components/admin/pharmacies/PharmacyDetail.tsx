"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { IoIosArrowBack } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import FileUploadField from "@/components/common/form/FileUploadField";
import { Form, Formik } from "formik";
import { checklists, courseData, pharmacyData } from "@/utils/constants";
import Accordion from "@/components/common/Accordion";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import CourseCard from "./CourseCard";
import FileDownloadField from "@/components/common/form/FileDownloadField";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsAddQuestion } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import AddNewQuestionModal from "./AddNewQuestionModal";

const PharmacyDetail = () => {
  const [courses, setCourses] = useState(courseData);
  const { isAddQuestion } = useSelector((state: RootState) => state.pharmacy);
  const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const id = params?.pharmacy_id;
  const pharmacy = pharmacies.find(
    (pharmacy: any) => pharmacy.pharmacy_id === id
  );
  if (!pharmacy) {
    return <p>Pharmacy not found.</p>;
  }

  const toggleSelect = (id: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? { ...course, isSelected: !course.isSelected }
          : course
      )
    );
  };

  const handleEditQuestion = () => {
    dispatch(setIsAddQuestion(true));
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

  return (
    <>
      <div className="px-5 md:px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
          <div className="flex gap-x-2 items-center text-grey">
            <div
              onClick={() => router.back()}
              className="flex gap-x-2 items-center"
            >
              <SubmitButton className="bg-white hover:bg-inherit text-black border h-6 w-6 sm:h-[38px] sm:w-[38px] p-1 md:p-2">
                <IoIosArrowBack className="text-sm md:text-[20px]" />
              </SubmitButton>
              <GoHome className="cursor-pointer text-lg md:text-[20px]" />
              <p className="cursor-pointer text-xs md:text-sm">Pharmacies</p>
            </div>
            <MdKeyboardArrowRight className="text-xl sm:text-2xl" />
            <p className="text-[#3F4254] text-xs md:text-sm">
              {pharmacy.pharmacy_name}
            </p>
          </div>
          <div className="flex gap-x-4 items-center">
            <FileDownloadField title="Reports" />
            <Image src="/delete-icon.svg" alt="" width={20} height={20} />
          </div>
        </div>
        <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-y-10 md:gap-x-10 lg:gap-x-20 items-center">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/Ellipse.png"
              alt="Profile Image"
              width={300}
              height={300}
              sizes="(max-width: 767px) 128px, 300px"
            />
            <div className="space-y-3 text-black w-full">
              <h2 className="text-sm sm:text-lg lg:text-xl font-bold">
                {pharmacy.pharmacy_name}
              </h2>

              <div className="flex justify-between flex-wrap gap-4">
                <p className="text-xs sm:text-sm md:text-[16px] font-medium">
                  Total Expense
                </p>
                <span className="text-xs sm:text-sm md:text-[16px] font-medium">
                  ${pharmacy.expense}
                </span>
              </div>

              <div className="flex justify-between flex-wrap gap-4">
                <p className="text-xs font-semibold">Courses Completed</p>
                <span className="text-xs sm:text-sm md:text-[12px] font-semibold">
                  {pharmacy.total_completed} / {pharmacy.courses | 0}
                </span>
              </div>

              <div className="w-full">
                <div className="flex justify-between flex-wrap gap-4">
                  <p className="text-[12px] font-semibold">
                    Onboarding Checklist Progress
                  </p>{" "}
                  <span className="text-[12px] font-semibold">
                    {pharmacy.completion_percentage}%
                  </span>
                </div>{" "}
                <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                  <div
                    className="bg-primary h-[4px] rounded-full"
                    style={{ width: `${pharmacy.completion_percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-grey space-y-3">
            <p className=" text-xs md:text-sm">
              <strong className="text-black">Address:</strong> Lorem ipsum dolor
              sit amet consectetur, praesentium?
            </p>
            <p className=" text-xs md:text-sm">
              <strong className="text-black">Email:</strong> JohnDoe@gmail.com
            </p>
            <p className=" text-xs md:text-sm">
              <strong className="text-black">Contact:</strong> 123456789
            </p>
          </div>
        </div>

        <div className="">
          <Formik
            initialValues={{ documents: [] }}
            onSubmit={(values) => console.log(values)}
          >
            {() => (
              <Form>
                <FileUploadField
                  label="Licensing"
                  title="Upload License"
                  name="file"
                  isMultiSelect={true}
                  className="w-60 mb-6 border-primary"
                  id=""
                />
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={{ documents: [] }}
            onSubmit={(values) => console.log(values)}
          >
            {() => (
              <Form className="w-full ">
                <FileUploadField
                  label="Certifications"
                  title="Upload Certification"
                  name="file"
                  isMultiSelect={true}
                  className="w-60 border-primary"
                  id=""
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {checklists.map((checklist, index) => (
        <div
          className="w-full mt-6  px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg"
          key={index}
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-lg mb-4">{checklist.name + " Checklist"}</h1>
            <Accordion
              key={index}
              items={checklist.list}
              handleEditQuestion={handleEditQuestion}
            />
          </div>
        </div>
      ))}
      <div className="mt-6 px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
          <h1 className="text-lg md:text-2xl">Courses</h1>
          <div className="relative w-[390px] sm:max-w-md">
            <Input
              name="email"
              placeholder="Search Courses"
              className="h-[42px] border-none shadow-lg rounded-lg font-medium"
            />
            <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
              <IoSearch className="w-5 h-5" />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onSelect={() => toggleSelect(course.id)}
            />
          ))}
        </div>
      </div>
      {isAddQuestion && <AddNewQuestionModal />}
    </>
  );
};

export default PharmacyDetail;
