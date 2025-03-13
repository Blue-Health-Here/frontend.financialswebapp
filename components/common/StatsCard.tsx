import { StatsCardProps } from "@/utils/types";
import Image from "next/image";

export const StatsCard: React.FC<StatsCardProps> = ({ value, icon, label, color }) => {
    return (
        <div className="h-full w-full p-6 bg-white rounded-lg shadow-md text-center flex flex-col items-center justify-center gap-2">
            <Image src={icon} alt="" width={60} height={60} />
            <p className={`text-[2vw] leading-[3vw] font-semibold ${color}`}>{value}</p>
            <p className="text-grey text-lg">{label}</p>
        </div>
    );
};
