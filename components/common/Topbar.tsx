import Image from 'next/image'
import React from 'react'
import profileImage from '../../public/profile-image.png'
import { signOutAction } from '@/app/actions'
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
const Topbar = () => {
    return (
        <nav className="topbar bg-white shadow-lg p-4 h-[62px] rounded-lg flex justify-between items-center z-50">
            <p className="text-[21px]">Wednesday, 14 Jan 24</p>
            <div className="flex justify-end items-center gap-x-6 cursor-pointer">
                <IoNotificationsOutline className='w-7 h-7' />

                <div className="flex gap-x-4 items-center">
                    <div className="text-right">
                        <span className="text-grey">Sam Lee</span>
                        <p className="text-themeLight">Admin</p>
                    </div>
                    <Image src={profileImage} alt="" />
                    <MdOutlineLogout onClick={signOutAction} className='w-8 h-8 text-primary' />
                </div>
            </div>
        </nav>)
}

export default Topbar