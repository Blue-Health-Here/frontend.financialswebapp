"use client";
import { sidebarItems } from '@/utils/constants'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { RxCross2 } from 'react-icons/rx';
import { setIsSidebarOpen } from '@/store/features/global/globalSlice';

const Sidebar = () => {
    const { isSidebarOpen } = useSelector((state: RootState) => state.global);
    const pathName = usePathname()
    const dispatch = useDispatch();
    const asideClass = isSidebarOpen ? "max-w-[250px] min-w-[250px] xl:min-w-[300px] xl:max-w-[300px] block bg-primary text-white shadow-lg pt-8 pb-8 pl-4 pr-4 fixed left-0 top-0 h-full z-[99]"
    : "max-w-[250px] min-w-[250px] xl:min-w-[300px] xl:max-w-[300px] hidden lg:block bg-primary text-white shadow-lg pt-8 pb-8 pl-4 pr-4 fixed left-0 top-0 h-full z-[99]";
    return (
        <aside className={asideClass}>
            {isSidebarOpen && <span onClick={() => dispatch(setIsSidebarOpen(false))} className='absolute top-4 right-4'><RxCross2 size={20} /></span>}
            <h1 className="text-xl text-center font-semibold">LOGO</h1>
            <ul className="mt-16 flex flex-col gap-y-2 text-[15px]">
                {sidebarItems.map((item, index) => {
                    const isActive = pathName === item.path
                    return (
                        <Link href={item.path} key={index}>
                            <li className={`flex items-center gap-x-3 p-3 rounded-lg cursor-pointer transition font-medium
                              ${isActive ? "bg-secondary" : "hover:bg-secondary"}`}>
                                <Image src={item.icon} alt={`${item.name} Icon`} width={20} height={20} />
                                <span>{item.name}</span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </aside>)
}

export default Sidebar