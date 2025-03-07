import { useDispatch } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddExpense } from "@/store/features/expense/expenseSlice";

const AddExpenseModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddExpense(false));
    };

    return (
        <Modal>
            <div className="bg-white w-96 h-full">
                <HeaderModal title="Add New Expense" onClose={handleClose} />
                <div className="p-6">
                    <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Expense Title" className="placeholder:text-themeLight" name="title" placeholder="Enter Expense" />
                            <SelectField
                                label="Expense Category"
                                name="category"
                                options={[
                                    { value: "Utilities", label: "Utilities" },
                                    { value: "On-boarding", label: "On Boarding" },
                                ]}
                            />
                            <InputField label="Date" className="placeholder:text-themeLight block" name="date" type="date" />
                            <InputField label="Expense Amount" className="placeholder:text-themeLight" name="amount" placeholder="Enter Amount" />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddExpenseModal;