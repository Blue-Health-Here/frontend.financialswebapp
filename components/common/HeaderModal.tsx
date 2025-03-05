import React from 'react';
import { SubmitButton } from '../submit-button';

interface HeaderModalProps {
    title: string;
    onClose: () => void;
}

const HeaderModal: React.FC<HeaderModalProps> = ({ title, onClose }) => {
    return (
        <div className='flex justify-between items-center bg-[#F8F8F8] text-[#5E5873] w-96 h-[45px] p-8 pl-5 pr-5'>
            <h2>{title}</h2>
            <button className='text-2xl' onClick={onClose}>X</button>
        </div>
    );
};

export default HeaderModal;
