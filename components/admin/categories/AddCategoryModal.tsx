import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";

import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddCategory } from "@/store/features/admin/category/adminCategorySlice";
import { useEffect, useState } from "react";
import { addNewCategoryInitialVals } from "@/utils/initialVals";
import { addNewCategoryValidationSchema } from "@/utils/validationSchema";
import { createNewCategory, updateCategory } from "@/services/adminServices";
import toast from "react-hot-toast";
import { RootState } from "@/store/store";

interface AddCategoryModalProps {
    categoryType: string;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ categoryType }) => {
    const [initialVals, setInitialVals] = useState<any>(addNewCategoryInitialVals);
    const {categoryDetails} = useSelector((state: RootState) => state.category);
    const dispatch = useDispatch();
    
    const handleClose = () => dispatch(setIsAddCategory(false));

    useEffect(() => {   
        if (categoryDetails) setInitialVals({ name: categoryDetails.name });
    },  []);

    const handleSubmit = async (values: typeof addNewCategoryInitialVals) => {
        const payload = {
            name: values.name,
            category_type: categoryType
        };
        try {
            if (categoryDetails) {
                await updateCategory(dispatch, { category_id: categoryDetails.id, ...payload });
            } else {
                await createNewCategory(dispatch, payload);
            }
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title={`${categoryDetails ? "Edit" : "Add New"} Category`} onClose={handleClose} />
                <div className="p-6">
                    <Formik 
                        initialValues={initialVals} 
                        validationSchema={addNewCategoryValidationSchema}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                        validateOnMount={true}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Category Name" className="placeholder:text-themeLight" name="name" placeholder="Enter Category" />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">{categoryDetails ? "Update" : "Save"}</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddCategoryModal;
