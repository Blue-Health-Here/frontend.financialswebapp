"use client"
import React, { useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SubmitButton } from '@/components/submit-button';
import UpdatePasswordSection from '@/components/common/UpdatePasswordSection';
import { Form, Formik } from 'formik';
import FileUploadField from '@/components/common/form/FileUploadField';
import DeleteAccountModal from './DeleteAccountModal';
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
            alert('Please select a valid image file (png, jpg, jpeg).');
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

            <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Account</h1>
                    <SubmitButton className="bg-secondary text-primary hover:text-white">
                        Save Changes
                    </SubmitButton>
                </div>
                <div className="flex gap-x-8 pt-8">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
                        <div>
                            <Label className="text-[12px] text-grey">Pharmacy Name</Label>
                            <Input type="text" placeholder="Pharmacy Name" className="placeholder:text-[#4E4E4E]" />
                        </div>
                        <div>
                            <Label className="text-[12px] text-grey">Address</Label>
                            <Input type="text" placeholder="Address" className="placeholder:text-[#4E4E4E]" />
                        </div>
                        <div>
                            <Label className="text-[12px] text-grey">Email</Label>
                            <Input type="email" placeholder="johndoe@gmail.com" className="bg-gray-200 placeholder:text-[#4E4E4E]" />
                        </div>
                        <div>
                            <Label className="text-[12px] text-grey">Contact</Label>
                            <Input type="text" placeholder="Add Contact" className="placeholder:text-[#4E4E4E]" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-auto">
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
                        <p className="text-[12px] text-[#A1A5B7] mt-4 text-center whitespace-nowrap font-semibold">
                            Allowed file types: png, jpg, jpeg.
                        </p>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-y-4">
                    <div>
                        <Label className="text-[12px] text-grey">Services offered</Label>
                        <Input type="text" placeholder="Services offered" className="placeholder:text-[#4E4E4E]" />
                    </div>
                    <div className="">
                        <Formik
                            initialValues={{ documents: [] }}
                            onSubmit={(values) => console.log(values)}
                        >
                            {() => (
                                <Form>
                                    <FileUploadField label="Licensing" title="Upload License" name="file" isMultiSelect={true} className='w-60 mb-6 border-primary' />
                                </Form>
                            )}
                        </Formik>
                        <Formik
                            initialValues={{ documents: [] }}
                            onSubmit={(values) => console.log(values)}
                        >
                            {() => (
                                <Form className='w-full'>
                                    <FileUploadField label="Certifications" title="Upload Certification" name="file" isMultiSelect={true} className='w-60 border-primary' />
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>

            </div>
            <UpdatePasswordSection />
            <div className="mt-6 p-6 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold">Delete Account</h2>
                <div className="flex justify-between items-center">
                    <p className="text-[16px] text-[#7E8299]">It’ll permanently delete your account..</p>
                    <SubmitButton onClick={handleDelete} className='bg-white border border-[#D02E2E] text-[#FF0000] hover:bg-transparent'>Delete</SubmitButton>
                </div>


            </div>
            {isCloseModal && <DeleteAccountModal title='Account' description='Are you sure you want to delete your account?' handleClose={() => setIsCloseModal(false)} handleSuccess={() => console.log("handle success")} />}
        </div>
    )
}

export default ProfileSection