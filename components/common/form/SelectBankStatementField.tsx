import React from "react";
import { useField } from "formik";
import Select from "react-select";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";
import { deleteBankStatement } from "@/services/pharmacyServices";
import { useDispatch } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Option {
  value: string;
  label: string;
}

interface SelectBankStatementFieldProps {
  label?: string;
  name: string;
  options: Option[];
  className?: string;
  parentClassName?: string;
  onDelete?: (value: string) => void;
}

const CustomOption = (props: any) => {
  const { data, selectProps, innerRef, innerProps } = props;
  const dispatch = useDispatch();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteBankStatement(dispatch, data.value);
  };

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', cursor: 'pointer' }}
    >
      <span>{data.label}</span>
      <button
        onClick={handleDelete}
        type="button"
        style={{
          backgroundColor: 'transparent',
          color: 'red',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px'
        }}
        title="Delete"
      >
        <IoCloseCircleOutline />
      </button>
    </div>
  );
};

const SelectBankStatementField: React.FC<SelectBankStatementFieldProps> = ({
  label,
  name,
  options,
  className,
  parentClassName,
  onDelete,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

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
        options={options}
        value={field.value || null}
        onChange={(option: any) => setValue(option)}
        components={{ Option: CustomOption }}
        isClearable
      />

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
      )}
    </div>
  );
};

export default SelectBankStatementField;
