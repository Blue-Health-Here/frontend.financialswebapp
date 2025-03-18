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
import { setIsAddQuestion, setIsEditQuestion } from "@/store/features/admin/checklist/adminChecklistSlice";
import EditQuestionModal from "./EditQuestionModal";

const ChecklistSection = () => {
    const isAddQuestion = useSelector((state: RootState) => state.checklist.isAddQuestion);
    const isEditQuestion = useSelector((state: RootState) => state.checklist.isEditQuestion);
    const dispatch = useDispatch();

    const handleAddQuestion = () => {
        dispatch(setIsAddQuestion(true))
    };

    const handleEditQuestion = () => {
        dispatch(setIsEditQuestion(true))
    }

    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-lg md:text-2xl">Checklist</h1>
                </div>
            </div>
            <div className="py-4 flex items-center justify-between flex-wrap gap-4 pb-6">
                <h3 className="align-middle text-base flex items-center justify-center gap-2">
                    <span className="text-xs sm:text-sm md:text-[16px] font-medium text-grey">Add new Question</span>
                    <SubmitButton className="w-6 h-6 md:w-7 md:h-7 p-1" onClick={handleAddQuestion}><FaPlus className="text-white  text-xs" /></SubmitButton>
                </h3>
                <Formik
                    initialValues={{ type: "", category: "", search: "" }}
                    onSubmit={() => { }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex md:min-w-64 flex-wrap pb-6 text-grey gap-2 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                            <SelectField
                                className="border-none shadow-lg rounded-lg font-medium min-w-48"
                                parentClassName="flex-1"
                                name="type"
                                options={[
                                    { value: "all", label: "All Types" },
                                    { value: "on-boarding", label: "On boarding" },
                                    { value: "operational", label: "Operational" },
                                ]}
                            />
                            <SelectField
                                className="border-none shadow-lg rounded-lg font-medium min-w-48"
                                parentClassName="flex-1"
                                name="category"
                                options={[
                                    { value: "on-boarding", label: "On boarding" },
                                    { value: "operational", label: "Operational" },
                                ]}
                            />
                            <div className="relative min-w-48 flex-1">
                                <Input name="search" placeholder="Search Checklist" className="border-none shadow-lg rounded-lg font-medium placeholder:text-xs" />
                                <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                                    <IoSearch size={18} />
                                </span>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="flex flex-col gap-6">
                {checklists.map((checklist, index) => (
                    <div className="w-full" key={index}>
                        <h1 className="text-sm sm:text-[16px] md:text-lg mb-4">{checklist.name + " Checklist"}</h1>
                        <Accordion key={index} items={checklist.list} handleEditQuestion={handleEditQuestion} />
                    </div>
                ))}
            </div>
            {isAddQuestion && <AddNewQuestionModal />}
            {isEditQuestion && <EditQuestionModal />}
        </div>
    );
}

export default ChecklistSection;