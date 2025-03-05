import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import profile from "../../../public/profileImage.svg"
import { Metadata } from "next";
import UpdatePasswordSection from "@/components/common/UpdatePasswordSection";
import { SubmitButton } from "@/components/submit-button";

export const metadata: Metadata = {
    title: "Profile - Financials Web App",
};
export default function Profile() {
    return (
        <AdminLayout>
            <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Account</h1>
                    <SubmitButton className="bg-secondary">
                        Save Changes
                    </SubmitButton>
                </div>
                <div className="flex gap-x-8 pt-8 pb-8">
                    <div className="w-full space-y-4">
                        <div>
                            <Label className="text-[12px] text-grey">Full Name</Label>
                            <Input type="text" placeholder="Full Name" className="placeholder:text-[#4E4E4E]" />
                        </div>
                        <div>
                            <Label className="text-[12px] text-grey">Email</Label>
                            <Input
                                type="email"
                                placeholder="johndoe@gmail.com"
                                className="bg-gray-200 placeholder:text-[#4E4E4E]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-auto">
                        <div className="relative w-[120px] h-[120px] rounded-md">
                            <Image
                                src={profile}
                                alt="Profile"
                                width={120}
                                height={120}
                                className="rounded-md object-cover"
                            />
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                <button className="p-1 bg-white rounded-md shadow-lg">
                                    <X size={14} className="text-gray-600" />
                                </button>
                                <button className="p-1 bg-white rounded-md shadow-lg">
                                    <Pencil size={14} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <p className="text-[12px] text-[#A1A5B7] mt-4 text-center whitespace-nowrap">
                            Allowed file types: png, jpg, jpeg.
                        </p>
                    </div>
                </div>
            </div>

            {/* Update Password Section */}
            <UpdatePasswordSection />
        </AdminLayout>
    );
}
