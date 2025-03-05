import { useDispatch } from "react-redux";
import { setIsAddCourse } from "@/store/features/course/courseSlice";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import RadioField from "@/components/common/form/RadioField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import { MdOutlineFileUpload } from "react-icons/md";

const AddCourseModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddCourse(false));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <Modal>
                <div className="bg-white w-96 rounded-lg h-full">
                    <HeaderModal title="Add New Course" onClose={handleClose} />
                    <div className="p-6">
                        <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                            <Form className="flex flex-col gap-y-4">
                                <InputField label="Course Title" className="placeholder:text-themeLight" name="name" placeholder="Enter Question" />
                                <InputField label="Course Description" className="placeholder:text-themeLight" name="description" placeholder="Enter Description" />
                                <SelectField
                                    label="Pharmacy"
                                    name="pharmacy"
                                    options={[
                                        { value: "Pharmacy1", label: "Pharmacy1" },
                                        { value: "Pharmacy2", label: "Pharmacy2" },
                                    ]}
                                />
                                <div className="flex gap-x-6">
                                    <RadioField
                                        label=""
                                        name="uploadType"
                                        options={[
                                            { value: "link", label: "Link" },
                                        ]}
                                    /> <RadioField
                                        label=""
                                        name="uploadType"
                                        options={[
                                            { value: "uploadFile", label: "Upload File" },
                                        ]}
                                    />
                                </div>
                                <InputField label="Add Link" className="placeholder:text-themeLight" name="link" placeholder="Enter Link" />

                                <SubmitButton type="button" className="relative p-0 text-primary bg-white hover:bg-white border border-secondary">
                                    <input type="file" name="" className="absolute left-0 right-0 top-0 bottom-0 opacity-0" />
                                    <MdOutlineFileUpload className="w-5 h-5 text-primary" /> <p className="ml-2">Upload</p>
                                </SubmitButton>

                                <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddCourseModal;
