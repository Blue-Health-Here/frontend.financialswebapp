import Image from 'next/image'
import React from 'react'
import authImage from "../../public/auth-image.svg"

function AuthBackgroundImage() {
    return (
        <div className="flex-[3] bg-[#F8F8F8] justify-center items-center hidden md:flex">
            <Image src={authImage} alt="Auth Image" />
        </div>
    )
}

export default AuthBackgroundImage