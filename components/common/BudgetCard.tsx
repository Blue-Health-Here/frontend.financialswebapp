import Image from "next/image";
import profileImage from "../../public/profile-image.png"

export const BudgetCard = ({ pharmacy, className }: any) => {
    return (
        <div className={`bg-white p-6 shadow-md rounded-lg ${className} min-h-[250px] flex flex-col`}>
            <div className="flex flex-col gap-3">
                <Image src={profileImage} alt="" className="w-12 h-12 rounded-full" />
                <h2 className="font-bold">{pharmacy.name}</h2>
            </div>
            <div className="mt-3 flex flex-col gap-y-4 text-black leading-3">
                <p className="text-[16px] font-medium">Total Expense <span className="text-[16px] font-medium float-right">${pharmacy.expense}</span></p>
                <p className="text-[16px] font-medium">Total Expense <span className="text-[16px] font-medium float-right">${pharmacy.expense}</span></p>
                <p className="text-[16px] font-medium">Total Expense <span className="text-[16px] font-medium float-right">${pharmacy.expense}</span></p>
                <p className="text-[16px] font-medium">Total Expense <span className="text-[16px] font-medium float-right">${pharmacy.expense}</span></p>
            </div>
        </div>
    );
};