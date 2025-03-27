"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { SubmitButton } from '@/components/submit-button';
import UpdatePasswordSection from '@/components/common/UpdatePasswordSection';
import { Field, Form, Formik } from 'formik';
import InputField from '@/components/common/form/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchProfileData, postProfileUpdate } from '@/services/adminServices';
import toast from 'react-hot-toast';

const ProfileSection = () => {
    const [initialVals, setInitialVals] = useState<{ name?: string; email?: string; file?: File | null | string }>({ name: "", email: "", file: "" })
    const { user } = useSelector((state: RootState) => state.auth);
    const { profileData } = useSelector((state: RootState) => state.global);
    const [profileImg, setProfileImg] = useState(null);
    const fileInputRef: any = useRef(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchProfileData(dispatch);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (user && user?.user_metadata) {
            setInitialVals({
                ...initialVals,
                email: user?.user_metadata?.email,
            });
        }
        if (profileData) {
            setInitialVals({
                ...initialVals,
                name: profileData?.name
            });
        }
    }, [profileData]);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setProfileImg(file)
        } else {
            toast.error('Please select a valid image file (png, jpg, jpeg).');
        }
    };

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append("name", values.name);
        if (profileImg) {
            formData.append("file", profileImg);
        }
        await postProfileUpdate(dispatch, formData);
    };

    return (
        <div>
            <Formik 
                initialValues={initialVals} 
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({ values }) => {
                    return (
                        <Form className="p-6 bg-white shadow-lg rounded-lg">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <h1 className="text-lg md:text-xl font-semibold">Account</h1>
                                <SubmitButton type='submit' className="bg-secondary text-primary hover:text-white">
                                    Save Changes
                                </SubmitButton>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row gap-4 gap-x-8 pt-8">
                                <div className="w-full space-y-4">
                                    <InputField type='text' label="Full Name" className="placeholder:text-[#4E4E4E]" name="name" placeholder="Full Name" />
                                    <InputField type='email' label="Email" disabled={true} className="bg-gray-200 placeholder:text-[#4E4E4E]" name="email" placeholder="johndoe@gmail.com" />
                                </div>

                                <div className="flex flex-col items-center w-auto">
                                    <div className="relative">
                                        <div className='w-[120px] h-[120px] overflow-hidden rounded-md'>
                                            <Image
                                                src={profileImg ? URL.createObjectURL(profileImg) : profileData?.image_url ?? '/default-profile.png'}
                                                alt="Profile img"
                                                width={120}
                                                height={120}
                                                className="rounded-md object-cover w-full h-full"
                                            /></div>
                                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                            <button
                                                type='button'
                                                className="p-1 bg-white rounded-md shadow-lg"
                                                onClick={() => setProfileImg(null)}
                                            >
                                                <X size={14} className="text-gray-600" />
                                            </button>
                                            <button
                                                type='button'
                                                className="p-1 bg-white rounded-md shadow-lg"
                                                onClick={() => fileInputRef.current.click()}
                                            >
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
                        </Form>
                    )
                }}
            </Formik>
            <UpdatePasswordSection />
        </div>
    )
}

export default ProfileSection