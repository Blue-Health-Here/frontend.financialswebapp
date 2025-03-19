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
import { createNewCourse, fetchAllPharmacies, postCoursesUploadFile, updateCourse } from "@/services/adminServices";
import { RootState } from "@/store/store";
import { PharmacyCardProps, UploadedFileProps } from "@/utils/types";
import toast from "react-hot-toast";

const AddCourseModal = () => {
    const [initialVals, setInitialVals] = useState<any>(addNewCourseInitialVals);
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const { courseDetails } = useSelector((state: RootState) => state.course);
    const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddCourse(false));
    };

    useEffect(() => {
        if (courseDetails) {
            // console.log(courseDetails, "courseDetails");
            setInitialVals({
                course_id: courseDetails?.course_id,
                title: courseDetails.title,
                description: courseDetails.description,
                uploadType: courseDetails?.link ? 1 : 2,
                pharmacy_ids: courseDetails?.pharmacy_ids,
                ...(courseDetails?.link ? ({ link: courseDetails?.link}) : ({ link: courseDetails?.link })),
                file: { file_url: courseDetails?.file_url, filename: courseDetails?.filename, path: "" }
            });
            if (courseDetails?.file_url && courseDetails?.filename) {
                setUploadedFile({ file_url: courseDetails?.file_url, filename: courseDetails?.filename, path: "" });
            } else {
                setUploadedFile(null);
            }
        } else {
            setInitialVals(addNewCourseInitialVals);
            setUploadedFile(null);
        }
        fetchAllPharmacies(dispatch);
    }, []);

    const handleFileUpload = async (event: any, setValue: (value: any) => void) => {
        try {
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            const response = await postCoursesUploadFile(dispatch, formData);
            
            if (response?.success) {
                setUploadedFile(response.data);
                setValue(response.data); // Set Formik field with uploaded file
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    const handleSubmit = async (values: typeof addNewCourseInitialVals) => {
        const payload: any = {
            title: values.title,
            description: values.description,
        };

        if (values.pharmacy_ids[0] === "all") {
            payload.is_all = true;
        } else {
            payload.pharmacy_ids = values.pharmacy_ids;
        }
    
        if (values.uploadType == 1) {
            payload.link = values.link;
        } else if (values.uploadType == 2) {
            payload.file_data = values.file;
        }

        try {
            console.log("Submitting Payload:", payload);
            if (courseDetails) {
                await updateCourse(dispatch, { course_id: courseDetails?.course_id, ...payload });
            } else {
                await createNewCourse(dispatch, payload);
            }
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };
    
    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title={`${courseDetails ? "Edit" : "Add New"} Course`} onClose={handleClose} />
                <div className="p-4 sm:p-6">
                    <Formik 
                        initialValues={initialVals} 
                        validationSchema={addNewCourseValidationSchema}
                        enableReinitialize={true}
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
                                        <FileUploadField
                                            name="file"
                                            title="Upload"
                                            uploadedFile={uploadedFile}
                                            setUploadedFile={setUploadedFile}
                                            handleFileUpload={(e, setValue) => handleFileUpload(e, setValue)}
                                        />
                                    )}
                                    <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">
                                        {courseDetails ? "Update" : "Save"}
                                    </SubmitButton>
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
