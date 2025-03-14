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
    title?: string;
    isMultiSelect?: boolean;
    description?: string;
    variant?: "button" | "dropzone";
    id?: string
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
    label,
    name,
    className = "",
    title,
    description,
    isMultiSelect = false,
    variant = "button",
    id
}) => {
    const [field, meta, helpers] = useField(name);
    const [preview, setPreview] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.currentTarget.files || []);
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
        <div className="flex flex-col gap-4">
            <div className="flex justify-center md:justify-start">
            {label && <Label size="xs" className="text-[#6E6B7B]" htmlFor={name}>{label}</Label>}
            </div>

            {preview.length > 0 && (
                <div className={`grid ${isMultiSelect ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "grid-cols-1"}`}>
                    {preview.map((file, index) => (
                        <FilePreview key={index} file={file} handleDelete={() => handleDelete(index)} />
                    ))}
                </div>
            )}
         <div className="flex justify-center md:justify-start">
            {variant === "button" ? (
                // Button-style upload
                <SubmitButton type="button" className={`w-full relative p-0 text-primary bg-white hover:bg-white border border-secondary ${className}`}>
                    <input
                        type="file"
                        multiple={isMultiSelect}
                        onChange={handleFileChange}
                        name={name}
                        className="absolute left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
                    />
                    <MdOutlineFileUpload className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <p className="ml-2 text-xs md:text-sm">{title}</p>
                </SubmitButton>
            ) : (
                // Dropzone-style upload
                <div className="flex justify-center items-center border-dashed border h-[193px] border-black rounded-lg p-4 cursor-pointer hover:border-primary relative">
                    <label htmlFor={id} className="flex flex-col items-center cursor-pointer">
                        <MdOutlineFileUpload className="w-10 h-10 text-[#969696]" />
                        <h2 className="font-semibold">{title}</h2>
                        {description && <p className="text-xs text-[#969696]">{description}</p>}
                    </label>
                    <input
                        id={id}
                        type="file"
                        multiple={isMultiSelect}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

            )}
</div>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm mt-1">{meta.error}</p>
            )}
        </div>
    );
};

export default FileUploadField;
