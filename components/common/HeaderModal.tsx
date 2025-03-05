import React from 'react';
import { RxCross2 } from "react-icons/rx";
interface HeaderModalProps {
    title: string;
    onClose: () => void;
}

const HeaderModal: React.FC<HeaderModalProps> = ({ title, onClose }) => {
    return (
        <div className='flex justify-between items-center bg-[#F8F8F8] text-[#5E5873] w-96 h-[45px] p-8 pl-5 pr-5'>
            <h2 className='text-lg'>{title}</h2>
            <button onClick={onClose}><RxCross2 className='w-5 h-5' /></button>
        </div>
    );
};

export default HeaderModal;
