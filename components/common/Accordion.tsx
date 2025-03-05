import React, { useState } from 'react';

const Accordion: React.FC<{ items: any[] }> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index: any) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="w-full max-w-[600px] mx-auto">
            {items.map((item: any, index: number) => (
                <div key={index} className="border border-gray-300 rounded-lg mb-2.5 overflow-hidden">
                    <div
                        className={`flex justify-between items-center p-2.5 cursor-pointer rounded-lg ${activeIndex === index ? 'bg-primary text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                        onClick={() => onTitleClick(index)}
                    >
                        <div>{item.title}</div>
                        <span>{activeIndex === index ? '-' : '+'}</span>
                    </div>
                    <div
                        className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                    >
                        <div className="p-2.5 bg-white border-t border-gray-300">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;