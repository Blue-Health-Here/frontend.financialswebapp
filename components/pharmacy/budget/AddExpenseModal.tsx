import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddExpense } from "@/store/features/pharmacy/expense/pharmacyExpenseSlice";
import { useEffect, useState } from "react";
import { addNewPharmacyExpenseInitialVals } from "@/utils/initialVals";
import { addNewPharmacyExpenseValidationSchema } from "@/utils/validationSchema";
import toast from "react-hot-toast";
import { createNewPharmacyExpense, updatePharmacyExpense } from "@/services/pharmacyServices";
import { RootState } from "@/store/store";
import SingleDateField from "@/components/common/form/SingleDateField";
import { fetchExpenseCategories } from "@/services/globalService";

const AddExpenseModal = () => {
    const [initialVals, setInitialVals] = useState<any>(addNewPharmacyExpenseInitialVals);
    const { expenseDetails } = useSelector((state: RootState) => state.pharmacyExpense);
    const { expenseCategories } = useSelector((state: RootState) => state.global);
    const dispatch = useDispatch() 
        
    useEffect(() => {
        fetchExpenseCategories(dispatch);
    }, [, dispatch]);
    
    const handleClose = () => {
        dispatch(setIsAddExpense(false));
    };
   
    

    useEffect(() => {
        if (expenseDetails) {
          setInitialVals({
            title: expenseDetails.title,
            amount: expenseDetails.amount,
            expense_date: expenseDetails.expense_date,
            category_id: expenseDetails.category_id,
            revenue: expenseDetails.revenue,
            expense_id: expenseDetails.id,
          });
        }
      }, [expenseDetails]);      


  const handleSubmit = async (values: typeof addNewPharmacyExpenseInitialVals) => {

          const payload: any = {
              title: values.title,
              amount: values.amount,
              expense_date: values.expense_date,
              category_id: values.category_id,
              revenue:values.revenue
          };
  
          try {
              if (expenseDetails) {
                  await updatePharmacyExpense(dispatch, { expense_id: expenseDetails?.id, ...payload });
              } else {
                  await createNewPharmacyExpense(dispatch, payload);
              }
              handleClose();
          } catch (error: any) {
              toast.error(error?.message || "Something went wrong!!");
          }
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
                                    ...expenseCategories?.map((category:any) => ({
                                        value: category.id,
                                        label: category.name,
                                    })),
                                ]}
                            />
                            <SingleDateField
                                label="Select a Date"
                                name="expense_date"
                                className="mb-4"
                                
                            />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">{expenseDetails ? "Update" : "Save"}</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddExpenseModal;