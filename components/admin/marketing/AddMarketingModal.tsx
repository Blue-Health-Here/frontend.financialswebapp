import React from 'react'
import { useDispatch } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import RadioField from "@/components/common/form/RadioField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import FileUploadField from "@/components/common/form/FileUploadField";
import { setIsAddMarketing } from '@/store/features/admin/marketing/adminMarketingSlice';
const AddMarketingModal = () => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddMarketing(false));
    };

    return (
        <Modal>
            <div className="bg-white w-96 h-full">
                <HeaderModal title="Add New Marketing Material" onClose={handleClose} />
                <div className="p-6">
                    <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Marketing Material Title" className="placeholder:text-themeLight" name="name" placeholder="Enter Question" />
                            <InputField label="Marketing Material Description" className="placeholder:text-themeLight" name="description" placeholder="Enter Description" />
                            <SelectField
                                label="Pharmacy"
                                name="pharmacy"
                                options={[
                                    { value: "Pharmacy1", label: "Pharmacy1" },
                                    { value: "Pharmacy2", label: "Pharmacy2" },
                                ]}
                            />
                            <RadioField
                                label=""
                                name="uploadType"
                                options={[
                                    { value: "link", label: "Link" },
                                    { value: "uploadFile", label: "Upload File" },
                                ]}
                            />
                            <InputField label="Add Link" className="placeholder:text-themeLight" name="link" placeholder="Enter Link" />
                            <FileUploadField title="Upload" name="file" />

                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    )
}

export default AddMarketingModal