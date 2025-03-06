import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiArrowDropDownLine } from "react-icons/ri";

const Accordion: React.FC<{ items: any[] }> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index: any) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="w-full mx-auto">
            {items.map((item: any, index: number) => (
                <div key={index} className="shadow-md rounded-xl mb-6 overflow-hidden">
                    <div
                        className={`flex justify-between items-center px-6 py-4 cursor-pointer ${activeIndex === index ? 'bg-primary text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                        onClick={() => onTitleClick(index)}
                    >
                        <h2>{item.title}</h2>
                        {activeIndex === index ? <RiArrowDropDownLine size={34} /> : <MdKeyboardArrowRight size={24} />}
                    </div>
                    <div
                        className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    >
                        <div className="p-6 bg-white border-t border-gray-300">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;