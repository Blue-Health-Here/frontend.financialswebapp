"use client"

import Image from "next/image";
import deleteIcon from "../../public/delete-icon.svg"
import editIcon from "../../public/edit-icon.svg"
import DeleteModal from "./DeleteModal";
import { useState } from "react";


export const InfoCard = ({ courseName }: { courseName: string }) => {
    const [isCloseModal, setIsCloseModal] = useState(false);
    const handleDelete = () => {
        console.log("Delete");
        setIsCloseModal(true);
    };

    return (
        <div className="flex items-center justify-between bg-white p-4 border rounded-lg shadow-sm w-full">
            <span className="font-medium">{courseName}</span>
            <div className="flex space-x-3 cursor-pointer">
                <Image src={deleteIcon} alt="" width={20} height={20} onClick={handleDelete} />
                <Image src={editIcon} alt="" width={20} height={20} />
            </div>
            {isCloseModal && <DeleteModal title={courseName.toUpperCase()} content={`<p className="text-base">
                    <span>Are you sure you want to delete this material?</span> <br />
                    <span>You'll not be able to recover it.</span>
                </p>`} handleClose={() => setIsCloseModal(false)} handleSuccess={() => console.log("handle success")} />}
        </div>
    );
};

export default InfoCard;
