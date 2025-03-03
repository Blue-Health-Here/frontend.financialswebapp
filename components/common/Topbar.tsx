import Image from 'next/image'
import React from 'react'
import profileImage from '../../public/profile-image.png'
import notificatioIcon from '../../public/notification-icon.svg'
import exitIcon from '../../public/navbar-exit-right.svg'
import { signOutAction } from '@/app/actions'
const Topbar = () => {
    return (
        <nav className="topbar bg-white shadow-lg p-4 h-[62px] rounded-lg flex justify-between items-center z-50">
            <p className="text-[21px]">Wednesday, 14 Jan 24</p>
            <div className="flex justify-end items-center gap-x-6 cursor-pointer">
                <Image src={notificatioIcon} alt="" width={17} height={19} />
                <div className="flex gap-x-4 items-center">
                    <div className="text-right">
                        <span className="text-grey">Sam Lee</span>
                        <p className="text-themeLight">Admin</p>
                    </div>
                    <Image src={profileImage} alt="" />
                    <Image src={exitIcon} alt="" onClick={signOutAction} />
                </div>
            </div>
        </nav>)
}

export default Topbar