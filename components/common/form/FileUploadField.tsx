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
    isMultiSelect?: boolean;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, name, className, isMultiSelect = false }) => {
    const [field, meta, helpers] = useField(name);
    const [preview, setPreview] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.currentTarget.files || []);
        console.log("Selected files:", files);
        if (isMultiSelect) {
            setPreview((prev) => [...prev, ...files]);
            helpers.setValue([...(field.value || []), ...files]);
        } else {
            setPreview(files.length > 0 ? [files[0]] : []);
            helpers.setValue(files.length > 0 ? files[0] : null);
        }
    };

    const handleDelete = (index: number) => {
        const updatedFiles = preview.filter((_, i) => i !== index);
        setPreview(updatedFiles);
        helpers.setValue(updatedFiles.length > 0 ? updatedFiles : null);
    };

    return (
        <>
            <div className="flex flex-col gap-y-3">
                {label && <Label size="xs" htmlFor={name}>{label}</Label>}
                <div className={`grid  ${isMultiSelect ? "grid-cols-3 gap-4" : "grid-cols-1"} `}>
                    {preview.map((file, index) => (
                        <FilePreview key={index} file={file} handleDelete={() => handleDelete(index)} />
                    ))}
                </div>

                <SubmitButton type="button" className={`relative mb-4 p-0 text-primary bg-white hover:bg-white border border-secondary ${className}`}>
                    <input
                        type="file"
                        multiple={isMultiSelect}
                        onChange={handleFileChange}
                        name={name}
                        className="absolute left-0 right-0 top-0 bottom-0 opacity-0"
                    />
                    <MdOutlineFileUpload className="w-5 h-5 text-primary" /> <p className="ml-2">Upload</p>
                </SubmitButton>
            </div>

            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm mt-1">{meta.error}</p>
            )}
        </>
    );
};

export default FileUploadField;
