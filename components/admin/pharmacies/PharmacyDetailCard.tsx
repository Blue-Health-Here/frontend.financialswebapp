import Image from "next/image";

const PharmacyDetailCard: React.FC<any> = ({ pharmacyDetailsData }) => {
    return (
        <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-y-10 md:gap-x-10 lg:gap-x-20 items-center">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="rounded-full object-cover overflow-hidden">
                    <Image
                        src={pharmacyDetailsData?.image_url || "/Ellipse.png"}
                        alt="Profile Image"
                        width={300}
                        height={300}
                        sizes="(max-width: 767px) 128px, 300px"
                        className="rounded-full object-cover"
                        onError={(e) => (e.currentTarget.src = "/Ellipse.png")}
                    />
                </div>
                <div className="space-y-3 text-black w-full">
                    <h2 className="text-sm sm:text-lg lg:text-xl font-bold">
                        {pharmacyDetailsData?.pharmacy_name || "Loading..."}
                    </h2>

                    <div className="flex justify-between flex-wrap gap-4">
                        <p className="text-xs sm:text-sm md:text-[16px] font-medium">
                            Total Expense
                        </p>
                        <span className="text-xs sm:text-sm md:text-[16px] font-medium">
                            ${pharmacyDetailsData?.expense?.toLocaleString() ?? 0}
                        </span>
                    </div>

                    <div className="flex justify-between flex-wrap gap-4">
                        <p className="text-xs font-semibold">Courses Completed</p>
                        <span className="text-xs sm:text-sm md:text-[12px] font-semibold">
                            {pharmacyDetailsData?.total_completed ?? 0}
                        </span>
                    </div>

                    <div className="w-full">
                        <div className="flex justify-between flex-wrap gap-4">
                            <p className="text-[12px] font-semibold">
                                Onboarding Checklist Progress
                            </p>{" "}
                            <span className="text-[12px] font-semibold">
                                {pharmacyDetailsData?.completion_percentage ?? 0}%
                            </span>
                        </div>{" "}
                        <div className="w-full bg-gray-200 rounded-full h-[4px] mt-2">
                            <div
                                className="bg-primary h-[4px] rounded-full"
                                style={{
                                    width: `${pharmacyDetailsData?.completion_percentage ?? 0}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-grey space-y-3">
                <p className=" text-xs md:text-sm">
                    <strong className="text-black">Address:</strong>{" "}
                    {pharmacyDetailsData?.address ?? "N/A"}
                </p>
                <p className="text-xs md:text-sm">
                    <strong className="text-black">Email:</strong>{" "}
                    {pharmacyDetailsData?.email ?? "N/A"}
                </p>
                <p className="text-xs md:text-sm">
                    <strong className="text-black">Contact:</strong>{" "}
                    {pharmacyDetailsData?.contact ?? "N/A"}
                </p>
            </div>
        </div>
    )
};

export default PharmacyDetailCard;