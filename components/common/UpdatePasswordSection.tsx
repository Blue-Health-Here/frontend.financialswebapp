'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '../submit-button';

export default function UpdatePasswordSection() {
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = () => {
        setIsVerified(true);
    };

    return (
        <div className="mt-6 p-6 space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold">Update Password</h2>
            {!isVerified ? (
                <>
                    <p className="text-[16px] text-[#7E8299]">Please Enter Your Old Password.</p>
                    <div className="relative">
                        <Label className="text-[12px] text-grey">Type here</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-80"
                        />
                        <button
                            className="absolute left-[16.5rem] top-[44px] transform -translate-y-1/2 underline font-bold"
                            onClick={handleVerify}
                        >
                            Verify
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-[16px] text-[#7E8299]">Please Enter Your New Password.</p>
                    <div>
                        <Label className="text-[12px] text-grey">New Password</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-80"
                        />
                    </div>
                    <div>
                        <Label className="text-[12px] text-grey">Confirm New Password</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-80"
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
