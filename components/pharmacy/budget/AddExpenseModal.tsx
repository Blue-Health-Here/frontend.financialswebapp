import { useDispatch } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddExpense } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import MultiDateField from "@/components/common/form/MultiDateField";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Label } from "@/components/ui/label";

const AddExpenseModal = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddExpense(false));
    };
    const handleRemoveDate = (dateToRemove: string) => {
        setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
    };
    return (
        <Modal>
            <div className="bg-white sm:w-96 h-full">
                <HeaderModal title="Add New Expense" onClose={handleClose} />
                <div className="p-6">
                    <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Expense Title" className="placeholder:text-themeLight placeholder:text-xs" name="title" placeholder="Enter Expense" />
                            <InputField label="Expense Revenue" className="placeholder:text-themeLight placeholder:text-xs" name="title" placeholder="Enter Revenue" />
                            <MultiDateField label="Key Follow-up dates" name="date" />
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
                            <InputField label="Expense Amount" className="placeholder:text-themeLight placeholder:text-xs" name="amount" placeholder="Enter Amount" />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddExpenseModal;