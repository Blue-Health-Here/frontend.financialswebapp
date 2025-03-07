import Image from "next/image";

interface StatsCardProps {
    value: string;
    icon: string;
    label: string;
    color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, icon, label, color }) => {
    return (
        <div className="h-full w-full p-6 bg-white rounded-lg shadow-md text-center flex flex-col items-center justify-center gap-2">
            <Image src={icon} alt="" width={45} height={45} />
            <p className={`text-3xl leading-10 font-semibold ${color}`}>{value}</p>
            <p className="text-gray-500">{label}</p>
        </div>
    );
};