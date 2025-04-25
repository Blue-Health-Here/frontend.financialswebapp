import InputField from '@/components/common/form/InputField'
import SelectField from '@/components/common/form/SelectField'
import HeaderModal from '@/components/common/HeaderModal'
import Modal from '@/components/common/Modal'
import { SubmitButton } from '@/components/submit-button'
import { createNewChecklist } from '@/services/adminServices'
import { setIsAddChecklist } from '@/store/features/admin/checklist/adminChecklistSlice'
import { addNewChecklistValidationSchema } from '@/utils/validationSchema'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

interface AddNewChecklistModalProps {
    selectedType?: string;
}

const AddNewChecklistModal: React.FC<AddNewChecklistModalProps> = ({ selectedType }) => {
    const [initialVals, setInitialVals] = useState<any>({checklist_name: "",checklist_type: selectedType?.toLowerCase()});
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddChecklist(false));
    };

    const handleSubmit = async (values: {checklist_name: string, checklist_type: string}) => {
        const payload: any = {
            checklist_name: values.checklist_name,
            checklist_type: values.checklist_type
        }
        
        try {
            await createNewChecklist(dispatch, payload);
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title="Add New Checklist" onClose={(handleClose)} />
                <div className="p-6">
                    <Formik initialValues={initialVals}
                     validationSchema={addNewChecklistValidationSchema}
                     enableReinitialize={true}
                     onSubmit={handleSubmit}
                     >
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Name" className="placeholder:text-themeLight" name="checklist_name" placeholder="Enter Name" lableColor='text-black' />
                            <SelectField
                                label="Checklist Type"
                                name="checklist_type"
                                        options={[
                                    { value: "onboarding", label: "Onboarding" },
                                    { value: "operations", label: "Operations" },
                                        ]}
                            />
                            <SubmitButton type="submit" className="text-primary hover:text-white bg-secondary">Save</SubmitButton>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Modal>
    )
}

export default AddNewChecklistModal