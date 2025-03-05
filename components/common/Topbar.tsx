"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import profileImage from '../../public/profile-image.png'
import { signOutAction } from '@/app/actions'
import NavbarProfileDropdown from './NavbarProfileDropdown'
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

const Topbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        console.log('toggleDropdown');

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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getCurrentDate = () => {
        const date = new Date();
        const options: any = { weekday: 'long', day: '2-digit', month: 'short', year: '2-digit' };
        let formattedDate = date.toLocaleDateString('en-GB', options);
        
        return formattedDate.replace(/(\d{2}) (\w{3})/, '$1, $2');
    };

    return (
        <nav className="topbar bg-white shadow-lg p-4 h-[62px] rounded-lg flex justify-between items-center z-50">
            <p className="text-[21px] font-medium">{getCurrentDate()}</p>
            <div className="flex justify-end items-center gap-x-4 cursor-pointer">
                <IoNotificationsOutline className='w-6 h-6' />
                <div className="flex gap-x-4 items-center relative" ref={dropdownRef}>
                    <button className='flex gap-x-3 items-center' onClick={toggleDropdown}>
                        <div className="text-right">
                            <span className="text-grey text-sm font-medium">Sam Lee</span>
                            <p className="text-themeLight text-sm">Admin</p>
                        </div>
                        <Image src={profileImage} alt="" />
                    </button>
                    {isDropdownOpen && (
                        <NavbarProfileDropdown />
                    )}
                </div>
                <MdOutlineLogout onClick={signOutAction} className='w-7 h-7 text-primary' />
            </div>
        </nav>)
}

export default Topbar