import React, { useState } from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { SubmitButton } from "@/components/submit-button";
import FilePreview from "../FilePreview";
import { MdOutlineFileUpload } from "react-icons/md";

interface FileUploadFieldProps {
    label?: string;
    name: string;
    className?: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, name, className }) => {
    const [field, meta, helpers] = useField(name);
    const [preview, setPreview] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        helpers.setValue(file);
        if (file) {
            setPreview(file)
        }
    };

    return (
        <>
            {label && <Label size="xs" htmlFor={name}>{label}</Label>}
            {preview && (
                <FilePreview file={field.value as File} handleDelete={() => {
                    helpers.setValue(null)
                    setPreview(null)
                }} />
            )}
            <SubmitButton type="button" className="relative p-0 text-primary bg-white hover:bg-white border border-secondary">
                <input type="file" onChange={handleFileChange} name={name} className="absolute left-0 right-0 top-0 bottom-0 opacity-0" />
                <MdOutlineFileUpload className="w-5 h-5 text-primary" /> <p className="ml-2">Upload</p>
            </SubmitButton>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm mt-1">{meta.error}</p>
            )}
        </>
    );
};

export default FileUploadField;
