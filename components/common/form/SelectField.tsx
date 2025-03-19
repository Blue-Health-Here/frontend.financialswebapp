import React from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
    label?: string;
    name: string;
    options: { value: string; label: string }[];
    className?: string;
    parentClassName?: string;
    ref?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({ className, parentClassName, ref, label, name, options, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className={parentClassName}>
            {label && <Label size="xs" htmlFor={name}>{label}</Label>}
            <select
                id={name}
                className={cn(
                    "flex h-10 w-full text-xs rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
                {...field}
            >
                <option value="">Select an option</option> {/* Added empty default option */}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
            )}
        </div>
    );
};

export default SelectField;
