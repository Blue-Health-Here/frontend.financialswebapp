import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import SelectField from "@/components/common/form/SelectField";
import TextareaField from "@/components/common/form/TextareaField";
import MultiDateField from "@/components/common/form/MultiDateField";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { RxCross2 } from "react-icons/rx";
import FileUploadField from "@/components/common/form/FileUploadField";
import { ChecklistOverviewProps, EditAssignTaskModalProps, OperationalItemsProps, UploadedFileProps } from "@/utils/types";
import { RootState } from "@/store/store";
import { postAssignChecklistUploadDocs, updateChecklistOverview } from "@/services/adminServices";
import { MdDone } from "react-icons/md";
import { createNewOperationalItem, fetchAllOperationalItems } from "@/services/adminServices";
import { ChecklistOverviewInitialVals } from "@/utils/initialVals";
import toast from "react-hot-toast";
import { assignChecklistValidationSchema } from "@/utils/validationSchema";
import { setIsAddQuestion } from "@/store/features/admin/pharmacy/adminPharmacySlice";


const AddNewQuestionModal: React.FC<EditAssignTaskModalProps> = ({ selectedType, pharmacyId }) => {
    const { selectedChecklistItem } = useSelector((state: RootState) => state.pharmacy);
    const { operationalItems } = useSelector((state: RootState) => state.checklist);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null);
    const [initialVals, setInitialVals] = useState<any>(ChecklistOverviewInitialVals);
    const [itemName, setItemName] = useState("");
    const [addItems, setAddItems] = useState(false)
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const isFetchedOperations = useRef(false);
    const handleClose = () => {
        dispatch(setIsAddQuestion(false));
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
        if (!isFetchedOperations.current && selectedType === "operations") {
            fetchAllOperationalItems(dispatch);
            isFetchedOperations.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (selectedChecklistItem) {
            const newFollowUpDates = selectedChecklistItem.follow_up_dates || [];
            setInitialVals({
                question: selectedChecklistItem.question,
                note: selectedChecklistItem.note,
                action_item: selectedChecklistItem.action_item,
                follow_up_dates: newFollowUpDates,
                pharmacy_comments: selectedChecklistItem?.pharmacy_comments,
                status: selectedChecklistItem?.status,
                ...(selectedType === "operations" && { operational_item: selectedChecklistItem.operational_item || "" })
            });
            setSelectedDates(newFollowUpDates);
            if (selectedChecklistItem?.file_url && selectedChecklistItem?.filename) {
                setUploadedFile({ file_url: selectedChecklistItem?.file_url, filename: selectedChecklistItem?.filename, path: selectedChecklistItem?.path });
            }
        } else {
            setInitialVals(ChecklistOverviewInitialVals);
        }
    }, [selectedChecklistItem, selectedType]);

    const handleSubmit = async (values: ChecklistOverviewProps) => {
        let payload: any = {
            pharmacy_comments: values.pharmacy_comments,
            status: values.status
        };

        try {
            if (selectedChecklistItem) {
                await updateChecklistOverview(dispatch, { assigned_id: selectedChecklistItem.assigned_id, ...payload }, pharmacyId);
            }
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Failed to save question");
        }
    };


    return (
        <Modal>
            <HeaderModal title={`${selectedChecklistItem ? "Edit" : "Add New"} Question`} onClose={handleClose} />
            <div className="p-6">
                <Formik
                    enableReinitialize={true}
                    initialValues={initialVals}
                    onSubmit={handleSubmit}
                    validationSchema={assignChecklistValidationSchema(selectedType || "")}
                >
                    <Form className="flex flex-col gap-y-4">
                        <TextareaField label="Question" className="placeholder:text-themeLight" name="question" disabled={true} />
                        <TextareaField label="Pharmacy comments" className="placeholder:text-themeLight" name="pharmacy_comments" />
                        <TextareaField label="Note" name="note" disabled={true} />
                        <InputField label="Action Items" className="placeholder:text-themeLight" name="action_item" disabled={true} />
                        <FileUploadField
                            label="Upload File"
                            module="checklist"
                            name="file"
                            title="Upload"
                            uploadedFile={uploadedFile}
                            setUploadedFile={setUploadedFile}
                            handleFileUpload={(e, setValue) => handleFileUploadDocs(e, setValue)}
                            disabled={true}
                        />
                        {selectedType === "operations" &&
                            (<div>
                                <SelectField
                                    label="Operational Item"
                                    name="operational_item"
                                    isDisabled={true}
                                    options={[
                                        ...(operationalItems.map((item: OperationalItemsProps, index: number) => ({
                                            value: item.name, label: item.name
                                        })))
                                    ]}
                                    placeholder="Select operational item"
                                />
                                <button
                                    disabled
                                    className="text-primary w-max ml-auto mt-2 font-semibold text-right text-xs sm:text-sm cursor-not-allowed flex justify-end items-end" onClick={() => setAddItems(true)}>
                                    +Add New Item
                                </button>
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
                            )}
                        <MultiDateField label="Key Follow-up dates" name="follow_up_dates" disabled={true} />
                        {selectedDates.length > 0 && (
                            <div>
                                <Label size="xs">Selected Dates(s)</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    {selectedDates.map((date, index) => (
                                        <div key={index} className="flex gap-x-2">
                                            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm cursor-not-allowed">
                                                <span>{date}</span>
                                            </div>
                                            <button disabled onClick={() => handleRemoveDate(date)}><RxCross2 size={15} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <SelectField
                            label="Status"
                            name="status"
                            options={[
                                { value: "inprogress", label: "Inprogress" },
                                { value: "todo", label: "Todo" },
                                { value: "pending", label: "Pending" },
                            ]}
                        />

                        <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">{selectedChecklistItem ? "Update" : "Save"}</SubmitButton>
                    </Form>
                </Formik>
            </div>
        </Modal>
    )
}

export default AddNewQuestionModal