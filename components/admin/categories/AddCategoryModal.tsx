import { useDispatch } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";

import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { setIsAddCategory } from "@/store/features/admin/category/adminCategorySlice";
import { useEffect, useState } from "react";
import { addNewCategoryInitialVals } from "@/utils/initialVals";
import { addNewCategoryValidationSchema } from "@/utils/validationSchema";
import { createNewCategory} from "@/services/adminServices";
import toast from "react-hot-toast";

interface AddCategoryModalProps {
    categoryType: string;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ categoryType }) => {
    const [initialVals, setInitialVals] = useState<any>(addNewCategoryInitialVals);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setIsAddCategory(false));
    }

    useEffect(() => {   
        setInitialVals({
            ...addNewCategoryInitialVals, 
            category_type: categoryType
        });
    },  []);

    const handleSubmit = async (values: typeof addNewCategoryInitialVals) => {
        const payload = {
            name: values.name,
            category_type: values.category_type
        };
        try {
            await createNewCategory(dispatch, {...payload});
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title="Add New Category" onClose={handleClose} />
                <div className="p-6">
                    <Formik 
                         initialValues={initialVals} 
                         validationSchema={addNewCategoryValidationSchema}
                         onSubmit={handleSubmit}
                         validateOnMount={true}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Category Name" className="placeholder:text-themeLight" name="name" placeholder="Enter Category" />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddCategoryModal;
