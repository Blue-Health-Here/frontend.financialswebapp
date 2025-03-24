"use client"
import React, { useRef, useState } from 'react'
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { SubmitButton } from '@/components/submit-button';
import UpdatePasswordSection from '@/components/common/UpdatePasswordSection';
import { Field, Form, Formik } from 'formik';
import FileUploadField from '@/components/common/form/FileUploadField';
import DeleteAccountModal from './DeleteAccountModal';
import InputField from '@/components/common/form/InputField';
import toast from 'react-hot-toast';
const ProfileSection = () => {
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const fileInputRef: any = useRef(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setProfile(reader.result);
            };
            reader.readAsDataURL(file);

        } else {
            toast.error( 'Please select a valid image file (png, jpg, jpeg).');
        }
    };

    const handleEditClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveClick = () => {
        setProfile(null)
    };
    const handleDelete = () => {
        setIsCloseModal(true);
    };

    return (
        <div>
            <Formik 
                initialValues={{}}
                enableReinitialize={true}
                onSubmit={() => {}}
            >
                {({ values }) => {
                    return (
                        <Form className='p-6 bg-white shadow-lg rounded-lg'>
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-xl font-semibold">Account</h1>
                                <SubmitButton type='submit' className="bg-secondary text-primary hover:text-white">
                                    Save Changes
                                </SubmitButton>
                            </div>
                            <div className="flex gap-x-8">
                                <div className="grid grid-cols-2 gap-x-4 w-full">
                                    <InputField label='Pharmacy Name' type='text' placeholder='Pharmacy Name'
                                        className='placeholder:text-[#4E4E4E]' name='pharmacy_name' />
                                    <InputField label='Address' type='text' placeholder='Address'
                                        className='placeholder:text-[#4E4E4E]' name='address' />
                                    <InputField label='Email' type='email' placeholder='johndoe@gmail.com'
                                        className='placeholder:text-[#4E4E4E] bg-gray-200' disabled name='email' />
                                    <InputField label='Contact' type='text' placeholder='Add Contact'
                                        className='placeholder:text-[#4E4E4E]' name='contact' />
                                </div>
                                <div className="flex flex-col items-center w-auto mt-4">
                                    <div className="relative">
                                        <div className='w-full h-full relative overflow-hidden rounded-md'>
                                            <Image
                                                src={profile || '/default-profile.png'}
                                                alt="Profile"
                                                width={120}
                                                height={120}
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                            <button className="p-1 bg-white rounded-md shadow-lg" onClick={handleRemoveClick}>
                                                <X size={14} className="text-gray-600" />
                                            </button>
                                            <button className="p-1 bg-white rounded-md shadow-lg" onClick={handleEditClick}>
                                                <Pencil size={14} className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[10px] sm:text-xs text-[#A1A5B7] mt-4 text-center whitespace-nowrap font-semibold">
                                        Allowed file types: png, jpg, jpeg.
                                    </p>
                                    <Field name='file' type="file" accept="image/png, image/jpeg"
                                        ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <InputField 
                                    label='Services offered' type='text' 
                                    placeholder='Services offered'
                                    className='placeholder:text-[#4E4E4E]' name='services_offered' />
                                <FileUploadField label="Licensing" title="Upload License" name="license" isMultiSelect={true} className='w-60 border-primary' />
                                <FileUploadField label="Certifications" title="Upload Certification" name="certificate" isMultiSelect={true} className='w-60 border-primary' />
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            <UpdatePasswordSection />
            <div className="mt-6 p-6 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold">Delete Account</h2>
                <div className="flex justify-between items-center">
                    <p className="text-base text-[#7E8299]">It’ll permanently delete your account..</p>
                    <SubmitButton onClick={handleDelete} className='bg-white border border-[#D02E2E] text-[#FF0000] hover:bg-transparent'>Delete</SubmitButton>
                </div>
            </div>
            {isCloseModal && <DeleteAccountModal title='Account' description='Are you sure you want to delete your account?' handleClose={() => setIsCloseModal(false)} handleSuccess={() => console.log("handle success")} />}
        </div>
    )
}

export default ProfileSection