import React from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";

interface RadioOption {
    value: string;
    label: string;
}

interface RadioFieldProps {
    label: string;
    name: string;
    options: RadioOption[];
    className?: string;
    ref?: any;
}

const RadioField: React.FC<RadioFieldProps> = ({ className, ref, label, options, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <Label size="xs">{label}</Label>
            <div className="space-y-2">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            type="radio"
                            id={`${props.name}-${option.value}`}
                            className={cn(
                                "h-4 w-4 text-themeLight border-input bg-background focus:ring-themeLight",
                                className,
                            )}
                            ref={ref}
                            {...field}
                            {...props}
                            value={option.value}
                            checked={field.value === option.value}
                        />
                        <Label
                            size="xs"
                            htmlFor={`${props.name}-${option.value}`}
                            className="ml-2"
                        >
                            {option.label}
                        </Label>
                    </div>
                ))}
            </div>
            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm">{meta.error}</p>
            )}
        </div>
    );
};

export default RadioField;