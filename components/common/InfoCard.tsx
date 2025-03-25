"use client"

import Image from "next/image";
import deleteIcon from "../../public/delete-icon.svg"
import editIcon from "../../public/edit-icon.svg"
import DeleteModal from "./DeleteModal";
import { useState } from "react";

interface InfoCardProps { 
    id: string; 
    name: string; 
    item?: any;
    handleEdit?: Function 
    handleDeleteModal?: (id: string) => void 
};

const InfoCard: React.FC<InfoCardProps> = ({ id, name, item, handleEdit, handleDeleteModal }) => {
    const [isCloseModal, setIsCloseModal] = useState(false);
    const handleDelete = () => {
        setIsCloseModal(true);
    };

    const handleSuccess = () => {
        if (handleDeleteModal) handleDeleteModal(id);
        setIsCloseModal(false);
        return undefined;
    }

    return (
        <div className="flex items-center justify-between bg-white p-4 border rounded-lg shadow-sm w-full">
            <span className="text-xs sm:text-sm mdtext-[16px] font-medium">{name}</span>
            <div className="flex space-x-3 cursor-pointer">
                <Image src={deleteIcon} alt="" width={15} height={15} className="md:w-[20px] md:h-[20px]"onClick={handleDelete} />
                <Image src={editIcon} alt="" width={15} height={15} className="md:w-[20px] md:h-[20px]" onClick={() => handleEdit && handleEdit(item)} />
            </div>
            {isCloseModal && <DeleteModal title={name.toUpperCase()} content={`<p className="text-base">
                    <span>Are you sure you want to delete this ${name}?</span> <br />
                    <span>You'll not be able to recover it.</span>
                </p>`} handleClose={() => setIsCloseModal(false)} handleSuccess={handleSuccess} />}
        </div>
    );
};

export default InfoCard;
