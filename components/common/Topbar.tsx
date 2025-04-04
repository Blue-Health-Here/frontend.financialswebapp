"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import profileImage from '../../public/profile-image.png'
import { signOutAction } from '@/app/actions'
import NavbarProfileDropdown from './NavbarProfileDropdown'
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { capitalize } from '@/utils/helperClient'
import { FaBars } from 'react-icons/fa'
import { setIsSidebarOpen } from '@/store/features/global/globalSlice'
import { setUser } from '@/store/features/auth/authSlice'
import { Session } from '@supabase/supabase-js'
import { RootState } from '@/store/store'
import { TbLoader2 } from "react-icons/tb";

interface TopbarProps {
    role?: string;
    session: Session | null
}

const Topbar: React.FC<TopbarProps> = ({ role, session }) => {
    const [currentDate, setCurrentDate] = useState<string>("Loading...");
    const { profileData } = useSelector((state: RootState) => state.global);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const { isLoading } = useSelector((state: RootState) => state.global);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const { user } = session ?? {};
    
    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to close the dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    // Add event listener for clicking outside
    useEffect(() => {
        if (session) {
            dispatch(setUser(session));
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const options: any = { weekday: 'long', day: '2-digit', month: 'short', year: '2-digit' };
            let formattedDate = date.toLocaleDateString('en-GB', options);
            return formattedDate.replace(/(\d{2}) (\w{3})/, '$1, $2');
        };
    
        setCurrentDate(getCurrentDate());
    }, []); 

    const handleNavbarToggler = () => {
        dispatch(setIsSidebarOpen(true));
    };
    
    return (
        <>
            {isLoading && (
                <>
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black bg-opacity-75"></div>
                    <div className="fixed left-0 right-0 top-0 bottom-0 z-[99999] flex items-center justify-center h-full">
                        <TbLoader2 className='w-10 h-10 text-teal-500 animate-spin' />
                    </div>
                </>
            )}
            <div className="bg-bodyBG fixed top-0 left-0 lg:left-[250px] xl:left-[300px] right-0 px-6 py-4 z-50">
                <nav className="topbar bg-white shadow-lg p-4 h-[62px] rounded-lg flex justify-between items-center z-50">
                    <p className="text-sm md:text-[18px] lg:text-[20px] xl:text-[21px] font-medium">{currentDate}</p>
                    <div className="flex justify-end items-center gap-x-4 cursor-pointer">
                        <div className="relative hidden lg:block">
                            <IoNotificationsOutline className='w-6 h-6' />
                            <div className="w-5 h-5 rounded-full bg-primary text-white absolute text-center bottom-3 left-3"><p>8</p></div>
                        </div>
                        <div className="flex gap-x-4 items-center relative" ref={dropdownRef}>
                            <button className='flex gap-x-3 items-center' onClick={toggleDropdown}>
                                <div className="text-right hidden md:block">
                                    <span className="text-grey text-sm font-medium">{profileData?.name ?? user?.user_metadata?.name}</span>
                                    <p className="text-themeLight text-sm">{capitalize(role)}</p>
                                </div>
                                <div className='border rounded-full object-cover shadow-sm overflow-hidden w-9 h-9 flex items-center justify-center'>
                                    <Image src={profileData?.image_url ?? user?.user_metadata?.image_url ?? profileImage} alt="" className='object-cover shadow-sm w-full h-full' width={30} height={30} />
                                </div>
                            </button>
                            {isDropdownOpen && (
                                <NavbarProfileDropdown role={role} />
                            )}
                        </div>
                        <FaBars size={22} className='text-primary block lg:hidden' onClick={handleNavbarToggler} />
                        <MdOutlineLogout onClick={signOutAction} className='w-7 h-7 text-primary' />
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Topbar