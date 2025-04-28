import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/common/Modal";
import { Formik, Form } from "formik";
import InputField from "@/components/common/form/InputField";
import MultiSelectField from "@/components/common/form/MultiSelectField";
import RadioField from "@/components/common/form/RadioField";
import HeaderModal from "@/components/common/HeaderModal";
import { SubmitButton } from "@/components/submit-button";
import FileUploadField from "@/components/common/form/FileUploadField";
import { setIsAddMarketing } from '@/store/features/admin/marketing/adminMarketingSlice';
import { createNewMarketingMaterials, updateMarketingMaterials, postMarketingUploadFile, fetchAllPharmacies } from '@/services/adminServices';
import { addNewMarketingMaterialsInitialVals } from '@/utils/initialVals';
import { addNewMarketingMaterialsValidationSchema } from "@/utils/validationSchema";
import { RootState } from "@/store/store";
import { UploadedFileProps } from "@/utils/types";
import toast from 'react-hot-toast';

const AddMarketingModal = () => {
    const [initialVals, setInitialVals] = useState<any>(addNewMarketingMaterialsInitialVals);
    const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
    const { marketingMaterialsDetails } = useSelector((state: RootState) => state.marketing);
    const [uploadedFile, setUploadedFile] = useState<UploadedFileProps | null>(null);
    const dispatch = useDispatch();
    const isFetchedPharmacies = useRef(false);

    const handleClose = () => {
        dispatch(setIsAddMarketing(false));
    };

    useEffect(() => {
        if (!isFetchedPharmacies.current) {
            fetchAllPharmacies(dispatch);
            isFetchedPharmacies.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (marketingMaterialsDetails) {
            setInitialVals({
                marketing_id: marketingMaterialsDetails.marketing_id,
                title: marketingMaterialsDetails.title,
                description: marketingMaterialsDetails.description,
                uploadType: marketingMaterialsDetails.link ? 1 : 2,
                pharmacy_ids: marketingMaterialsDetails.pharmacy_ids,
                ...(marketingMaterialsDetails.link ? { link: marketingMaterialsDetails.link } : {}),
                file: marketingMaterialsDetails.file_url
                    ? { file_url: marketingMaterialsDetails.file_url, filename: marketingMaterialsDetails.filename, path: "" }
                    : null,
            });
    
            setUploadedFile(marketingMaterialsDetails.file_url ? {
                file_url: marketingMaterialsDetails.file_url,
                filename: marketingMaterialsDetails.filename,
                path: ""
            } : null);
        } else {
            setInitialVals(addNewMarketingMaterialsInitialVals);
            setUploadedFile(null);
        }
    }, []);

    const handleFileUpload = async (event: any, setValue: (value: any) => void) => {
        try {
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            const response = await postMarketingUploadFile(dispatch, formData);

            if (response?.success) {
                setUploadedFile(response.data);
                setValue(response.data); // Set Formik field with uploaded file
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    const handleSubmit = async (values: typeof addNewMarketingMaterialsInitialVals) => {
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
            if (marketingMaterialsDetails) {
                await updateMarketingMaterials(dispatch, { marketing_id: marketingMaterialsDetails?.marketing_id, ...payload });
            } else {
                await createNewMarketingMaterials(dispatch, payload);
            }
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title={`${marketingMaterialsDetails ? "Edit" : "Add New"} Marketing Material`} onClose={handleClose} />
                <div className="p-4 sm:p-6">
                    <Formik 
                        initialValues={initialVals} 
                        validationSchema={addNewMarketingMaterialsValidationSchema}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="flex flex-col gap-y-4">
                                <InputField label="Marketing Material Title" className="placeholder:text-themeLight" name="title" placeholder="Enter Title" />
                                <InputField label="Marketing Material Description" className="placeholder:text-themeLight" name="description" placeholder="Enter Description" />
                                <MultiSelectField
                                    label="Pharmacy"
                                    name="pharmacy_ids"
                                    isMulti
                                    options={[
                                        { value: "all", label: "All" },
                                        ...pharmacies.map((pharmacy: any) => ({
                                            value: pharmacy.pharmacy_id,
                                            label: pharmacy.pharmacy_name
                                        }))
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
                                        module="marketing"
                                        name="file"
                                        title="Upload"
                                        uploadedFile={uploadedFile}
                                        setUploadedFile={setUploadedFile}
                                        handleFileUpload={(e) => handleFileUpload(e, (file) => setFieldValue("file", file))}
                                    />
                                )}
                                <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">
                                    {marketingMaterialsDetails ? "Update" : "Save"}
                                </SubmitButton>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
};

export default AddMarketingModal;
