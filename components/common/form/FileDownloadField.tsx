import { SubmitButton } from '@/components/submit-button'
import axiosAdmin from '@/lib/axiosAdmin';
import { FileDownloadFieldProps } from '@/utils/types';
import React from 'react'
import toast from 'react-hot-toast';
import { MdOutlineFileDownload } from 'react-icons/md'

const FileDownloadField = ({ title, className, parentClassName, iconcolor = 'text-primary' }: FileDownloadFieldProps) => {
    return (
        <SubmitButton type="button" className={`${parentClassName} w-full relative px-2 sm:px-8 text-primary bg-secondary hover:bg-transparent ${className}`}>
            <div
                className="absolute left-0 right-0 top-0 bottom-0 opacity-0"
            />
            <MdOutlineFileDownload className={`w-4 h-4 md:w-5 md:h-5 ${iconcolor}`}/> <p className="ml-2 text-xs md:text-sm">{title}</p>
        </SubmitButton>)
}

export default FileDownloadField