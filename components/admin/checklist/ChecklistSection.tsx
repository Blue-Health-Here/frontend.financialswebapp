"use client"

import Accordion from "@/components/common/Accordion";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import AddNewQuestionModal from "./AddNewQuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setChecklistDetail, setIsAddChecklist, setIsAddQuestion, setIsEditQuestion } from "@/store/features/admin/checklist/adminChecklistSlice";
import EditQuestionModal from "./EditQuestionModal";
import { useEffect, useRef, useState } from "react";
import SelectField from "@/components/common/form/SelectField";
import AddNewChecklistModal from "./AddNewChecklistModal";
import { ChecklistProps } from "@/utils/types";
import { deleteChecklist, fetchAllChecklist, fetchAllTasklist } from "@/services/adminServices";
import { setLoading } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";

const ChecklistSection = () => {
    const isAddQuestion = useSelector((state: RootState) => state.checklist.isAddQuestion);
    const isEditQuestion = useSelector((state: RootState) => state.checklist.isEditQuestion);
    const isAddChecklist = useSelector((state: RootState) => state.checklist.isAddChecklist);
    const checklists = useSelector((state: RootState) => state.checklist.checklists) as ChecklistProps[];
    const tasklist = useSelector((state: RootState) => state.checklist.tasklist);
    const [selectedChecklistType, setSelectedChecklistType] = useState('');
    const isFetched = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAddQuestion || isEditQuestion) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAddQuestion, isEditQuestion]);

    const handleEditQuestion = () => {
        dispatch(setIsEditQuestion(true))
    }

    useEffect(() => {
        if (!isFetched.current) {
            isFetched.current = true;
            fetchAllChecklist(dispatch).finally(() => setLoading(false));
        }
    }, []);

    const handleEditChecklist = (data: ChecklistProps) => {
        dispatch(setIsAddChecklist(true));
        dispatch(setChecklistDetail(data));
    };

    const handleChecklistSelect = (checklistId: string) => {
        fetchAllTasklist(dispatch, checklistId);
    };

    const handleDeleteChecklist = (id?: string) => {
        deleteChecklist(dispatch, id);
    };
    // console.log("tasklist", tasklist)
    return (
        <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-lg md:text-2xl">Checklist</h1>
                </div>
                <Formik
                    initialValues={{ type: "", category: "", search: "" }}
                    onSubmit={() => { }}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex md:min-w-64 flex-wrap text-grey gap-2 [&>input]:mb-3 [&>input]:placeholder:text-themeLight [&>input]:placeholder:text-[12px]">
                            <SelectField
                                className="border-none shadow-lg rounded-lg font-medium min-w-48"
                                parentClassName="flex-1"
                                name="type"
                                options={[
                                    { value: "onboarding", label: "Onboarding" },
                                    { value: "operational", label: "Operational" },
                                ]}
                            />
                            <SelectField
                                className="border-none shadow-lg rounded-lg font-medium min-w-48"
                                parentClassName="flex-1"
                                name="category"
                                options={[
                                    { value: "onboarding", label: "Onboarding" },
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
            {/* <div className="py-4 flex items-center justify-between flex-wrap gap-4 pb-6">
            </div> */}
            <div className="flex flex-col gap-6 py-4">
                {["onboarding", "operations"].map((type) => {
                    const filteredChecklists = checklists
                        .filter((checklist: ChecklistProps) => checklist.checklist_type === type)
                        .sort((a, b) => a.checklist_name.localeCompare(b.checklist_name));
                    return (
                        <div className="w-full" key={type}>
                            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                                <h2 className="text-base sm:text-2xl font-semibold flex-1 text-nowrap md:text-xl">{type.charAt(0).toUpperCase() + type.slice(1)} Checklist</h2>
                                <h3 className="align-middle text-base flex items-center justify-center gap-2">
                                    <span className="text-xs sm:text-sm md:text-base font-medium text-grey">Add New Checklist</span>
                                    <SubmitButton className="w-6 h-6 md:w-7 md:h-7 p-1"
                                        onClick={() => {
                                            setSelectedChecklistType(type);
                                            dispatch(setIsAddChecklist(true));
                                            dispatch(setChecklistDetail(null));
                                        }}><FaPlus className="text-white  text-xs" />
                                    </SubmitButton>
                                </h3>
                                <h3 className="align-middle text-base flex items-center justify-center gap-2">
                                    <span className="text-xs sm:text-sm md:text-[16px] font-medium text-grey">Add new Checklist Task</span>
                                    <SubmitButton className="w-6 h-6 md:w-7 md:h-7 p-1" onClick={() => {
                                        setSelectedChecklistType(type);
                                        dispatch(setIsAddQuestion(true));
                                    }}><FaPlus className="text-white  text-xs" /></SubmitButton>
                                </h3>
                            </div>
                            <Accordion
                                items={filteredChecklists}
                                handleEditQuestion={handleEditQuestion}
                                handleEditChecklist={(item: any) => handleEditChecklist(item)}
                                handleDelete={handleDeleteChecklist}
                                onChecklistSelect={handleChecklistSelect} />
                        </div>
                    )
                })}
            </div>
            {isAddQuestion && <AddNewQuestionModal selectedType={selectedChecklistType} />}
            {isEditQuestion && <EditQuestionModal />}
            {isAddChecklist && <AddNewChecklistModal selectedType={selectedChecklistType} />}
        </div>
    );
}

export default ChecklistSection;