import { SubmitButton } from '@/components/submit-button'
import React from 'react'
import { MdOutlineFileDownload } from 'react-icons/md'
interface FileDownloadFieldProps {
    title?: string;
    className?: string;
}

const FileDownloadField = ({ title, className }: FileDownloadFieldProps) => {
    return (
        <SubmitButton type="button" className={`w-full relative px-8 text-primary bg-secondary hover:bg-transparent ${className}`}>
            <input
                type="file"
                className="absolute left-0 right-0 top-0 bottom-0 opacity-0"
            />
            <MdOutlineFileDownload className="w-5 h-5 text-primary" /> <p className="ml-2">{title}</p>
        </SubmitButton>)
}

export default FileDownloadField