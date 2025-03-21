"use client"
import Image from "next/image";
import { MdOutlineFileDownload } from 'react-icons/md'


interface FilePreviewProps {
    file?: any;
    handleDelete?: () => void;
}


const FilePreview: React.FC<FilePreviewProps> = ({ file, handleDelete, }) => {

    const fileDownload = () => {
        if (!file) {
            console.error('No file available for download.');
            return;
        }
    
        try {
            const blob = new Blob([file]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            console.log("File Content:", file);
            console.log("File Type:", file.filename);
            console.log("File url:", file.file_url); 

            link.href = url;
            link.download = file.file_url || 'downloaded-file';
            document.body.appendChild(link);
            link.click();
                document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error during file download:', error);
        }
    };
    
    
    return (
        <div className="flex items-center justify-between bg-white px-4 py-2  border rounded-lg shadow-sm w-full">
            <span className="text-sm">{file.name}</span>
            <div className="flex space-x-3 cursor-pointer">
                <MdOutlineFileDownload className="text-grey" size={20} onClick={fileDownload} />
                <Image src="/delete-icon.svg" alt="delete-icon" width={15} height={15} onClick={handleDelete} />
            </div>
        </div>
    );
};

export default FilePreview;