import Image from "next/image";
import profileImage from "../../public/profile-image.png"

export const PharmacyCard = ({ pharmacy, className }: any) => {
    return (
        <div className={`bg-white p-4 shadow-md rounded-lg ${className} min-h-[250px] flex flex-col`}>
            <div className="flex flex-col gap-3">
                <Image src={profileImage} alt="" className="w-12 h-12 rounded-full" />
                <h2 className="font-bold">{pharmacy.name}</h2>
            </div>
            <div className="mt-3 flex flex-col gap-y-4 text-black leading-3">
                <p className="text-[16px] font-medium">Total Expense <span className="text-[16px] font-medium float-right">${pharmacy.expense}</span></p>
                <p className="text-[12px] font-semibold">Courses Completed <span className="text-[12px] font-semibold float-right">{pharmacy.courses}</span></p>
                <div>
                    <p className="text-[12px] font-semibold">Onboarding Checklist Progress <span className="text-[12px] font-semibold float-right">{pharmacy.progress}%</span></p>
                    <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                        <div className="bg-primary h-[4px] rounded-full" style={{ width: `${pharmacy.progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};