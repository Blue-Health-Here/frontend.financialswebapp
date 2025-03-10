"use client"
import Image from "next/image";
import { MdOutlineFileDownload } from 'react-icons/md'


interface FilePreviewProps {
    file: File;
    handleDelete: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, handleDelete, }) => {
    return (
        <div className="h-9 flex items-center justify-between bg-white p-5 border rounded-lg shadow-sm w-full">
            <span className="">{file.name}</span>
            <div className="flex space-x-3 cursor-pointer">
                <MdOutlineFileDownload className="text-grey" size={20} />
                <Image src="/delete-icon.svg" alt="delete-icon" width={15} height={15} onClick={handleDelete} />
            </div>
        </div>
    );
};

export default FilePreview;
