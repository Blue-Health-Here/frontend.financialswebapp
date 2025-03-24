import React from 'react';
import { RxCross2 } from "react-icons/rx";
interface HeaderModalProps {
    title: string;
    onClose: () => void;
}

const HeaderModal: React.FC<HeaderModalProps> = ({ title, onClose }) => {
    return (
        <div className='flex justify-between items-center bg-whiteLight text-themeGrey w-full p-4'>
            <h2 className='text-sm sm:text-base md:text-lg'>{title}</h2>
            <button onClick={onClose}><RxCross2 className='w-4 h-4 md:w-5 md:h-5' /></button>
        </div>
    );
};

export default HeaderModal;
