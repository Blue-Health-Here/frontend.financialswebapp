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
import { UploadedFileProps } from "@/utils/types";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import {
  fetchAdminLicense,
  fetchAdminCertification,
  postAdminLicenseUploadFile,
  postAdminCertificationUploadFile,
  deleteAdminLicense,deleteAdminCertification
} from "@/services/adminServices";
import { License } from "@/utils/types";
import TextMessage from "@/components/common/TextMessage";


const PharmacyDetail = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>( null);
  const { licenseData } = useSelector((state: RootState) => state.global);
  const { certificationsData } = useSelector((state: RootState) => state.global);
  const [courses, setCourses] = useState(courseData);
  const { isAddQuestion } = useSelector((state: RootState) => state.pharmacy);
  const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const hasFetched = useRef(false);
  const id = Array.isArray(params?.pharmacy_id) ? params.pharmacy_id[0] : params?.pharmacy_id;
  const pharmacy = pharmacies.find(
    (pharmacy: any) => pharmacy.pharmacy_id === id
  );

  useEffect(() => {
      if (!id) return;
      const fetchData = async () => {
        try {
          await fetchAdminLicense(dispatch, id);
          await fetchAdminCertification(dispatch, id);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      if (!hasFetched.current) {
        hasFetched.current = true;
        fetchData();
      }
  }, [id, dispatch]);
  
  const handleFileUpload = async (
    event: any,
    setValue: (value: any) => void,
    fileType: "license" | "certification"
  ) => {
    try {
      if (!id) {
        toast.error("Pharmacy ID is missing!");
        return;
      }

      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const uploadFunction =
        fileType === "license"
          ? postAdminLicenseUploadFile
          : postAdminCertificationUploadFile;

      const response = await uploadFunction(dispatch, formData, id); 

      if (response?.success) {
        setUploadedFile(response.data[0]); 
        setValue(response.data);

        fileType === "license"
          ? fetchAdminLicense(dispatch, id) 
          : fetchAdminCertification(dispatch, id); 
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!!");
    }
  };

    const handleDeleteFile = async (fileId: string, fileType: "license" | "certification") => {
      try {
        if (!id) return;
    
        if (fileType === "license") {
          await deleteAdminLicense(dispatch, fileId);
          fetchAdminLicense(dispatch, id); 
        } else {
          await deleteAdminCertification(dispatch, fileId);
          fetchAdminCertification(dispatch, id);
        }
      } catch (error) {
        console.error(`Error deleting ${fileType}:`, error);
      }
    };
    

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

  console.log(licenseData, certificationsData, "dpoasi")

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
                <div className="w-full">
                  <Label className="font-semibold text-lg">Licensing</Label>

                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {licenseData?.length > 0 ? licenseData?.map((license: License) => (
                      <div
                        key={license.id}
                        className="flex items-center justify-between p-2 rounded-md border border-grey-500"
                      >
                        <span className="text-sm truncate">
                          {license.filename}
                        </span>

                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-blue-500 hover:text-blue-700">
                            <img
                              src="/downloadFile.svg"
                              alt="Download"
                              className="w-4 h-4"
                            />
                          </button>
                          <button className="p-1 text-red-500 hover:text-red-700">
                            <img
                              src="/delete-icon.svg"
                              onClick={() => handleDeleteFile(license.id, "license")}
                              alt="Delete"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </div>
                    )) : <TextMessage text="License not found." />}
                  </div>

                  <FileUploadField
                    title="Upload License"
                    name="license"
                    setUploadedFile={setUploadedFile}
                    handleFileUpload={(e, setValue) =>
                      handleFileUpload(e, setValue, "license")
                    }
                    className="w-60 border-primary mt-4 mb-4"
                  />
                </div>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={{ documents: [] }}
            onSubmit={(values) => console.log(values)}
          >
            {() => (
              <Form className="w-full ">
                <Label className=" font-semibold text-lg ">Certifications</Label>

                <div className="grid grid-cols-3 gap-4 mt-2">
                  {certificationsData?.length > 0 ? certificationsData?.map((license: License) => (
                    <div
                      key={license.id}
                      className="flex items-center justify-between p-2 rounded-md border border-grey-500"
                    >
                      <span className="text-sm truncate">
                        {license.filename}
                      </span>

                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-500 hover:text-blue-700">
                          <img
                            src="/downloadFile.svg"
                            alt="Download"
                            className="w-4 h-4"
                          />
                        </button>
                        <button className="p-1 text-red-500 hover:text-red-700">
                          <img
                            src="/delete-icon.svg"
                            onClick={() => handleDeleteFile(license.id, "certification")}
                            alt="Delete"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </div>
                  )) : <TextMessage text="Certifications not found." />}
                </div>

                <FileUploadField
                  title="Upload Certification"
                  name="certificate"
                  handleFileUpload={(e, setValue) =>
                    handleFileUpload(e, setValue, "certification")
                  }
                  className="w-60 border-primary mt-4"
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
            <h2 className="text-base sm:text-2xl font-semibold flex-1 text-nowrap md:text-xl lg:text-2xl">
              {checklist.name + " Checklist"}
            </h2>
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
          <h2 className="text-base sm:text-2xl font-semibold flex-1 text-nowrap md:text-xl lg:text-2xl">
            Courses
          </h2>
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
