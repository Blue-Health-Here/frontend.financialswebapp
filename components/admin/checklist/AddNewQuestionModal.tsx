import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import RadioField from "@/components/common/form/RadioField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddQuestion } from "@/store/features/admin/checklist/adminChecklistSlice";
import SelectField from "@/components/common/form/SelectField";
import TextareaField from "@/components/common/form/TextareaField";
import MultiDateField from "@/components/common/form/MultiDateField";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RxCross2 } from "react-icons/rx";
import FileUploadField from "@/components/common/form/FileUploadField";
import { PharmacyCardProps, UploadedFileProps } from "@/utils/types";
import MultiSelectField from "@/components/common/form/MultiSelectField";
import { RootState } from "@/store/store";

interface AddNewQuestionModalProps {
    selectedType?: string;
}

const AddNewQuestionModal: React.FC<AddNewQuestionModalProps> = ({ selectedType }) => {
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddQuestion(false));
    };

    const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = event.target.value;
        if (newDate && !selectedDates.includes(newDate) && newDate !== "Selected Date(s)") {
            setSelectedDates([...selectedDates, newDate]);
        }
    };

    const handleRemoveDate = (dateToRemove: string) => {
        setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
    };

        const handleFileUpload = async (event: any, setValue: (value: any) => void) => {
            console.log(setValue)
        };
    

    return (
        <Modal>
        <HeaderModal title="Edit Question" onClose={handleClose} />
        <div className="p-6">
            <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                <Form className="flex flex-col gap-y-4">
                    <TextareaField label="Question" className="placeholder:text-themeLight" name="question" />
                    <TextareaField label="Pharmacy Comments" name="note" />
                    <InputField label="Action Items" className="placeholder:text-themeLight" name="action_item" />
                    <FileUploadField
                        label="Upload File"
                        module="course"
                        name="file"
                        title="Upload"
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        handleFileUpload={(e, setValue) => handleFileUpload(e, setValue)}
                    />
                    <SelectField
                        label="Operational Item"
                        name="operational_item"
                        options={[
                            { value: "Tier1", label: "Tier1" },
                            { value: "Tier2", label: "Tier2" },
                        ]}
                    />
                    <MultiDateField label="Key Follow-up dates" name="follow_up_dates" />
                   
                    {selectedDates.length > 0 && (
                        <div>
                            <Label size="xs">Selected Dates(s)</Label>
                            <div className="flex flex-col gap-2 mt-2">
                                {selectedDates.map((date, index) => (
                                    <div key={index} className="flex gap-x-2">
                                        <div className="flex h-10 w-full rounded-md  border border-input bg-background px-3 py-2 text-sm">
                                            <span>{date}</span>
                                        </div>
                                        <button onClick={() => handleRemoveDate(date)}><RxCross2 size={15} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                        <MultiSelectField
                            label="Pharmacy"
                            name="pharmacy_ids"
                            isMulti
                            options={[
                                { value: "all", label: "All" },
                                ...(pharmacies.map((pharmacy: PharmacyCardProps, index: number) => ({
                                    value: pharmacy.pharmacy_id, label: pharmacy.pharmacy_name
                                })))
                            ]}
                            placeholder="Select Pharmacy"
                        />

                        <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                    </Form>
                </Formik>
            </div>
    </Modal>
    )
}

export default AddNewQuestionModal