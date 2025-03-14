'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '../submit-button';
import { IoSearch } from "react-icons/io5";


export default function UpdatePasswordSection() {
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = () => {
        setIsVerified(true);
    };

    return (
        <div className="mt-6 p-6 space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold">Update Password</h2>
            {!isVerified ? (
                <>
                    <p className="text-xs sm:text-sm md:text-[16px] text-[#7E8299]">Please Enter Your Old Password.</p>
                       <div className="relative md:w-[390px] sm:max-w-md">
                                        <Input name="email" placeholder="Search Courses" className="h-[42px] border-none shadow-lg rounded-lg font-medium" />
                                        <span className="absolute right-3 top-2.5 underline font-bold cursor-pointer text-xs sm:text-sm md:text-[16px]" onClick={handleVerify}>
                                        Verify
                                        </span>
                                    </div>
                </>
            ) : (
                <>
                    <p className="text-xs sm:text-sm md:text-[16px] text-[#7E8299]">Please Enter Your New Password.</p>
                    <div>
                        <Label className="text-[12px] text-grey">New Password</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="md:w-[390px] sm:max-w-md"
                        />
                    </div>
                    <div>
                        <Label className="text-[12px] text-grey">Confirm New Password</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="md:w-[390px] sm:max-w-md"
                        />
                    </div>
                    <SubmitButton className="bg-secondary hover:text-white">
                        Save Changes
                    </SubmitButton>
                </>
            )}
        </div>
    );
}
