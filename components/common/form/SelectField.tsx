import React from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
    label?: string;
    name: string;
    options: { value: string; label: string }[];
    className?: string;
    ref?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({ className, ref, label, options, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            {label && <Label size="xs" htmlFor={props.name}>{label}</Label>}
            <select
                className={cn(
                    "flex h-10 w-full text-xs rounded-md placeholder:text-themeLight border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
                {...field}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm">{meta.error}</p>
            )}
        </div>
    );
};

export default SelectField;