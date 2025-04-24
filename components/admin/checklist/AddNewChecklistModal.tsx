import InputField from '@/components/common/form/InputField'
import SelectField from '@/components/common/form/SelectField'
import HeaderModal from '@/components/common/HeaderModal'
import Modal from '@/components/common/Modal'
import { SubmitButton } from '@/components/submit-button'
import { setIsAddChecklist } from '@/store/features/admin/checklist/adminChecklistSlice'
import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'

interface AddNewChecklistModalProps {
    selectedType?: string;
}

const AddNewChecklistModal: React.FC<AddNewChecklistModalProps> = ({ selectedType }) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddChecklist(false));
    };
    const initialValues = {
        name: "",
        checklistType: selectedType?.toLowerCase() || "",
    }
    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title="Add New Checklist" onClose={(handleClose)} />
                <div className="p-6">
                    <Formik initialValues={initialValues} onSubmit={() => { }}>
                        <Form className="flex flex-col gap-y-4">
                            <InputField label="Name" className="placeholder:text-themeLight" name="name" placeholder="Enter Name" lableColor='text-black' />
                            <SelectField
                                label="Checklist Type"
                                name="checklistType"
                                options={[
                                    { value: "onboarding", label: "Onboarding" },
                                    { value: "operational", label: "Operational" },
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