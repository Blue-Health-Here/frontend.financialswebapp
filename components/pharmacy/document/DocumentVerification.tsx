"use client"
import React, { useState } from 'react'
import FileUploadField from '@/components/common/form/FileUploadField'
import SelectField from '@/components/common/form/SelectField'
import { SubmitButton } from '@/components/submit-button'
import { Form, Formik } from 'formik'
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input'
import { tableData } from '@/utils/constants'
import { addNewPaymentReconciliationInitialVals } from '@/utils/initialVals'
import toast from 'react-hot-toast'
import { createNewPaymentReconciliation } from '@/services/pharmacyServices'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPaymentReconciliationInitialchema } from '@/utils/validationSchema'
import { RootState } from '@/store/store'
import { PaymentReconciliationProps } from '@/utils/types'

const DocumentVerification = () => {
      const { DocumentVerificationDetails } = useSelector((state: RootState) => state.DocumentVerification);
      console.log("DocumentVerificationDetails",DocumentVerificationDetails);
      const dispatch = useDispatch()

      const handleSubmit = async (values: typeof addNewPaymentReconciliationInitialVals) => {
          console.log(values);   
          const payload: any = {
            file_835: values.file_835,
            file_pdf: values.file_pdf,
        };
         
        try {
            console.log("Form submitted successfully", payload);
            await createNewPaymentReconciliation(dispatch, payload);
          }  catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
        };
   
  return (
    <>
      <div className="px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1 className='text-lg md:text-2xl'>Document Verification</h1>
        <Formik
          initialValues={addNewPaymentReconciliationInitialVals}
          onSubmit={handleSubmit}
          validationSchema={addNewPaymentReconciliationInitialchema}
          >
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FileUploadField
              name="file_835"
              id="file_835"
              title="Upload 835 File"
              description="Maximum size allowed is 25MB. Supported formats: pdf"
              variant="dropzone"
            />
            <FileUploadField
              name="file_pdf"
              id="file_pdf"
              title="Upload Bank Statement"
              description="Maximum size allowed is 25MB. Supported formats: pdf"
              variant="dropzone"
            />
            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <SubmitButton className="text-white w-full md:w-auto px-12">
                Verify Document
              </SubmitButton>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="mt-6 py-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="pb-6 px-6">
          <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-lg md:text-2xl">History</h1>
            <Formik initialValues={{ type: "", category: "", search: "" }} onSubmit={() => {}}>
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
              <th className="p-4">Payer Name</th>
              <th className="p-4">Payment Date</th>
              <th className="p-4">Expected Total</th> 
              <th className="p-4">Bank Paid</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

            <tbody>
              {DocumentVerificationDetails && DocumentVerificationDetails.length > 0 ? (
                DocumentVerificationDetails.map((item: PaymentReconciliationProps, index:number) => (
                  <tr key={index} className="border-b text-xs md:text-sm text-center border-[#EBE9F1] bg-white">
                    <td className="p-4 text-grey font-medium">#{index+1}</td>
                    <td className="p-4 text-grey">{item.payer_name}</td>
                    <td className="p-4 font-medium">${item.expected_total.toFixed(2)}</td>
                    <td className="p-4 text-grey">${item.bank_paid.toFixed(2)}</td>
                    <td className="p-4 font-medium">{item.payment_date}</td>
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
                <tr>
                  <td colSpan={6} className="p-4 text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DocumentVerification
