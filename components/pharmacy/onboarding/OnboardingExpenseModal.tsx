import FileDownloadField from '@/components/common/form/FileDownloadField'
import FileUploadField from '@/components/common/form/FileUploadField'
import InputField from '@/components/common/form/InputField'
import SelectField from '@/components/common/form/SelectField'
import TextareaField from '@/components/common/form/TextareaField'
import HeaderModal from '@/components/common/HeaderModal'
import Modal from '@/components/common/Modal'
import { SubmitButton } from '@/components/submit-button'
import { Label } from '@/components/ui/label'
import { setIsAddExpenseModal } from '@/store/features/pharmacy/onboarding/pharmacyOnboardingExpenseSlice'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RxCross2 } from "react-icons/rx";


const OnboardingExpenseModal = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const dispatch = useDispatch()
    const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = event.target.value;
        if (newDate && !selectedDates.includes(newDate) && newDate !== "Selected Date(s)") {
            setSelectedDates([...selectedDates, newDate]);
        }
    };

    const handleRemoveDate = (dateToRemove: string) => {
        setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
    };
    return (
        <Modal>
            <HeaderModal title="View / Edit" onClose={() => { dispatch(setIsAddExpenseModal(false)) }} />
            <div className="p-6">
                <Formik initialValues={{ name: "" }} onSubmit={() => { }}>
                    <Form className="flex flex-col gap-y-4">
                        <TextareaField label="Question" className="placeholder:text-themeLight" name="question" />
                        <InputField label="Expense" className="placeholder:text-themeLight bg-[#D8D6DE]" name="expense" />
                        <InputField label="Pharmacy Expense" className="placeholder:text-themeLight" name="pharmacyExpense" />
                        <TextareaField label="Note" name="note" />

                        <FileDownloadField title='Download Document' className='bg-white border border-secondary' />
                        <FileUploadField title='Upload Document' name="document" className='bg-white border border-secondary' />

                        <SelectField
                            label="Operational Item"
                            name="operationalItem"
                            options={[
                                { value: "Tier1", label: "Tier1" },
                                { value: "Tier2", label: "Tier2" },
                            ]}
                        />
                        <InputField label="Action Items" className="placeholder:text-themeLight" name="pharmacyExpense" />
                        <SelectField
                            label="Key Follow-up dates"
                            name="Key Follow-up dates"
                            options={[
                                { value: "Selected Date(s)", label: "Selected Date(s)" },
                                { value: "2 Jan 2024", label: "2 Jan 2024" },
                                { value: "3 Jan 2024", label: "3 Jan 2024" },
                                { value: "4 Jan 2024", label: "4 Jan 2024" }
                            ]}
                        />
                        {selectedDates.length > 0 && (
                            <div>
                                <Label size="xs">Selected Dates(s)</Label>
                                <div className="flex flex-col gap-2 mt-2">
                                    {selectedDates.map((date, index) => (
                                        <div key={index} className="flex gap-x-2">
                                            <div className="flex h-10 w-full rounded-md  border border-input bg-background px-3 py-2 text-sm">
                                                <span>{date}</span>
                                            </div>
                                            <button onClick={() => handleRemoveDate(date)}><RxCross2 size={15} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <SelectField
                            label="Status"
                            name="status"
                            options={[
                                { value: "inprogress", label: "Inprogress" },
                                { value: "todo", label: "Todo" },
                                { value: "operations", label: "Operations" },
                            ]}
                        />
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

export default OnboardingExpenseModal