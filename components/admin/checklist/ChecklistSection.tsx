"use client"

import Accordion from "@/components/common/Accordion";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checklists } from "@/utils/constants";
import { Form, Formik } from "formik";
import Image from "next/image";

const ChecklistSection = () => {
    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                    <h1>Checklist</h1>
                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <Image src="/search-icon.svg" alt="" width={20} height={20} />
                    </span>
                </div>
            </div>
            <div className="py-2 flex justify-between items-center gap-4">
                <h3 className="align-middle text-base flex items-center justify-center gap-2"><span>Add new Question</span> <Button className="w-4 h-6 text-lg text-white">+</Button></h3>
                <Formik
                    initialValues={{ type: "", category: "", search: "" }}
                    onSubmit={() => { }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex min-w-64 text-grey gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                            <SelectField
                                name="type"
                                options={[
                                    { value: "all", label: "All Types" },
                                    { value: "on-boarding", label: "On boarding" },
                                    { value: "operational", label: "Operational" },
                                ]}
                            />
                            <SelectField
                                name="category"
                                options={[
                                    { value: "all", label: "All Categories" },
                                    { value: "on-boarding", label: "On boarding" },
                                    { value: "operational", label: "Operational" },
                                ]}
                            />
                            <div className="relative">
                                <InputField className="placeholder:text-themeLight" name="search" type="text" placeholder="Search Checklist" />
                                <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                                    <Image src="/search-icon.svg" alt="" width={20} height={20} /></span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="flex flex-col gap-6">
                {checklists.map((checklist, index) => (
                    <div className="w-full">
                        <h2 className="text-lg font-semibold mb-4">{checklist.name + " Checklist"}</h2>
                        <Accordion key={index} items={checklist.list} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChecklistSection;