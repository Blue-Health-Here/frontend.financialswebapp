import React from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    className?: string;
    ref?: any;
}

const InputField: React.FC<InputFieldProps> = ({ className, ref, label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <Label size="xs" htmlFor={props.name}>{label}</Label>
            <input
                className={cn(
                    "flex h-10 w-full rounded-md placeholder:text-themeLight border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={ref}
                {...props}
                {...field}
            />
            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm">{meta.error}</p>
            )}
        </div>
    );
};

export default InputField;
