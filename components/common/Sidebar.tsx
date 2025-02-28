"use client";
import { sidebarItems } from '@/utils/constants'
import Image from 'next/image'
import React, { useState } from 'react'

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<number | null>(null);
    return (
        <aside className="w-[18%] bg-primary text-white shadow-lg pt-8 pb-8 pl-4 pr-4 fixed left-0 top-0 h-full">
            <h1 className="text-xl text-center font-semibold">LOGO</h1>
            <ul className="mt-16 space-y-2 text-[15px]">
                {sidebarItems.map((item, index) => (
                    <li key={index}
                        className={`flex items-center gap-x-3 p-3 rounded-lg cursor-pointer transition 
                    ${activeItem === index ? "bg-secondary" : "hover:bg-secondary"}`}
                        onClick={() => setActiveItem(index)}
                    >
                        <Image src={item.icon} alt={`${item.name} Icon`} width={20} height={20} />
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </aside>)
}

export default Sidebar