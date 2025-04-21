"use client"

import React, { useState, useEffect, useRef, Suspense } from 'react'
import FileUploadField from '@/components/common/form/FileUploadField'
import SelectField from '@/components/common/form/SelectField'
import { SubmitButton } from '@/components/submit-button'
import { Form, Formik } from 'formik'
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input'
import { uploadDocVerificationInitialVals } from '@/utils/initialVals'
import toast from 'react-hot-toast'
import { createNewPaymentReconciliation, fetchBankStatements, fetchPaymentReconciliation, postBankStatement } from '@/services/pharmacyServices'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPaymentReconciliationInitialchema } from '@/utils/validationSchema'
import { RootState } from '@/store/store'
import { PaymentReconciliationProps } from '@/utils/types'
import { setIsLoading } from '@/store/features/global/globalSlice'
import FilePreview from '@/components/common/FilePreview'
import * as Yup from "yup";
import { formatCreatedAt } from '@/utils/helper'

const DocumentVerification = () => {
  const { docVerificationDetails = [], bankStatements } = useSelector((state: RootState) => state.DocumentVerification);
  const [initialVals, setInitialVals] = useState(uploadDocVerificationInitialVals)
  const [isClient, setIsClient] = useState(false)
  const [uploaded835Files, set835UploadedFiles] = useState<File[]>([]);
  const dispatch = useDispatch()
  const isFetched = useRef(false);

  // Handle client-side rendering separately from data fetching
  useEffect(() => {
    setIsClient(true)
  }, []);

  // Use a more robust approach to prevent double fetching
  useEffect(() => {
    // Use module-level variable to strictly enforce single execution
    if (typeof window !== 'undefined' && !isFetched.current) {
      // Set flag immediately to prevent any possibility of double execution
      isFetched.current = true;

      // Execute fetch operations in parallel
      Promise.all([
        fetchPaymentReconciliation(dispatch),
        fetchBankStatements(dispatch)
      ])
        .catch(error => console.error("Error fetching data:", error))
        .finally(() => setIsLoading(false));
    }

    // Cleanup function
    return () => {
      // No cleanup necessary, the ref ensures one-time execution
    };
  }, []); // Empty dependency array since we're using the ref for control

  const handleSubmit = async (values: typeof initialVals, { resetForm }: { resetForm: () => void }) => {
    const formData = new FormData();

    if (values.file_835?.length > 0) {
      for (let i = 0; i < values.file_835.length; i++) {
        formData.append('files_835', values.file_835[i]); // Do NOT use 'files_835[]' unless explicitly required
      }
    }

    try {
      await createNewPaymentReconciliation(dispatch, formData, values.statement_id);
      setInitialVals(uploadDocVerificationInitialVals);
      resetForm();
      set835UploadedFiles([]);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!!");
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, type: any) => {
    try {
      const files = Array.from(event.currentTarget.files || []);
      const file = files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();
      const fileSize = file.size;

      if (extension !== "pdf") {
        toast.error("Only .pdf file format is allowed")
        return;
      }

      if (fileSize > 25 * 1024 * 1024) { // 25MB in bytes
        toast.error("File size must be under 25MB");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      await postBankStatement(dispatch, formData);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  
  const handle835Upload = async (event: React.ChangeEvent<HTMLInputElement>, setValue: any, value: any) => {
    const files: any = Array.from(event.currentTarget.files || []);
    
    // Check if any file has invalid extension or size
    const hasInvalidFile = files.some((file: File) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const isInvalidExtension = extension !== '835';
      const isInvalidSize = file.size > 25 * 1024 * 1024; // 25MB in bytes
      
      if (isInvalidExtension) {
        toast.error("Only .835 file format is allowed");
        return true;
      }
      
      if (isInvalidSize) {
        toast.error("File size must be under 25MB");
        return true;
      }

      return false;
    });

    if (hasInvalidFile) {
      return;
    }
    setValue([...(value || []), ...files]);
    set835UploadedFiles((prev) => [...prev, ...files]);
  };

  const handleDelete = async (index?: number, setValue?: any) => {
    const updatedFiles = uploaded835Files.filter((_, i) => i !== index);
    set835UploadedFiles(updatedFiles);
    setValue("file_835", [...updatedFiles]);
  };
  
  const getDynamicValidationSchema = () => {
    return Yup.object({
      file_835: uploaded835Files.length > 0
        ? Yup.mixed().notRequired()
        : Yup.mixed().required('835 File is required'),
      statement_id: bankStatements?.length > 0
        ? Yup.mixed().required('Bank Statement is required')
        : Yup.mixed().notRequired(),
      file_pdf: bankStatements?.length > 0
        ? Yup.mixed().notRequired()
        : Yup.mixed().required('Bank Statement file is required'),
    });
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className='text-lg md:text-2xl'>Document Verification</h1>
        <Formik
          initialValues={initialVals}
          enableReinitialize={true}
          validationSchema={getDynamicValidationSchema()}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className='flex justify-center md:justify-start flex-col gap-2'>
                  <FileUploadField
                    name="file_835"
                    id="file_835"
                    title="Upload 835 File"
                    isMultiSelect={true}
                    onChange={handle835Upload}
                    description="Maximum size allowed is 25MB. Supported formats: pdf"
                    variant="dropzone"
                  />
                  {uploaded835Files.length > 0 && uploaded835Files.map((file, index) => (
                    <div key={index} className='flex-1'>
                      <FilePreview file={file} handleDelete={() => handleDelete(index, setFieldValue)} />
                    </div>
                  ))}
                </div>
                <div className='flex justify-center md:justify-start flex-col gap-2'>
                  <FileUploadField
                    name="file_pdf"
                    id="file_pdf"
                    isMultiSelect={true}
                    title="Upload Bank Statement"
                    description="Maximum size allowed is 25MB. Supported formats: pdf"
                    variant="dropzone"
                    type="file_pdf"
                    onChange={handleChange}
                  />
                  {bankStatements?.length > 0 && (
                    <SelectField
                      label=""
                      name="statement_id"
                      options={[
                        { value: "", label: "Select Bank Statement" },
                        ...bankStatements?.map((category: any) => ({
                          value: category.id,
                          label: category.filename,
                        })),
                      ]}
                    />
                  )}
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                  <SubmitButton className="text-white w-full md:w-auto px-12">
                    Verify Document
                  </SubmitButton>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>

      <div className="mt-6 py-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="pb-6 px-6">
          <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-lg md:text-2xl">History</h1>
            <Formik initialValues={{ type: "", category: "", search: "" }} onSubmit={() => { }}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col sm:flex-row md:flex-row gap-2 sm:gap-4 w-full md:w-auto">
                  <SelectField
                    className="border-none shadow-lg rounded-lg font-medium min-w-48"
                    name="type"
                    options={[
                      { value: "all", label: "All Types" },
                      { value: "on-boarding", label: "On boarding" },
                      { value: "operational", label: "Operational" },
                    ]}
                  />
                  <SelectField
                    className="border-none shadow-lg rounded-lg font-medium min-w-48"
                    name="category"
                    options={[
                      { value: "", label: "Select Status" },
                      { value: "on-boarding", label: "On boarding" },
                      { value: "operational", label: "Operational" },
                    ]}
                  />
                  <div className="relative sm:max-w-md">
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F3F2F7] uppercase text-center text-themeGrey text-xs md:text-sm border-b border-[#E9ECEF]">
                <th className="p-4">Serial No</th>
                <th className="p-4">835 File</th>
                <th className="p-4">Payer Name</th>
                <th className="p-4">835 AMT</th>
                <th className="p-4">Bank Statement</th>
                <th className="p-4">Bank AMT</th>
                <th className="p-4">Payment Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {isClient && docVerificationDetails && docVerificationDetails.length > 0 ? (
                [...docVerificationDetails].sort(
                  (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                )?.map((item: PaymentReconciliationProps, index: number) => (
                  <tr key={index} className="border-b text-xs md:text-sm text-center border-[#EBE9F1] bg-white">
                    <td className="p-4 text-grey font-medium">#{index + 1}</td>
                    <td className="p-4 text-grey">{item.file_835}</td>
                    <td className="p-4 text-grey">{item.payer_name}</td>
                    <td className="p-4 font-medium">${item['835_amt']}</td>
                    <td className="p-4 text-grey">${item.file_pdf}</td>
                    <td className="p-4 text-grey">${item.bank_amt}</td>
                    <td className="p-4 font-medium">{formatCreatedAt(item.created_at)}</td>
                    <td className="p-4">
                      <SubmitButton
                        className={`rounded-full text-xs transition-all duration-200 
                        ${item.status === "Cleared"
                            ? "bg-[#28C76F1F] text-[#28C76F] hover:bg-[#28c76f3a]"
                            : "bg-[#ff7d031f] text-[#FF9F43] hover:bg-[#ff7d0340]"
                          }`}
                      >
                        {item.status}
                      </SubmitButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b text-xs md:text-sm text-center border-[#EBE9F1] bg-white">
                  <td colSpan={6} className="p-4 text-grey font-medium">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Suspense>
  )
}

export default DocumentVerification
