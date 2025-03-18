import { PharmacyCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export const PharmacyCard: React.FC<{ pharmacy: PharmacyCardProps }> = ({
  pharmacy,
}) => {
  return (
    <Link href={`/admin/budget/${pharmacy.pharmacy_id}`}>
      <div className="bg-white p-4 shadow-md rounded-lg min-h-[250px] flex flex-col">
        <div className="flex flex-col gap-3">
          <Image
            src="/Ellipse.png"
            alt=""
            className="rounded-full"
            width={48}
            height={48}
          />
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold md:font-bold">
            {pharmacy.pharmacy_name}
          </h2>
        </div>
        <div className="mt-3 flex flex-col gap-y-4 text-black leading-3">

          <div className="flex justify-between flex-wrap gap-4">
            <p className="text-xs sm:text-sm md:text-[16px] font-medium">
              Total Expense
            </p>
            <span className="text-xs sm:text-sm md:text-[16px] font-medium">
              ${pharmacy.expense}
            </span>
          </div>

          <div className="flex justify-between flex-wrap gap-4">
            <p className="text-xs font-semibold">Courses Completed</p>
            <span className="text-xs sm:text-sm md:text-[12px] font-semibold">
              {pharmacy.total_completed} / {pharmacy.courses | 0}
            </span>
          </div>

          <div>
            <div className="flex justify-between flex-wrap gap-4">
              <p className="text-[12px] font-semibold">
                Onboarding Checklist Progress
              </p>{" "}
              <span className="text-[12px] font-semibold">
                {pharmacy.completion_percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
              <div
                className="bg-primary h-[4px] rounded-full"
                style={{ width: `${pharmacy.completion_percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
