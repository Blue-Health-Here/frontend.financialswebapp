import Image from 'next/image';
import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiArrowDropDownLine } from "react-icons/ri";

interface AccordionProps {
    items: {
        title: string;
        content: string | string[];
    }[];
    handleEditQuestion?: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ items, handleEditQuestion }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onTitleClick = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="w-full mx-auto">
            {items.map((item, index) => (
                <div key={index} className="shadow-md rounded-xl mb-6 overflow-hidden">
                    <div
                        className={`flex justify-between items-center px-6 py-4 sm:py-2  md:py-4 cursor-pointer ${activeIndex === index ? 'bg-primary text-white' : 'bg-white'}`}
                        onClick={() => onTitleClick(index)}
                    >
                        <h1 className='text-xs sm:text-sm md:text-[16px] lg:text-lg'>{item.title}</h1>
                        {activeIndex === index ? <RiArrowDropDownLine className='text-2xl md:text-[34px]' /> : <MdKeyboardArrowRight className='text-xl md:text-[24px]'/>}
                    </div>
                    <div
                        className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    >
                        <div className="p-6 bg-white border-t border-gray-300">
                            {Array.isArray(item.content) && item.content.length > 0 ? (
                                <ul className="divide-y divide-gray-300">
                                    {item.content.map((text, idx) => (
                                        <li key={idx} className="flex items-center justify-between py-3">
                                            <div className="inline-flex gap-2 items-center flex-1">
                                                <Image src="/greencheck.png" alt="" className=' w-6 h-6' width={20} height={20} />
                                                <span className="text-grey text-xs sm:text-sm md:text-[16px] leading-6">{text}</span>
                                            </div>
                                            <button className="text-gray-500 hover:text-blue-500 transition w-6 h-6 " onClick={handleEditQuestion}>
                                                <Image src="/edit-icon.svg" alt="" width={15} height={15} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : item.content ? (
                                <div className="flex items-center justify-between">
                                    <p className="text-grey text-xs sm:text-sm md:text-[16px]">{item.content}</p>
                                    <button className="text-gray-500 hover:text-blue-500 transition w-6 h-6" onClick={handleEditQuestion}>
                                        <Image src="/edit-icon.svg" alt="" width={15} height={15} />
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
