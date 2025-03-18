import Image from "next/image";
import Link from "next/link";

export const BudgetDetailCard: React.FC<{ pharmacy: any}> = ({
  pharmacy,
}) => {
  return (
    <Link href={`/admin/budget/${pharmacy.id}`}>
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
            {pharmacy.name}
          </h2>
        </div>
        <div className="mt-3 flex flex-col gap-y-4 text-black leading-3">

          <div className="flex justify-between flex-wrap gap-4">
            <p className="text-xs sm:text-sm md:text-[16px] font-semibold">
              Total Expense
            </p>
            <span className="text-xs sm:text-sm md:text-[16px] font-medium">
              ${pharmacy.expense}
            </span>
          </div>

          <div className="flex justify-between flex-wrap gap-4">
            <p className="text-xs sm:text-sm md:text-[16px] font-semibold">
            Total Revenue
            </p>
            <span className="text-xs sm:text-sm md:text-[16px] font-medium">
              ${pharmacy.revenue}
            </span>
          </div>

          <div className="flex justify-between flex-wrap gap-4">
            <p className="text-xs sm:text-sm md:text-[16px] font-semibold">
              Total Expense
            </p>
            <span className="text-xs sm:text-sm md:text-[16px] font-medium">
              ${pharmacy.profit   }
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};
