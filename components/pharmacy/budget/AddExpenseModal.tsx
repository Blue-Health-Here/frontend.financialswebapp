import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddExpense } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import MultiDateField from "@/components/common/form/MultiDateField";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Label } from "@/components/ui/label";
import { addNewPharmacyExpenseInitialVals } from "@/utils/initialVals";
import { addNewPharmacyExpenseValidationSchema } from "@/utils/validationSchema";
import toast from "react-hot-toast";
import { createNewPharmacyExpense, updatePharmacyExpense } from "@/services/pharmacyService";
import { RootState } from "@/store/store";

const AddExpenseModal = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
        const [initialVals, setInitialVals] = useState<any>(addNewPharmacyExpenseInitialVals);
            const { expenseDetails } = useSelector((state: RootState) => state.pharmacyExpense);
        
        const expenseCategories = [
            {
                id: "c716df4e-0cdf-491d-9725-2e6bef304e63",
                name: "tech",
                category_type: "expense"
            }]
    
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddExpense(false));
    };
    const handleRemoveDate = (dateToRemove: string) => {
        setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
    };
    
   
    

        useEffect(() => {
            if (expenseDetails) {   
                
        const expenseDateArray = expenseDetails.expense_date
        ? [expenseDetails.expense_date]
        : [];    
                setInitialVals({
                    title: expenseDetails.title,
                    amount: expenseDetails.amount,
                    expense_date: expenseDateArray,
                    category_id: expenseDetails?.category_id,
                    revenue:expenseDetails?.revenue,
                    expense_id:expenseDetails.id
                    
                });
                setSelectedDates(expenseDetails.expense_date ? [expenseDetails.expense_date] : []);
            } 
        }, [expenseDetails]);


  const handleSubmit = async (values: typeof addNewPharmacyExpenseInitialVals) => {
    const formattedExpenseDate = values.expense_date.length > 0 
    ? new Date(values.expense_date[0]).toISOString().split("T")[0] 
    : null;
          const payload: any = {
              title: values.title,
              amount: values.amount,
              expense_date: formattedExpenseDate,
              category_id: values.category_id,
              revenue:values.revenue
          };
  
          try {
              console.log("Submitting Payload:", payload);
              if (expenseDetails) {
                  await updatePharmacyExpense(dispatch, { expense_id: expenseDetails?.id, ...payload });
              } else {
                  await createNewPharmacyExpense(dispatch, payload);
                  console.log("Expense created successfully!");
              }
              handleClose();
          } catch (error: any) {
              toast.error(error?.message || "Something went wrong!!");
          }
      };
      
      const handleDateChange = (dates: string[]) => {
        setSelectedDates(dates);
        setInitialVals((prev: any) => ({
            ...prev,
            expense_date: dates, 
        }));
    };

    return (
        <Modal>
            <div className="bg-white sm:w-96 h-full">
                <HeaderModal title={`${expenseDetails ? "Edit" : "Add New"} Expense`} onClose={handleClose} />
                <div className="p-6">
                    <Formik   
                     initialValues={initialVals} 
                     validationSchema={addNewPharmacyExpenseValidationSchema}
                     enableReinitialize={true}
                     onSubmit={handleSubmit}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Expense Title" className="placeholder:text-themeLight placeholder:text-xs" name="title" placeholder="Enter Expense" />
                            <InputField label="Expense Revenue" className="placeholder:text-themeLight placeholder:text-xs" name="revenue" placeholder="Enter Revenue" />
                            <InputField label="Expense Amount" className="placeholder:text-themeLight placeholder:text-xs" name="amount" placeholder="Enter Amount" />
                            <SelectField
                                label="Expense Category"
                                name="category_id"
                                options={[
                                    { value: "select expense", label: "select expense" },
                                    ...expenseCategories.map((category) => ({
                                        value: category.id,
                                        label: category.name,
                                    })),
                                ]}
                            />
                            <MultiDateField label="Key Follow-up dates" name="expense_date" onDateChange={handleDateChange}/>
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
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">{expenseDetails ? "Update" : "Save"}</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddExpenseModal;