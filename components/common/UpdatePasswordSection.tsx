'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '../submit-button';
import toast from 'react-hot-toast';
import { updatePassword, verifyOldPassword } from '@/services/supabaseService';


const UpdatePasswordSection = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [verifyError, setVerifyError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: Record<string, string> = {};

            if (!isVerified) {
                if (!values.oldPassword) {
                    errors.oldPassword = 'Old password is required';
                }
            } else {
                if (!values.newPassword) {
                    errors.newPassword = 'New password is required';
                } else if (values.newPassword.length < 8) {
                    errors.newPassword = 'Password must be at least 8 characters';
                }

                if (!values.confirmPassword) {
                    errors.confirmPassword = 'Please confirm your new password';
                } else if (values.newPassword !== values.confirmPassword) {
                    errors.confirmPassword = 'Passwords do not match';
                }
            }

            return errors;
        },
        onSubmit: (values) => handleSubmit(values)
    });

    const handleSubmit = async (values: any) => {
        if (!isVerified) {
            try {
                const isValid = await verifyOldPassword(values.oldPassword);
                if (isValid) {
                    toast.success("Verification has been successful.")
                    setIsVerified(true);
                }
            } catch (error: any) {
                setVerifyError(error?.message);
                setIsVerified(false);
            }
        } else {
            try {
                await updatePassword(values);
                formik.resetForm();
                setIsVerified(false);
                setVerifyError(null);
            } catch (error: any) {
                formik.setErrors({ newPassword: error?.message });
                setVerifyError(error?.message);
            }
        }
    }

    return (
        <div className="mt-6 p-6 space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold">Update Password</h2>
            
            <form className='flex flex-col gap-4 w-full items-start' onSubmit={formik.handleSubmit}>
                {!isVerified ? (
                    <>
                        <p className="text-xs sm:text-sm md:text-base text-[#7E8299]">Please enter your old password.</p>
                        <div className="relative md:w-[390px] sm:max-w-md">
                            <Input 
                                name="oldPassword"
                                type="password"
                                placeholder="••••••••"
                                className="h-[42px] border-none shadow-lg rounded-lg font-medium"
                                value={formik.values.oldPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <button 
                                type="submit"
                                className="absolute right-3 top-2.5 underline font-bold cursor-pointer text-xs sm:text-sm md:text-[16px]"
                                disabled={formik.isSubmitting}
                            >
                                Verify
                            </button>
                        </div>
                        {verifyError && (
                            <div className="text-red-500 text-xs mt-1 font-semibold">{verifyError}</div>
                        )}
                        {formik.touched.oldPassword && formik.errors.oldPassword ? (
                            <div className="text-red-500 text-xs mt-1 font-semibold">{formik.errors.oldPassword}</div>
                        ) : null}
                    </>
                ) : (
                    <>
                        <div>
                            <Label size="xs" className="text-grey">New Password</Label>
                            <Input
                                name="newPassword"
                                type="password"
                                placeholder="New Password"
                                className="md:w-[390px] sm:max-w-md max-w-full"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <div className="text-red-500 text-xs mt-1 font-semibold">{formik.errors.newPassword}</div>
                            ) : null}
                        </div>
                        <div>
                            <Label size="xs" className="text-grey">Confirm New Password</Label>
                            <Input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                className="md:w-[390px] sm:max-w-md max-w-full"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="text-red-500 text-xs mt-1 font-semibold">{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                        <SubmitButton 
                            className="bg-secondary hover:text-white"
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            Save Changes
                        </SubmitButton>
                    </>
                )}
            </form>
        </div>
    );
}

export default UpdatePasswordSection;
