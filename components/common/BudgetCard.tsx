import Image from "next/image";

export const BudgetCard = ({ pharmacy, className }: any) => {
    return (
        <div className={`bg-white p-4 shadow-md rounded-lg ${className} min-h-[190px] flex flex-col`}>
            <div className="flex justify-between">
                <h2 className="font-bold">{pharmacy.name}</h2>
                <div className="flex gap-2">
                    <Image src="/edit-icon.svg" alt="" width={20} height={20} />
                    <Image src="/delete-icon.svg" alt="" width={20} height={20} />
                </div>

            </div>
            <div className="mt-3 flex flex-col gap-y-4 text-black leading-3">
                <p className="text-[16px] font-medium">Total Expense <span className="text-[16px] font-medium float-right">${pharmacy.expense}</span></p>
                <p className="text-[12px] font-semibold">Courses Completed <span className="text-[12px] font-semibold float-right">{pharmacy.courses}</span></p>
                <p className="text-[12px] font-semibold">Courses Completed <span className="text-[12px] font-semibold float-right">{pharmacy.courses}</span></p>
            </div>
        </div>
    );
};