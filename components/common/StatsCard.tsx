import Image from "next/image";

interface StatsCardProps {
    value: string;
    icon: string;
    label: string;
    color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, icon, label, color }) => {
    return (
        <div className="h-full w-full p-6 bg-white rounded-lg shadow-md text-center flex flex-col items-center justify-center gap-4 md:gap-2">
            <Image src={icon} alt="" width={40} height={40} className="sm:h-[50px] sm:w-[50px] md:h-[60px] md:w-[60px]"/>
            <p className={`text-xl md:text-[2vw] leading-[3vw] font-semibold ${color}`}>{value}</p>
            <p className="text-grey text-sm sm:text-[16px] md:text-lg">{label}</p>
        </div>
    );
};