import { SubmitButton } from '@/components/submit-button'
import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md'
interface FileDownloadFieldProps {
    title?: string;
    className?: string;
    parentClassName?: string;
}

const FileDownloadField = ({ title, className, parentClassName }: FileDownloadFieldProps) => {
    return (
        <SubmitButton type="button" className={`${parentClassName} w-full relative px-2 sm:px-8 text-primary bg-secondary hover:bg-transparent ${className}`}>
            <input
                type="file"
                className="absolute left-0 right-0 top-0 bottom-0 opacity-0"
            />
            <MdOutlineFileDownload className="w-4 h-4 md:w-5 md:h-5 text-primary" /> <p className="ml-2 text-xs md:text-sm">{title}</p>
        </SubmitButton>)
}

export default FileDownloadField