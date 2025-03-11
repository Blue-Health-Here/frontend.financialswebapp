import { useDispatch } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import RadioField from "@/components/common/form/RadioField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddQuestion } from "@/store/features/admin/checklist/adminChecklistSlice";


const AddNewQuestionModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddQuestion(false));
    };
    return (
        <Modal>
            <div className="bg-white w-96 h-full">
                <HeaderModal title="Add New Question" onClose={handleClose} />
                <div className="p-6">
                    <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Question" className="placeholder:text-themeLight" name="name" placeholder="Enter Question" />
                            <SelectField
                                label="Checklist Type"
                                name="checklistType"
                                options={[
                                    { value: "onboarding", label: "Onboarding" },
                                    { value: "operations", label: "Operations" },
                                ]}
                            />
                            <SelectField
                                label="Pharmacy"
                                name="pharmacy"
                                options={[
                                    { value: "Pharmacy1", label: "Pharmacy1" },
                                    { value: "Pharmacy2", label: "Pharmacy2" },
                                ]}
                            />
                            <SelectField
                                label="Category"
                                name="category"
                                options={[
                                    { value: "choose", label: "" },
                                    { value: "onboarding", label: "Onboarding" },
                                    { value: "operations", label: "Operations" },
                                ]}
                            />
                            <div className="flex gap-x-6">
                                <RadioField
                                    label=""
                                    name="isExpense"
                                    options={[
                                        { value: "isExpense", label: "Is Expense" },
                                        { value: "isDocument", label: "Is Document" },
                                    ]}
                                />
                            </div>
                            <InputField label="Expense" className="placeholder:text-themeLight" name="expense" placeholder="$ 0" />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    )
}

export default AddNewQuestionModal