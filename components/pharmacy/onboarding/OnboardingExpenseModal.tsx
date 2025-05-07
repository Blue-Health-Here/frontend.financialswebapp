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
import { AssignChecklistProps, ChecklistOverviewProps, ChecklistProps, EditAssignTaskModalProps, OperationalItemsProps, PharmacyCardProps, UploadedFileProps } from "@/utils/types";
import MultiSelectField from "@/components/common/form/MultiSelectField";
import { RootState } from "@/store/store";
import { postAssignChecklistUploadDocs, updateAssignChecklist, updateChecklistOverview } from "@/services/adminServices";
import { MdDone } from "react-icons/md";
import { createNewAssignChecklist, createNewOperationalItem, fetchAllOperationalItems } from "@/services/adminServices";
import { AssignChecklistInitialVals, ChecklistOverviewInitialVals } from "@/utils/initialVals";
import toast from "react-hot-toast";
import { assignChecklistValidationSchema, updatePharmacyChecklistValidationSchema } from "@/utils/validationSchema";
import { updatePharmacyAssignChecklist } from "@/services/pharmacyServices";
import { setIsAddQuestion } from "@/store/features/global/globalSlice";



const OnboardingExpenseModal: React.FC<EditAssignTaskModalProps> = ({
    selectedType,
    pharmacyId,
    isOnboardingMode = false
}) => {
    const dispatch = useDispatch();
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const { operationalItems, tasklistDetails, checklists } = useSelector((state: RootState) => state.checklist);
    const { selectedChecklistItem } = useSelector((state: RootState) => state.global);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null);
    const [initialVals, setInitialVals] = useState<any>(isOnboardingMode ? ChecklistOverviewInitialVals : AssignChecklistInitialVals);
    const [itemName, setItemName] = useState("");
    const [addItems, setAddItems] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const isFetchedOperations = useRef(false);

    // Get the appropriate data source based on the mode
    const dataSource = isOnboardingMode ? selectedChecklistItem : tasklistDetails;

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
            createNewOperationalItem(dispatch, name);
        }
    };

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
    }, [dispatch, selectedType]);

    // Initialize form values based on mode
    useEffect(() => {
        if (isOnboardingMode && selectedChecklistItem) {
            const newFollowUpDates = selectedChecklistItem.follow_up_dates || [];
            setInitialVals({
                question: selectedChecklistItem.question,
                note: selectedChecklistItem.note,
                action_item: selectedChecklistItem.action_item,
                follow_up_dates: newFollowUpDates,
                pharmacy_comments: selectedChecklistItem?.pharmacy_comments || "",
                status: selectedChecklistItem?.status || "todo",
                ...(selectedType === "operations" && { operational_item: selectedChecklistItem.operational_item || "" })
            });
            setSelectedDates(newFollowUpDates);
            if (selectedChecklistItem?.file_url && selectedChecklistItem?.filename) {
                setUploadedFile({ file_url: selectedChecklistItem?.file_url, filename: selectedChecklistItem?.filename, path: selectedChecklistItem?.path });
            }
        } else if (!isOnboardingMode && tasklistDetails) {
            const newFollowUpDates = tasklistDetails.follow_up_dates || [];
            setInitialVals({
                checklist_id: tasklistDetails.checklist_id,
                question: tasklistDetails.question,
                note: tasklistDetails.note,
                action_item: tasklistDetails.action_item,
                follow_up_dates: newFollowUpDates,
                pharmacy_ids: tasklistDetails?.pharmacy_ids || [],
                ...(selectedType === "operations" && { operational_item: tasklistDetails.operational_item || "" })
            });
            setSelectedDates(newFollowUpDates);
            if (tasklistDetails?.file_url && tasklistDetails?.filename) {
                setUploadedFile({ file_url: tasklistDetails?.file_url, filename: tasklistDetails?.filename, path: tasklistDetails?.path });
            }
        } else {
            setInitialVals(isOnboardingMode ? ChecklistOverviewInitialVals : AssignChecklistInitialVals);
            setSelectedDates([]);
            setUploadedFile(null);
        }
    }, [isOnboardingMode, selectedChecklistItem, tasklistDetails, selectedType]);

    const handleSubmit = async (values: any) => {
        if (isOnboardingMode) {
            const payload: any = {
                pharmacy_comments: values.pharmacy_comments,
                status: values.status
            };

            try {
                if (selectedChecklistItem) {
                    if (selectedType) {
                        await updatePharmacyAssignChecklist(
                            dispatch,
                            {
                                assigned_id: selectedChecklistItem.assigned_id,
                                checklist_id: selectedChecklistItem.checklist_id,
                                ...payload
                            },
                            selectedType
                        );
                    }
                    if (pharmacyId) {
                        await updateChecklistOverview(
                            dispatch,
                            {
                                assigned_id: selectedChecklistItem.assigned_id,
                                ...payload
                            },
                            pharmacyId
                        );
                    }
                }
                handleClose();
            } catch (error: any) {
                toast.error(error?.message || "Failed to update question");
            }
        } else {
            let payload: any = {
                checklist_id: values.checklist_id,
                question: values.question,
                note: values.note,
                action_item: values.action_item,
                follow_up_dates: values.follow_up_dates,
            };

            if (selectedType === "operations") {
                payload = {
                    ...payload,
                    operational_item: values.operational_item
                };
            }

            if (values.pharmacy_ids && values.pharmacy_ids[0] === "all") {
                payload.is_all = true;
            } else {
                payload.pharmacy_ids = values.pharmacy_ids;
            }

            if (uploadedFile) {
                payload.filename = uploadedFile.filename;
                payload.file_url = uploadedFile.file_url;
                payload.path = uploadedFile.path;
            }

            try {
                if (tasklistDetails) {
                    await updateAssignChecklist(dispatch, { task_id: tasklistDetails.id, ...payload }, selectedType);
                } else {
                    await createNewAssignChecklist(dispatch, payload, selectedType);
                }
                handleClose();
            } catch (error: any) {
                toast.error(error?.message || "Failed to save question");
            }
        }
    };

    const validationSchema = isOnboardingMode
        ? updatePharmacyChecklistValidationSchema
        : assignChecklistValidationSchema(selectedType || "");

    return (
        <Modal>
            <HeaderModal
                title={`${dataSource ? "Edit" : "Add New"} Question`}
                onClose={handleClose}
            />
            <div className="p-6">
                <Formik
                    initialValues={initialVals}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                >
                    <Form className="flex flex-col gap-y-4">
                        {!isOnboardingMode && (
                            <SelectField
                                label="Checklist"
                                name="checklist_id"
                                options={[
                                    ...(checklists
                                        .filter((checklist: ChecklistProps) => checklist.checklist_type === selectedType)
                                        .map((checklist: ChecklistProps) => ({
                                            value: checklist.id,
                                            label: checklist.checklist_name,
                                        })))
                                ]}
                                placeholder="Select Checklist"
                            />
                        )}

                        <TextareaField
                            label="Question"
                            className="placeholder:text-themeLight"
                            name="question"
                            disabled={isOnboardingMode}
                        />

                        <TextareaField
                            label="Note"
                            name="note"
                            disabled={isOnboardingMode}
                        />

                        <InputField
                            label="Action Items"
                            className="placeholder:text-themeLight"
                            name="action_item"
                            disabled={isOnboardingMode}
                        />

                        <FileUploadField
                            label="Upload File"
                            module="checklist"
                            name="file"
                            title="Upload"
                            uploadedFile={uploadedFile}
                            setUploadedFile={setUploadedFile}
                            handleFileUpload={(e, setValue) => handleFileUploadDocs(e, setValue)}
                            disabled={isOnboardingMode}
                        />

                        {selectedType === "operations" && (
                            <div>
                                <SelectField
                                    label="Operational Item"
                                    name="operational_item"
                                    isDisabled={isOnboardingMode}
                                    options={[
                                        ...(operationalItems.map((item: OperationalItemsProps) => ({
                                            value: item.name,
                                            label: item.name
                                        })))
                                    ]}
                                    placeholder="Select operational item"
                                />

                                <p
                                    className={`text-primary w-max ml-auto mt-2 font-semibold text-right text-xs sm:text-sm ${isOnboardingMode ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    onClick={() => !isOnboardingMode && setAddItems(true)}
                                >
                                    +Add New Item
                                </p>

                                {addItems && !isOnboardingMode && (
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

                        <MultiDateField
                            label="Key Follow-up dates"
                            name="follow_up_dates"
                            disabled={isOnboardingMode}
                        />

                        {selectedDates.length > 0 && (
                            <div>
                                <Label size="xs">Selected Dates(s)</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    {selectedDates.map((date, index) => (
                                        <div key={index} className="flex gap-x-2">
                                            <div className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${isOnboardingMode ? 'cursor-not-allowed' : ''}`}>
                                                <span>{date}</span>
                                            </div>
                                            <button
                                                type="button"
                                                disabled={isOnboardingMode}
                                                onClick={() => !isOnboardingMode && handleRemoveDate(date)}
                                            >
                                                <RxCross2 size={15} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isOnboardingMode && (
                            <>
                                <TextareaField
                                    label="Pharmacy comments"
                                    className="placeholder:text-themeLight"
                                    name="pharmacy_comments"
                                />

                                <SelectField
                                    label="Status"
                                    name="status"
                                    options={[
                                        { value: "inprogress", label: "Inprogress" },
                                        { value: "todo", label: "Todo" },
                                        { value: "pending", label: "Pending" },
                                    ]}
                                />
                            </>
                        )}

                        {!isOnboardingMode && (
                            <MultiSelectField
                                label="Pharmacy"
                                name="pharmacy_ids"
                                isMulti
                                options={[
                                    { value: "all", label: "All" },
                                    ...(pharmacies.map((pharmacy: PharmacyCardProps) => ({
                                        value: pharmacy.pharmacy_id,
                                        label: pharmacy.pharmacy_name
                                    })))
                                ]}
                                placeholder="Select Pharmacy"
                            />
                        )}

                        <SubmitButton
                            type="submit"
                            className="text-primary hover:text-white bg-secondary"
                        >
                            {dataSource ? "Update" : "Save"}
                        </SubmitButton>
                    </Form>
                </Formik>
            </div>
        </Modal>
    );
};

export default OnboardingExpenseModal;