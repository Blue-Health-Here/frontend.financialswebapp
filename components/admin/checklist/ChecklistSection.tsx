"use client"

import Accordion from "@/components/common/Accordion";
import SelectField from "@/components/common/form/SelectField";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { checklists } from "@/utils/constants";
import { Form, Formik } from "formik";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import AddNewQuestionModal from "./AddNewQuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIsAddQuestion } from "@/store/features/checklist/checklistSlice";

const ChecklistSection = () => {
    const isAddQuestion = useSelector((state: RootState) => state.checklist.isAddQuestion);
    const dispatch = useDispatch();

    const handleAddQuestion = () => {
        dispatch(setIsAddQuestion(true))
    };


    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                    <h1>Checklist</h1>
                </div>
                <div className="relative w-[390px] sm:max-w-md">
                    <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                    <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <IoSearch className="w-5 h-5" />
                    </span>
                </div>
            </div>
            <div className="py-2 flex justify-between items-center gap-4">
                <h3 className="align-middle text-base flex items-center justify-center gap-2">
                    <span>Add new Question</span>
                    <SubmitButton className="w-7 h-7 p-1 text-white" onClick={handleAddQuestion}><FaPlus className="text-white" size={12} /></SubmitButton>
                </h3>
                <Formik
                    initialValues={{ type: "", category: "", search: "" }}
                    onSubmit={() => { }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex min-w-64 text-grey gap-2 [&>input]:mb-3 mt-8 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
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
                                    { value: "allCategories", label: "All Categories" },
                                    { value: "on-boarding", label: "On boarding" },
                                    { value: "operational", label: "Operational" },
                                ]}
                            />
                            <div className="relative w-[390px] sm:max-w-md">
                                <Input name="email" placeholder="Search Courses" className="border-none shadow-lg rounded-lg font-medium" />
                                <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                                    <IoSearch className="w-5 h-5" />
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="flex flex-col gap-6">
                {checklists.map((checklist, index) => (
                    <div className="w-full" key={index}>
                        <h2 className="text-lg font-semibold mb-4">{checklist.name + " Checklist"}</h2>
                        <Accordion key={index} items={checklist.list} />
                    </div>
                ))}
            </div>
            {isAddQuestion && <AddNewQuestionModal />}
        </div>
    );
}

export default ChecklistSection;