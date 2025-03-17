import React from "react";
import Select from "react-select";
import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface OptionType {
    label?: string;
    value: string | number;
}

interface MultiSelectFieldProps {
    label?: string;
    name: string;
    options: OptionType[];
    className?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps & React.ComponentProps<typeof Select>> = ({
    label,
    name,
    options,
    className,
    ...props
}) => {
    const [field, meta, helpers] = useField(name);

    const allValues = options.filter(option => option.value !== "all").map(option => option.value);

    const handleChange = (selectedOptions: OptionType[]) => {
        const values = selectedOptions.map(option => option.value);

        if (values.includes("all")) {
            helpers.setValue(allValues);
        } else {
            helpers.setValue(values);
        }
    };

    return (
        <div>
            {label && <Label size="xs" className="text-grey" htmlFor={name}>{label}</Label>}
            <Select
                className={cn(
                    "flex w-full rounded-md placeholder:text-themeLight !border !border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                {...field}
                {...props}
                options={options}
                // value={options.filter(option => field.value.includes(option.value))}
                value={options.find(option => option.value === field.value)}
                onChange={(selected) => handleChange(selected as OptionType[])}
                onBlur={() => helpers.setTouched(true)}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderWidth: 0,
                        width: "100%",
                        borderRadius: 6,
                        "&:hover": {
                            borderWidth: 0,
                            borderColor: "hsl(0 0% 89.8%)"
                        },
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#B9B9C3", // Change placeholder color
                        fontSize: "14px", // Optional: Adjust font size
                    }),
                }}
            />
            {meta.touched && meta.error ? (
                <div style={{ color: "red", fontSize: "12px" }}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MultiSelectField;
