import { useDispatch, useSelector } from "react-redux";
import { setIsAddCourse } from "@/store/features/admin/course/adminCourseSlice";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import RadioField from "@/components/common/form/RadioField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import FileUploadField from "@/components/common/form/FileUploadField";
import MultiSelectField from "@/components/common/form/MultiSelectField";
import { addNewCourseInitialVals } from "@/utils/initialVals";
import { addNewCourseValidationSchema } from "@/utils/validationSchema";
import { useEffect, useState } from "react";
import { createNewCourse, fetchAllPharmacies } from "@/services/adminServices";
import { RootState } from "@/store/store";
import { PharmacyCardProps } from "@/utils/types";
import toast from "react-hot-toast";

const AddCourseModal = () => {
    const [initialVals, setInitialVals] = useState(addNewCourseInitialVals)
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddCourse(false));
    };

    useEffect(() => {
        fetchAllPharmacies(dispatch);
    }, []);

    const handleSubmit = async (values: typeof addNewCourseInitialVals) => {
        const payload: any = {
            title: values.title,
            description: values.description,
        };

        if (values.pharmacy_ids[0] === "all") {
            payload.is_all = true;
            payload.pharmacy_ids = null;
        } else {
            payload.is_all = false;
            payload.pharmacy_ids = values.pharmacy_ids;
        }
    
        if (values.uploadType == 1) {
            payload.link = values.link;
            payload.file = null;
        } else if (values.uploadType == 2) {
            payload.link = null;
            payload.file = values.file;
        }

        try {
            console.log("Submitting Payload:", payload);
            await createNewCourse(dispatch, payload);
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };
    
    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title="Add New Course" onClose={handleClose} />
                <div className="p-4 sm:p-6">
                    <Formik 
                        initialValues={initialVals} 
                        validationSchema={addNewCourseValidationSchema}
                        onSubmit={handleSubmit}
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
                                            ...(pharmacies.map((pharmacy: PharmacyCardProps, index: number) => ({ 
                                                value: pharmacy.pharmacy_id, label: pharmacy.pharmacy_name 
                                            })))
                                        ]}
                                        placeholder="Select Pharmacy"
                                    />
                                    <RadioField
                                        label=""
                                        name="uploadType"
                                        options={[
                                            { value: 1, label: "Link" },
                                            { value: 2, label: "Upload File" },
                                        ]}
                                    />
                                    {values.uploadType == 1 ? (
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
