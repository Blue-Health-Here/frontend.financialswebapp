export const StatsCard = ({ value, label, color }: { value: string; label: string; color: string }) => {
    return (
        <div className="h-full w-full p-6 bg-white rounded-lg shadow-md text-center flex flex-col justify-center">
            <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            <p className="text-gray-500">{label}</p>
        </div>
    );
};