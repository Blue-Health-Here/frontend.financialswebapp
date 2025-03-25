"use client"
import React from 'react'
import FileUploadField from '@/components/common/form/FileUploadField'
import SelectField from '@/components/common/form/SelectField'
import { SubmitButton } from '@/components/submit-button'
import { Form, Formik } from 'formik'
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input'
import { tableData } from '@/utils/constants'

const DocumentVerification = () => {
  return (
    <>
      <div className="px-6 py-8 bg-white shadow-lg rounded-lg">
        <h1>Document Verification</h1>
        <Formik
          initialValues={{ document835: null, bankStatement: null }}
          onSubmit={(values) => {}}
        >
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FileUploadField
              name="document835"
              id="document835"
              title="Upload 835 File"
              description="Maximum size allowed is 25MB. Supported formats: pdf"
              variant="dropzone"
            />
            <FileUploadField
              name="bankStatement"
              id="bankStatement"
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

      {/* History Table */}
      <div className="mt-6 py-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="pb-6 px-6">
          {/* Title & Filters (Row on Desktop, Column on Small Screens) */}
          <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="">History</h1>

            {/* Filters (Move Below History on Small Screens Only) */}
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
              <tr className="bg-[#F3F2F7] uppercase text-center text-themeGrey text-sm border-b border-[#E9ECEF]">
                <th className="p-4">Serial No</th>
                <th className="p-4">835 File</th>
                <th className="p-4">835 AMT</th>
                <th className="p-4">Bank Statement</th>
                <th className="p-4">Bank AMT</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="border-b text-center border-[#EBE9F1] bg-white">
                  <td className="p-4 text-grey font-medium">#{row.serial}</td>
                  <td className="p-4 text-grey">{row.file}</td>
                  <td className="p-4 font-medium">${row.amt}</td>
                  <td className="p-4 text-grey">{row.bankStatement}</td>
                  <td className="p-4 font-medium">{row.bankAmt}</td>
                  <td className="p-4 text-grey">{row.time}</td>
                  <td className="p-4">
                    <SubmitButton
                      className={`rounded-full text-xs transition-all duration-200 
                      ${row.status === "Cleared"
                          ? "bg-[#28C76F1F] text-[#28C76F] hover:bg-[#28c76f3a]"
                          : "bg-[#ff7d031f] text-[#FF9F43] hover:bg-[#ff7d0340]"
                        }`}
                    >
                      {row.status}
                    </SubmitButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DocumentVerification
