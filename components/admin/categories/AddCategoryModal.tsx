import { useDispatch } from "react-redux";
import { setIsAddCourse } from "@/store/features/admin/course/adminCourseSlice";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import RadioField from "@/components/common/form/RadioField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import FileUploadField from "@/components/common/form/FileUploadField";
import { setIsAddCategory } from "@/store/features/admin/category/adminCategorySlice";

const AddCategoryModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddCategory(false));
    };

    return (
        <Modal>
            <div className="bg-white w-96 h-full">
                <HeaderModal title="Add New Category" onClose={handleClose} />
                <div className="p-6">
                    <Formik initialValues={{ category: "" }} onSubmit={() => { }}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Category Name" className="placeholder:text-themeLight" name="category" placeholder="Enter Category" />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddCategoryModal;
