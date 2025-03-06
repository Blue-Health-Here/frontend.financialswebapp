"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import profileImage from '../../public/profile-image.png'
import { signOutAction } from '@/app/actions'
import NavbarProfileDropdown from './NavbarProfileDropdown'
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { RootState, store } from '@/store/store'
import { useSelector } from 'react-redux'
import { createClient } from '@/utils/supabase/client'
import { setUser } from '@/store/features/auth/authSlice'
import { capitalize } from '@/utils/helperClient'

interface TopbarProps {
    role?: string;
}

const Topbar: React.FC<TopbarProps> = ({ role }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // const [role, setRole] = useState<string>('');
    const { user } = useSelector((state: RootState) => state.auth);

    const fetchAuthUser = async () => {
        const supabase = await createClient();
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session) {
            console.log(session?.user);
            
            // const role = await getUserRole(session?.user);
            // setRole(role);
            store.dispatch(setUser({ user: session?.user, token: session?.access_token }));
        }
    }
    
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
        if (!user) {
            fetchAuthUser()
        }
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
                <div className="relative">
                    <IoNotificationsOutline className='w-6 h-6' />
                    <div className="w-5 h-5 rounded-full bg-primary text-white absolute text-center bottom-3 left-3"><p>8</p></div>
                </div>
                <div className="flex gap-x-4 items-center relative" ref={dropdownRef}>
                    <button className='flex gap-x-3 items-center' onClick={toggleDropdown}>
                        <div className="text-right">
                            <span className="text-grey text-sm font-medium">{user?.user_metadata?.name}</span>
                            <p className="text-themeLight text-sm">{capitalize(role)}</p>
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