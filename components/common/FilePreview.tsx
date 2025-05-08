"use client"
import axiosAdmin from "@/lib/axiosAdmin";
import Image from "next/image";
import toast from "react-hot-toast";
import { MdOutlineFileDownload } from 'react-icons/md'

interface FilePreviewProps {
    file?: any;
    handleDelete?: () => void;
    disabled?: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, handleDelete, disabled = false}) => {
    const fileDownload = async () => {
        try {
            const response = await axiosAdmin.get(file.file_url, {responseType: "blob",});
            const contentType = response.headers["content-type"] || "application/octet-stream";
    
            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = file.name;
            link.click();

            window.URL.revokeObjectURL(url);
            toast.success("File download Successfully.");
        } catch (error: any) {
            toast.error(error?.message || "Failed to download file.");
        }
    };

    return (
        <div className={`flex items-center justify-between bg-white px-4 py-2.5 border rounded-lg shadow-sm w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <span className={`text-sm break-words line-clamp-1 pr-4 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={disabled ? undefined : fileDownload}>{file.name}</span>
            <div className="flex space-x-3 cursor-pointer">
                <MdOutlineFileDownload className={`text-grey w-6 h-6 ${disabled ? 'cursor-not-allowed' : ''}`} size={20} onClick={disabled ? undefined : fileDownload} />
                    <Image src="/delete-icon.svg" alt="delete-icon" className={`${disabled ? 'cursor-not-allowed' : ''}`} width={15} height={15} onClick={disabled ? undefined : handleDelete} />
            </div>
        </div>
    );
};

export default FilePreview;