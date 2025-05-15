import Image from "next/image";
import React, { useState } from "react";

const CourseCard = ({ title, description }: any) => {

    return (
        <div
            className="bg-white p-7 shadow-md rounded-lg min-h-[125px] cursor-pointer"
        >
            <div className="flex justify-between">
                <div className="space-y-3">
                    <h3 className="font-medium text-sm">{title}</h3>
                    <p className="text-gray-500 text-xs">{description}</p>
                </div>
                <Image
                    src="/tick.svg"
                    alt=""
                    className="w-3.5 h-3.5 sm:w-6 sm:h-6 mt-1 sm:mt-0"
                    width={20}
                    height={20}
                />
            </div>
        </div>
    );
};

export default CourseCard;