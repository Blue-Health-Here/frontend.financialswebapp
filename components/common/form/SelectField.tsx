import React from "react";
import { useField, useFormikContext } from "formik";
import Select from "react-select";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  name: string;
  options: Option[];
  className?: string;
  parentClassName?: string;
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: (e: { target: { value: string, name: string } }) => void;
  value?: string;
  variant?: "default" | "borderless";
  borderRadius?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className,
  parentClassName,
  isDisabled = false,
  placeholder,
  onChange,
  value,
  variant = "default",
  borderRadius = "0.5rem",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  // Find the currently selected option
  const selectedOption = options.find(option =>
    value !== undefined ? option.value === value : option.value === field.value
  );

  const handleChange = (option: Option | null) => {
    const newValue = option?.value || "";
    setFieldValue(name, newValue);
    // If external onChange handler exists, call it with an event-like object
    if (onChange) {
      const syntheticEvent = {
        target: {
          name: name,
          value: newValue
        }
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={parentClassName}>
      {label && (
        <Label size="xs" htmlFor={name}>
          {label}
        </Label>
      )}

      <Select
        inputId={name}
        name={name}
        className={cn(
          "text-xs placeholder:text-themeLight placeholder:text-muted-foreground",
          variant === "borderless" && "rounded-lg shadow-lg",
          className
        )}
        classNamePrefix="react-select"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isDisabled={isDisabled}
        placeholder={placeholder}
      styles={{
  control: (base) => ({
    ...base,
    minHeight: '2.5rem',
    borderColor: meta.touched && meta.error ? '#f87171' :
                variant === "borderless" ? 'transparent' : base.borderColor,
    boxShadow: variant === "borderless" ? 'none' : base.boxShadow,
    fontSize: '0.75rem',
    ...(variant === "borderless" && {
      backgroundColor: 'white',
      border: 'none',
      borderRadius: borderRadius || '0.375rem',
    }),
  }),
  placeholder: (base) => ({
    ...base,
    color: "#B9B9C3",
    fontSize: "14px",
  }),
}}
      />

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
      )}
    </div>
  );
};

export default SelectField;