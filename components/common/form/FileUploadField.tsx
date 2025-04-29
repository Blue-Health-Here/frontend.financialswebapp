import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { Label } from "../../ui/label";
import { SubmitButton } from "@/components/submit-button";
import FilePreview from "../FilePreview";
import { MdOutlineFileUpload } from "react-icons/md";
import { UploadedFileProps } from "@/utils/types";
import { useDispatch } from "react-redux";
import { deleteUploadedFile } from "@/services/deleteFile";
import { addNewPaymentReconciliationInitialchema } from "@/utils/validationSchema";
import * as Yup from "yup";

interface FileUploadFieldProps {
    module?: string;
    label?: string;
    name: string;
    className?: string;
    title?: string;
    isMultiSelect?: boolean;
    description?: string;
    variant?: "button" | "dropzone";
    id?: string;
    onChange?: Function;
    type?: string;
    uploadedFile?: UploadedFileProps | null | any;
    setUploadedFile?: (file: UploadedFileProps | null) => void;
    handleFileUpload?: (event: any, setValue: (value: any) => void) => void;
};

const FileUploadField: React.FC<FileUploadFieldProps> = ({
    module,
    label,
    name,
    className = "",
    title,
    description,
    isMultiSelect = false,
    variant = "button",
    id,
    uploadedFile,
    onChange,
    type,
    setUploadedFile,
    handleFileUpload,
}) => {
    const [field, meta, helpers] = useField(name);
    const [preview, setPreview] = useState<File[]>([]);
    const dispatch = useDispatch();
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange && type) {
            return onChange(event, type);
        } else if (onChange) {
            return onChange(event, helpers.setValue, field.value);
        }
        
        if (handleFileUpload) {
            handleFileUpload(event, helpers.setValue);
        } else {
            const files = Array.from(event.currentTarget.files || []);
            if (isMultiSelect) {
                setPreview((prev) => [...prev, ...files]);
                helpers.setValue([...(field.value || []), ...files]);
            } else {
                setPreview(files.length > 0 ? [files[0]] : []);
                helpers.setValue(files.length > 0 ? files[0] : null);
            }
        }
    };

    useEffect(() => {
        if (!field.value) {
            setPreview([]);
        }
    }, [field.value]);
    
    const handleDelete = async (index?: number) => {
        if (uploadedFile && module) {
            await deleteUploadedFile(dispatch, module, uploadedFile.filename);
            if (setUploadedFile) setUploadedFile(null);
            helpers.setValue(null);
        } else {
            const updatedFiles = preview.filter((_, i) => i !== index);
            setPreview(updatedFiles);
            helpers.setValue(updatedFiles.length > 0 ? updatedFiles : null);
        }
    };

    return (
        <div>
            {label && <Label size="xs" className="text-grey" htmlFor={name}>{label}</Label>}
            {uploadedFile ? (
                <FilePreview
                    file={{ name: uploadedFile.filename, file_url: uploadedFile.file_url }}
                    handleDelete={handleDelete}
                />
            ) : (
                <div className="flex justify-center md:justify-start flex-col gap-2">
                    {preview.length > 0 && (
                        <div className={`grid ${isMultiSelect ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "grid-cols-1"}`}>
                            {preview.map((file, index) => (
                                <FilePreview key={index} file={file} handleDelete={() => handleDelete(index)} />
                            ))}
                        </div>
                    )}
                    {variant === "button" ? (
                        <>
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
                            {meta.touched && meta.error && (
                                <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
                            )}
                        </>
                    ) : (
                        // Dropzone-style upload
                        <div className="flex justify-center items-center border-dashed border h-[140px] md:h-[193px] border-black rounded-lg p-4 cursor-pointer hover:border-primary relative">
                            <label htmlFor={id} className="flex flex-col items-center cursor-pointer">
                                <MdOutlineFileUpload className="w-7 h-7 md:w-10 md:h-10 text-[#969696]" />
                                <h2 className="font-semibold text-sm sm:text-lg md:text-xl text-center">{title}</h2>
                                {description && <p className="text-xs text-center text-[#969696]">{description}</p>}
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
                    {meta.touched && meta.error && (
                        <p className="text-red-500 text-center text-xs mt-1 font-semibold">{meta.error}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUploadField;
