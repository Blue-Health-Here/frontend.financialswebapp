import FileDownloadField from '@/components/common/form/FileDownloadField'
import FileUploadField from '@/components/common/form/FileUploadField'
import InputField from '@/components/common/form/InputField'
import TextareaField from '@/components/common/form/TextareaField'
import HeaderModal from '@/components/common/HeaderModal'
import Modal from '@/components/common/Modal'
import { SubmitButton } from '@/components/submit-button'
import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setIsAddOperationsExpense } from '@/store/features/pharmacy/operations/operationsExpenseSlice'


const OperationsExpenseModal = () => {

    const dispatch = useDispatch()

    return (
        <Modal>
            <HeaderModal title="View / Edit" onClose={() => { dispatch(setIsAddOperationsExpense(false)) }} />
            <div className="p-6">
                <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                    <Form className="flex flex-col gap-y-4">
                        <TextareaField label="Question" className="placeholder:text-themeLight" name="question" />

                        <InputField label="Expense" className="placeholder:text-themeLight" name="expense" />

                        <InputField label="Pharmacy Expense" className="placeholder:text-themeLight" name="pharmacyExpense" />

                        <TextareaField label="Note" name="note" />

                        <FileDownloadField title='Download Document' className='bg-white border border-secondary' />

                        <FileUploadField title='Upload Document' name="document" className='bg-white border border-secondary' />

                        <div className="flex gap-x-4 items-center justify-center">
                            <SubmitButton type="submit" className="text-primary w-40 hover:text-white bg-secondary">Discard</SubmitButton>
                            <SubmitButton type="submit" className="text-primary w-40 hover:text-white bg-secondary">Save</SubmitButton>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Modal>
    )
}

export default OperationsExpenseModal