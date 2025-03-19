import React, { useState } from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface MultiDateFieldProps {
    label?: string;
    name: string;
    className?: string;
}

const MultiDateField: React.FC<MultiDateFieldProps> = ({ className, label, name }) => {
    const [field, meta, helpers] = useField(name);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        if (newDate && !selectedDates.includes(newDate)) {
            const updatedDates = [...selectedDates, newDate];
            setSelectedDates(updatedDates);
            helpers.setValue(updatedDates); 
        }
    };

    const removeDate = (date: string) => {
        const updatedDates = selectedDates.filter(d => d !== date);
        setSelectedDates(updatedDates);
        helpers.setValue(updatedDates);
    };

    return (
        <div>
            {label && <Label className="text-xs text-grey">{label}</Label>}
            <div className="relative">
            <input
                type="date"
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                onChange={handleDateChange}
            />

            </div>
            
            
            {selectedDates.length > 0 && (
                <div className="mt-3">
                    <h4 className="text-xs text-gray-500">Selected Dates</h4>
                    <div className="mt-1 flex flex-col space-y-2">
                        {selectedDates.map((date) => (
                            <div key={date} className="flex items-center justify-between  text-xs px-3 py-2 rounded-md border border-gray-300">
                                {date}
                                <button type="button" onClick={() => removeDate(date)} className="ml-2 text-black-500">
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {meta.touched && meta.error && (
                <p className="text-red-500 text-sm">{meta.error}</p>
            )}
        </div>
    );
};

export default MultiDateField;
