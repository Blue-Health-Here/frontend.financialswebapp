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
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { RxCross2 } from "react-icons/rx";
import FileUploadField from "@/components/common/form/FileUploadField";
import { AssignChecklistProps, OperationalItemsProps, PharmacyCardProps, UploadedFileProps } from "@/utils/types";
import MultiSelectField from "@/components/common/form/MultiSelectField";
import { RootState } from "@/store/store";
import { postAssignChecklistUploadDocs } from "@/services/adminServices";
import { MdDone } from "react-icons/md";
import { createNewAssignChecklist, createNewOperationalItem, fetchAllOperationalItems } from "@/services/adminServices";
import { AssignChecklistInitialVals } from "@/utils/initialVals";
import toast from "react-hot-toast";
import { AssignChecklistValidationSchema } from "@/utils/validationSchema";

const AddNewQuestionModal = () => {
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const { operationalItems } = useSelector((state: RootState) => state.checklist);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null);
    const [initialVals, setInitialVals] = useState<any>(AssignChecklistInitialVals);
    const [itemName, setItemName] = useState("");
    const [addItems, setAddItems] = useState(false)
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const isFetchedOperations = useRef(false);
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

    const handleFileUploadDocs = async (event: any, setValue: (value: any) => void) => {
        try {
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            const response = await postAssignChecklistUploadDocs(dispatch, formData);

            if (response) {
                setUploadedFile(response);
                console.log(response);
                setValue(response); // Set Formik field with uploaded file
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    const handleAddItem = (name: string) => {
        if (itemName.trim()) {
            createNewOperationalItem(dispatch, name)
        }
    }
    const resetItemField = () => {
        setItemName("");
        setAddItems(false);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    useEffect(() => {
        if (!isFetchedOperations.current) {
            fetchAllOperationalItems(dispatch);
            isFetchedOperations.current = true;
        }
    }, []);
    
    const handleSubmit = async (values: AssignChecklistProps) => {
        const payload: any = {
            checklist_id: values.checklist_id,
            question: values.question,
            note: values.note,
            action_item: values.action_item,
            filename: values.filename,
            file_url: values.file_url,
            path: values.path,
            operational_item: values.operational_item,
            follow_up_dates: values.follow_up_dates, 
            pharmacy_ids: values.pharmacy_ids,       
          };
          if (values.pharmacy_ids[0] === "all") {
            payload.is_all = true;
        } else {
            payload.pharmacy_ids = values.pharmacy_ids;
        }

        try {
            await createNewAssignChecklist(dispatch, payload);
            console.log("payload", payload)
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };


    return (
        <Modal>
            <HeaderModal title="Add Question" onClose={handleClose} />
            <div className="p-6">
                <Formik initialValues={initialVals}
                    onSubmit={handleSubmit}
                    validationSchema={AssignChecklistValidationSchema}
                >
                    <Form className="flex flex-col gap-y-4">
                        <TextareaField label="Question" className="placeholder:text-themeLight" name="question" />
                        <TextareaField label="Note" name="note" />
                        <InputField label="Action Items" className="placeholder:text-themeLight" name="action_item" />
                        <FileUploadField
                            label="Upload File"
                            module="checklist"
                            name="file"
                            title="Upload"
                            uploadedFile={uploadedFile}
                            setUploadedFile={setUploadedFile}
                            handleFileUpload={(e, setValue) => handleFileUploadDocs(e, setValue)}
                        />
                        <div>
                            <SelectField
                                label="Operational Item"
                                name="operational_item"
                                options={[
                                    ...(operationalItems.map((item: OperationalItemsProps, index: number) => ({
                                        value: item.id, label: item.name
                                    })))
                                ]}
                                placeholder="Select operational item"
                            />
                            <p className="text-primary w-max ml-auto mt-2 font-semibold text-right text-xs sm:text-sm cursor-pointer" onClick={() => setAddItems(true)}>
                                +Add New Item
                            </p>
                            {addItems && (
                                <div className="flex gap-x-4 mt-2 justify-normal md:justify-between">
                                    <input
                                        ref={inputRef}
                                        placeholder="Add Item Name"
                                        className="h-10 w-full rounded-md border border-input focus:outline-none bg-background px-3 py-2 !text-xs placeholder:text-themeLight min-full sm:min-w-[275px]"
                                        type="text"
                                        onChange={(e) => setItemName(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={resetItemField}
                                    >
                                        <RxCross2 className="text-red-500 hover:text-red-400" size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleAddItem(itemName)}
                                    >
                                        <MdDone className="text-green-600 hover:text-secondary" size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <MultiDateField label="Key Follow-up dates" name="follow_up_dates" />
                        {selectedDates.length > 0 && (
                            <div>
                                <Label size="xs">Selected Dates(s)</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    {selectedDates.map((date, index) => (
                                        <div key={index} className="flex gap-x-2">
                                            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
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