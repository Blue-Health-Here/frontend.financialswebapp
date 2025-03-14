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
import MultiSelectField from "@/components/common/form/MultiSelectField";

const AddCourseModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddCourse(false));
    };

    return (
        <Modal>
            <div className="bg-white w-96 h-full">
                <HeaderModal title="Add New Course" onClose={handleClose} />
                <div className="p-6">
                    <Formik 
                        initialValues={{
                            title: "",
                            description: "",
                            pharmacy_ids: [],
                            uploadType: "",
                            link: "",
                            file: ""
                        }} 
                        onSubmit={() => { }}
                    >
                        {({ values }) => {
                            return (
                                <Form className="flex flex-col gap-y-4">
                                    <InputField label="Course Title" className="placeholder:text-themeLight" name="title" placeholder="Enter Question" />
                                    <InputField label="Course Description" className="placeholder:text-themeLight" name="description" placeholder="Enter Description" />
                                    <MultiSelectField
                                        label="Pharmacy"
                                        name="pharmacy_ids"
                                        isMulti
                                        options={[
                                            { value: "all", label: "All" },
                                            { value: 1, label: "Pharmacy 1" },
                                            { value: 2, label: "Pharmacy 2" },
                                            { value: 3, label: "Pharmacy 3" },
                                        ]}
                                        placeholder="Select Pharmacy"
                                    />
                                    <RadioField
                                        label=""
                                        name="uploadType"
                                        options={[
                                            { value: "link", label: "Link" },
                                            { value: "uploadFile", label: "Upload File" },
                                        ]}
                                    />
                                    {values.uploadType === "link" ? (
                                        <InputField label="Add Link" className="placeholder:text-themeLight" name="link" placeholder="Enter Link" />
                                    ) : (
                                        <FileUploadField title="Upload" name="file" id="" />
                                    )}
                                    <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddCourseModal;
