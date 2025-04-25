import InputField from '@/components/common/form/InputField'
import SelectField from '@/components/common/form/SelectField'
import HeaderModal from '@/components/common/HeaderModal'
import Modal from '@/components/common/Modal'
import { SubmitButton } from '@/components/submit-button'
import { createNewChecklist, updateChecklist } from '@/services/adminServices'
import { setIsAddChecklist } from '@/store/features/admin/checklist/adminChecklistSlice'
import { RootState } from '@/store/store'
import { addNewChecklistValidationSchema } from '@/utils/validationSchema'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

interface AddNewChecklistModalProps {
    selectedType?: string;
}

const AddNewChecklistModal: React.FC<AddNewChecklistModalProps> = ({ selectedType }) => {
    const checklistDetail = useSelector((state: RootState) => state.checklist.checklistDetail);
    const [initialVals, setInitialVals] = useState<any>({checklist_name: "",checklist_type: selectedType?.toLowerCase()});
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setIsAddChecklist(false));
    };

    useEffect(() => {
        if (checklistDetail) {
            setInitialVals({
                checklist_id: checklistDetail?.id, 
                checklist_name: checklistDetail.checklist_name,
                checklist_type: checklistDetail.checklist_type
            });
        }
    }, [checklistDetail]);  
    

    const handleSubmit = async (values: { checklist_name: string, checklist_type: string }) => {
        const payload: any = {
            checklist_name: values.checklist_name,
            checklist_type: values.checklist_type
        }

        try {
            if (checklistDetail) {
                await updateChecklist(dispatch, { id: checklistDetail?.id, ...payload });
            } else {
                await createNewChecklist(dispatch, payload);
            }
            handleClose();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong!!");
        }
    };

    return (
        <Modal>
            <div className="bg-white">
                <HeaderModal title={`${checklistDetail ? "Edit" : "Add New"} Checklist`} onClose={(handleClose)} />
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
                                isDisabled={!!checklistDetail}      
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