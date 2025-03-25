"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import UpdatePasswordSection from "@/components/common/UpdatePasswordSection";
import { Field, Form, Formik } from "formik";
import FileUploadField from "@/components/common/form/FileUploadField";
import DeleteAccountModal from "./DeleteAccountModal";
import InputField from "@/components/common/form/InputField";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { RootState } from "@/store/store";
import {fetchProfileDataPharmacy,postProfileUpdatePharmacy,fetchPharmacyLicense, deletePharmacyLicense, fetchPharmacyCertifications,postCertificationsUploadFile, deletePharmacyCertification
} from "@/services/pharmacyServices";
import { UploadedFileProps } from "@/utils/types";
import { postLicenseUploadFile } from "@/services/pharmacyServices";
import toast from "react-hot-toast";

const ProfileSection = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null );
  const { profileData } = useSelector((state: RootState) => state.global);
  const { licenseData } = useSelector((state: RootState) => state.global);
  const { certificationsData } = useSelector((state: RootState) => state.global);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const fileInputRef: any = useRef(null);
  const dispatch = useDispatch();

  interface License {
    id: string;
    filename: string;
    file_url: string;
  }

  console.log(licenseData);
  const [initialVals, setInitialVals] = useState({
    pharmacy_name: "",
    address: "",
    email: "",
    contact: "",
    services_offered: "",
    license: [],
    certificate: []
  });

  useEffect(() => {
    fetchProfileDataPharmacy(dispatch);
    fetchPharmacyLicense(dispatch);
    fetchPharmacyCertifications(dispatch);

  }, []);
  console.log(profileData);
  useEffect(() => {
    if (profileData) {
      setInitialVals({
        pharmacy_name: profileData?.name || "",
        address: profileData?.address || "",
        email: profileData?.email || "",
        contact: profileData?.contact || "",
        services_offered: profileData?.services || "",
        license: licenseData?.license || [],
        certificate:certificationsData?.certificate || []
      });
      setProfile(profileData?.image_url ?? null);
    }
  }, [profileData]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file (png, jpg, jpeg).");
    }
  };
  const handleSubmit = (values: any) => {
    const formData = new FormData();

    formData.append("name", values.pharmacy_name);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    formData.append("services", values.services_offered);

    if (profile) {
      formData.append("file", profile);
    }
    postProfileUpdatePharmacy(dispatch, formData);
  };

  const handleFileUpload = async (
    event: any,
    setValue: (value: any) => void,
    fileType: "license" | "certification"
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
  
      const uploadFunction =
        fileType === "license" ? postLicenseUploadFile : postCertificationsUploadFile;
  
      const response = await uploadFunction(dispatch, formData);
  
      if (response?.success) {
        console.log(response.data[0]);
        setUploadedFile(response.data);
        setValue(response.data); 
  
        fileType === "license"
          ? fetchPharmacyLicense(dispatch)
          : fetchPharmacyCertifications(dispatch);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!!");
    }
  };
  
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveClick = () => {
    setProfile(null);
  };
  const handleDelete = () => {
    setIsCloseModal(true);
  };

  const handleDeleteFile = async (id: string, fileType: "license" | "certification") => {
    try {
      if (fileType === "license") {
        await deletePharmacyLicense(dispatch, id);
        fetchPharmacyLicense(dispatch); 
      } else {
        await deletePharmacyCertification(dispatch, id);
        fetchPharmacyCertifications(dispatch); 
      }
    } catch (error) {
      console.error(`Error deleting ${fileType}:`, error);
    }
  };


  return (
    <div>
      <Formik
        initialValues={initialVals}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form className="p-6 bg-white shadow-lg rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Account</h1>
                <SubmitButton
                  type="submit"
                  className="bg-secondary text-primary hover:text-white"
                >
                  Save Changes
                </SubmitButton>
              </div>
              <div className="flex gap-x-8">
                <div className="grid grid-cols-2 gap-x-4 w-full">
                  <InputField
                    label="Pharmacy Name"
                    type="text"
                    placeholder="Pharmacy Name"
                    className="placeholder:text-[#4E4E4E]"
                    name="pharmacy_name"
                  />
                  <InputField
                    label="Address"
                    type="text"
                    placeholder="Address"
                    className="placeholder:text-[#4E4E4E]"
                    name="address"
                  />
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="placeholder:text-[#4E4E4E] bg-gray-200"
                    disabled
                    name="email"
                  />
                  <InputField
                    label="Contact"
                    type="text"
                    placeholder="Add Contact"
                    className="placeholder:text-[#4E4E4E]"
                    name="contact"
                  />
                </div>
                <div className="flex flex-col items-center w-auto mt-4">
                  <div className="relative">
                    <div className="w-full h-full relative overflow-hidden rounded-md">
                      <Image
                        src={
                          profile
                            ? URL.createObjectURL(profile)
                            : (profileData?.image_url ?? "/default-profile.png")
                        }
                        alt="Profile"
                        width={120}
                        height={120}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      <button
                        className="p-1 bg-white rounded-md shadow-lg"
                        onClick={handleRemoveClick}
                      >
                        <X size={14} className="text-gray-600" />
                      </button>
                      <button
                        className="p-1 bg-white rounded-md shadow-lg"
                        onClick={handleEditClick}
                      >
                        <Pencil size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-[#A1A5B7] mt-4 text-center whitespace-nowrap font-semibold">
                    Allowed file types: png, jpg, jpeg.
                  </p>
                  <Field
                    name="file"
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <InputField
                  label="Services offered"
                  type="text"
                  placeholder="Services offered"
                  className="placeholder:text-[#4E4E4E]"
                  name="services_offered"
                />
                <div className="w-full">
                  <Label className="font-semibold text-lg">Licensing</Label>

                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {licenseData?.map((license:License) => (
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
                    ))}
                  </div>

                  <FileUploadField
                    title="Upload License"
                    name="license"
                    isMultiSelect={true}
                    setUploadedFile={setUploadedFile}
                    handleFileUpload={(e, setValue) => handleFileUpload(e, setValue, "license")}
                    
                    className="w-60 border-primary mt-4"
                  />
                </div>

                <Label className=" font-semibold text-lg">Certifications</Label>

                <div className="grid grid-cols-3 gap-4 mt-2">
                    {certificationsData?.map((license:License) => (
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
                    ))}
                  </div>

                <FileUploadField
                  title="Upload Certification"
                  name="certificate"
                  isMultiSelect={true}
                  handleFileUpload={(e, setValue) => handleFileUpload(e, setValue, "certification")}
                  className="w-60 border-primary"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <UpdatePasswordSection />
      <div className="mt-6 p-6 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold">Delete Account</h2>
        <div className="flex justify-between items-center">
          <p className="text-base text-[#7E8299]">
            It’ll permanently delete your account..
          </p>
          <SubmitButton
            onClick={handleDelete}
            className="bg-white border border-[#D02E2E] text-[#FF0000] hover:bg-transparent"
          >
            Delete
          </SubmitButton>
        </div>
      </div>
      {isCloseModal && (
        <DeleteAccountModal
          title="Account"
          description="Are you sure you want to delete your account?"
          handleClose={() => setIsCloseModal(false)}
          handleSuccess={() => console.log("handle success")}
        />
      )}
    </div>
  );
};

export default ProfileSection;
