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
import { AddNewCourseFormValues, PharmacyCardProps, UploadedFileProps } from "@/utils/types";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import FilePreview from "@/components/common/FilePreview";

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
            // console.log(courseDetails, "courseDetails")
            setInitialVals({
                course_id: courseDetails?.course_id,
                title: courseDetails.title,
                description: courseDetails.description,
                uploadType: courseDetails?.link ? 1 : 2,
                pharmacy_ids: courseDetails?.pharmacy_ids,
                link: courseDetails.link,
                file: { file_url: courseDetails?.file_url, filename: courseDetails?.filename, path: "" }
            });
            setUploadedFile({ file_url: courseDetails?.file_url, filename: courseDetails?.filename, path: "" });
        } else {
            setInitialVals(addNewCourseInitialVals);
            setUploadedFile(null);
        }
        fetchAllPharmacies(dispatch);
    }, []);

    const handleFileUpload = async (event: any, setFieldValue: (field: string, value: any) => void) => {
        try {
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            const response = await postCoursesUploadFile(dispatch, formData);
            
            if (response?.success) {
                setUploadedFile(response.data);
                setFieldValue("file", response.data); // Set Formik field with uploaded file URL
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
                <HeaderModal title="Add New Course" onClose={handleClose} />
                <div className="p-4 sm:p-6">
                    <Formik 
                        initialValues={initialVals} 
                        validationSchema={addNewCourseValidationSchema}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, setFieldValue }) => {
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
                                        <div>
                                            {uploadedFile ? (
                                                <FilePreview file={{ name: uploadedFile.filename }} handleDelete={() => { 
                                                    setUploadedFile(null);
                                                    setFieldValue("file", ""); // Clear file field in Formik
                                                }} />
                                            ) : (
                                                <SubmitButton type="button" className="w-full relative p-0 text-primary bg-white hover:bg-white border border-secondary">
                                                    <input 
                                                        type="file" 
                                                        name="file" 
                                                        onChange={(event) => handleFileUpload(event, setFieldValue)} 
                                                        className="absolute left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer" 
                                                    />
                                                    <MdOutlineFileUpload className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                                    <p className="ml-2 text-xs md:text-sm">Upload</p>
                                                </SubmitButton>
                                            )}
                                            {errors?.file && <p className="text-red-500 text-xs mt-1 font-semibold">{errors?.file}</p>}
                                        </div>
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
