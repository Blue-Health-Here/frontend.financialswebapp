"use client"
import axiosAdmin from "@/lib/axiosAdmin";
import Image from "next/image";
import toast from "react-hot-toast";
import { MdOutlineFileDownload } from 'react-icons/md'


interface FilePreviewProps {
    file?: any;
    handleDelete?: () => void;
}


const FilePreview: React.FC<FilePreviewProps> = ({ file, handleDelete, }) => {


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
        <div className="flex items-center justify-between bg-white px-4 py-2  border rounded-lg shadow-sm w-full">
            <span className="text-sm cursor-pointer" onClick={fileDownload}>{file.name}</span>
            <div className="flex space-x-3 cursor-pointer">
                <MdOutlineFileDownload className="text-grey" size={20} onClick={fileDownload} />
                <Image src="/delete-icon.svg" alt="delete-icon" width={15} height={15} onClick={handleDelete} />
            </div>
        </div>
    );
};

export default FilePreview;