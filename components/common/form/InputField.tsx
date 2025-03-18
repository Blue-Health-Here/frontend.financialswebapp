import React from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";

interface InputFieldProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    className?: string;
    Icon?: React.ComponentType<{ className?: string }>;
}

const InputField: React.FC<InputFieldProps> = ({ className, label, Icon, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            {label && <Label className="text-grey">{label}</Label>}
            <div className="relative">
                <input
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    {...props}
                    {...field}
                />
                {Icon && (
                    <span className="h-5 w-5 absolute right-3 top-2.5 text-gray-500 cursor-pointer">
                        <Icon />
                    </span>
                )}
            </div>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm">{meta.error}</p>
            )}
        </div>
    );
};

export default InputField;
