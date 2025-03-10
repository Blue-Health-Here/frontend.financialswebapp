import React, { useState } from "react";

const CourseCard = ({ title, description }: any) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCardClick = () => {
        setIsChecked((prevChecked) => !prevChecked);
    };

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };
    return (
        <div
            className="bg-white p-7 shadow-md rounded-lg min-h-[125px] cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="flex justify-between">
                <div className="space-y-3">
                    <h3 className="font-medium text-sm">{title}</h3>
                    <p className="text-gray-500 text-xs">{description}</p>
                </div>
                <label className="custom-checkbox" htmlFor={`checkbox-${title}`}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span></span>
                </label>
            </div>
        </div>
    );
};

export default CourseCard;