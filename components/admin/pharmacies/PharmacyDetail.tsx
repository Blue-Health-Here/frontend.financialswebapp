"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { IoIosArrowBack } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Accordion from "@/components/common/Accordion";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import CourseCard from "./CourseCard";
import FileDownloadField from "@/components/common/form/FileDownloadField";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsAddQuestion, setSelectedChecklistItem } from "@/store/features/admin/pharmacy/adminPharmacySlice";
import AddNewQuestionModal from "./AddNewQuestionModal";
import { UploadedFileProps } from "@/utils/types";
import toast from "react-hot-toast";
import {
  postAdminLicenseUploadFile,
  postAdminCertificationUploadFile,
  deleteAdminLicense,
  deleteAdminCertification,
  fetchAdminPharmacyDetails,
} from "@/services/adminServices";
import Licensing from "./Licensing";
import Certifications from "./Certifications";
import PharmacyDetailCard from "./PharmacyDetailCard";

const PharmacyDetail = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null);
  const { pharmacyDetailsData } = useSelector((state: RootState) => state.global);
  const { isAddQuestion, pharmacyCourses, onboardingChecklist, operationsChecklist } = useSelector((state: RootState) => state.pharmacy);
  const [selectedChecklistType, setSelectedChecklistType] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const hasFetched = useRef(false);
  const id = Array.isArray(params?.pharmacy_id) ? params.pharmacy_id[0] : params?.pharmacy_id;

  const fetchData = async () => {
    try {
      await fetchAdminPharmacyDetails(dispatch, id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
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
        await fetchData();
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!!");
    }
  };

  const handleDeleteFile = async (
    fileId: string,
    fileType: "license" | "certification"
  ) => {
    try {
      if (!id) return;
      if (fileType === "license") {
        await deleteAdminLicense(dispatch, fileId);
      } else {
        await deleteAdminCertification(dispatch, fileId);
      }
      await fetchData();
    } catch (error) {
      console.error(`Error deleting ${fileType}:`, error);
    }
  };

  const handleEditClick = (item: any, type: string) => {
    dispatch(setSelectedChecklistItem(item));
    setSelectedChecklistType(type)
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
              {pharmacyDetailsData?.pharmacy_name || "Loading..."}
            </p>
          </div>
          <div className="flex gap-x-4 items-center">
            <FileDownloadField title="Reports" />
            <Image src="/delete-icon.svg" alt="" width={20} height={20} />
          </div>
        </div>
        <PharmacyDetailCard pharmacyDetailsData={pharmacyDetailsData} />
        <div className="">
          <Licensing handleDeleteFile={handleDeleteFile} setUploadedFile={setUploadedFile} handleFileUpload={handleFileUpload} />
          <Certifications handleDeleteFile={handleDeleteFile} setUploadedFile={setUploadedFile} handleFileUpload={handleFileUpload} />
        </div>
      </div>
      {["onboarding", "operations"].map((type, index) => {

        const checklistData = type === 'operations' ? operationsChecklist : onboardingChecklist
        const uniqueChecklistIds = Array.from(
          new Set((checklistData || [])
            .map((item: any) => item?.checklist_id)
            .filter((id: any) => id !== undefined))
        );
        const uniqueItems = uniqueChecklistIds.map(id => {
          const item = checklistData?.find((item: any) => item.checklist_id === id);
          return {
            checklist_id: item?.checklist_id,
            checklist_name: item?.checklist_name,
            checklist_type: type
          };
        });

        return (
          <div className="w-full mt-6 px-6 pt-8 pb-4 bg-white shadow-lg rounded-lg" key={index}>
            <div className="flex flex-col gap-6">
              <h2 className="text-base sm:text-2xl font-semibold flex-1 text-nowrap md:text-xl lg:text-2xl">
                {type.charAt(0).toUpperCase() + type.slice(1) + " Checklist"}
              </h2>

              {uniqueChecklistIds.map((checklistId, groupIndex) => {
                const filteredTasks = checklistData?.filter((item: any) => item.checklist_id === checklistId);

                return (
                  <Accordion
                    key={groupIndex}
                    handleEditTasklist={(item: any) => handleEditClick(item, type)}
                    items={[uniqueItems[groupIndex]]}
                    tasklist={filteredTasks}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
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
          {pharmacyCourses?.length > 0 && pharmacyCourses.map((course: any) => (
            <CourseCard
              key={course.id}
              {...course}
            />
          ))}
        </div>
      </div>
      {isAddQuestion && <AddNewQuestionModal selectedType={selectedChecklistType} pharmacyId={id || ''} />}
    </>
  );
};

export default PharmacyDetail;
