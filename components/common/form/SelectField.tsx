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
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className,
  parentClassName,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  // Find the currently selected option
  const selectedOption = options.find(option => option.value === field.value);

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
        className={cn("text-xs", className)}
        classNamePrefix="react-select"
        value={selectedOption || null}
        onChange={(option: Option | null) => setFieldValue(name, option?.value || "")}
        options={options}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: '2.5rem',
            borderColor: meta.touched && meta.error ? '#f87171' : base.borderColor,
            fontSize: '0.75rem',
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
