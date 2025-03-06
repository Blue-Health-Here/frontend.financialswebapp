import { useDispatch } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsEditQuestion } from "@/store/features/checklist/checklistSlice";

const EditQuestionModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsEditQuestion(false));
    };
    return (
            <Modal>
                <div className="bg-white w-96 h-full">
                    <HeaderModal title="Edit Question" onClose={handleClose} />
                    <div className="p-6">
                        <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                            <Form className="flex flex-col gap-y-4">
                                <InputField label="Question" className="placeholder:text-themeLight" name="name" placeholder="Enter Question" />
                                <SelectField
                                    label="Category"
                                    name="category"
                                    options={[
                                        { value: "choose", label: "" },
                                        { value: "onboarding", label: "Onboarding" },
                                        { value: "operations", label: "Operations" },
                                    ]}
                                />
                                <div className="flex gap-4">
                                    <SubmitButton type="submit" className="text-primary flex-1 hover:text-white bg-secondary">Discard</SubmitButton>
                                    <SubmitButton type="submit" className="text-primary flex-1 hover:text-white bg-secondary">Save</SubmitButton>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        )
}

export default EditQuestionModal