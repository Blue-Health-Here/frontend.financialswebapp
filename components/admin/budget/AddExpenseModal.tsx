import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { useEffect, useState } from "react";
import { addNewPharmacyExpenseInitialVals } from "@/utils/initialVals";
import { addNewPharmacyExpenseValidationSchema } from "@/utils/validationSchema";
import toast from "react-hot-toast";
import { RootState } from "@/store/store";
import SingleDateField from "@/components/common/form/SingleDateField";
import { createNewPharmacyExpense, updatePharmacyExpense } from "@/services/adminServices";
import { setIsAddExpense } from "@/store/features/admin/expense/adminExpenseSlice";
import { useParams } from "next/navigation";

const AddExpenseModal = () => {
    const params = useParams();
    const pharmacyId = params?.pharmacy_id;
    const [initialVals, setInitialVals] = useState<any>(addNewPharmacyExpenseInitialVals);
    const { expenseDetail } = useSelector((state: RootState) => state.expense);
        
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
   
    

    useEffect(() => {
        if (expenseDetail) {
          setInitialVals({
            title: expenseDetail.title,
            amount: expenseDetail.amount,
            expense_date: expenseDetail.expense_date,
            category_id: expenseDetail.category_id,
            revenue: expenseDetail.revenue,
            expense_id: expenseDetail.id,
            pharmacy_id:expenseDetail.pharmacy_id
          });
        }
      }, [expenseDetail]);      


  const handleSubmit = async (values: typeof addNewPharmacyExpenseInitialVals) => {

          const payload: any = {
              title: values.title,
              amount: values.amount,
              expense_date: values.expense_date,
              category_id: values.category_id,
              revenue:values.revenue,
              pharmacy_id: pharmacyId
          };
  
          try {
              if (expenseDetail) {
                  await updatePharmacyExpense(dispatch, { expense_id: expenseDetail?.id, ...payload });
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
                <HeaderModal title={`${expenseDetail ? "Edit" : "Add New"} Expense`} onClose={handleClose} />
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
                            <SingleDateField
                                label="Select a Date"
                                name="expense_date"
                                className="mb-4"
                                
                            />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">{expenseDetail ? "Update" : "Save"}</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddExpenseModal;