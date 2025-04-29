import React, { useState, useEffect, useRef } from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { X, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MultiDateFieldProps {
  label?: string;
  name: string;
  className?: string;
}

const MultiDateField: React.FC<MultiDateFieldProps> = ({
  className,
  label,
  name,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (field.value && Array.isArray(field.value) && field.value.length > 0) {
      const dates = field.value.map(dateStr => 
        typeof dateStr === 'string' ? new Date(dateStr) : dateStr
      );
      console.log("dates",dates)
      setSelectedDates(dates);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setOpenCalendar(false);
      }
    }

    if (openCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCalendar]);

  const handleDateChange = (date: Date | null) => {
    if (date && !selectedDates.find((d) => d.getTime() === date.getTime())) {
      const updatedDates = [...selectedDates, date];
      setSelectedDates(updatedDates);
      
      const formattedDates = updatedDates.map(d => 
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      );
      
      helpers.setValue(formattedDates);
    }
  };

  const removeDate = (date: Date) => {
    const updatedDates = selectedDates.filter(
      (d) => d.getTime() !== date.getTime()
    );
    setSelectedDates(updatedDates);
    
    const formattedDates = updatedDates.map(d => 
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    );
    
    helpers.setValue(formattedDates);
  };

  return (
    <div ref={calendarRef}>
      {label && <Label className="text-xs text-grey">{label}</Label>}
      <div className="relative w-full">
        <div
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs items-center justify-between cursor-pointer"
          onClick={() => setOpenCalendar(!openCalendar)}
        >
          <span className={selectedDates.length === 0 ? "text-muted-foreground" : ""}>
            {selectedDates.length === 0 ? "Select a date" : `${selectedDates.length} date(s) selected`}
          </span>
          <Calendar size={14} className="text-gray-500" />
        </div>
        {openCalendar && (
          <div
            className="absolute left-0 bottom-full z-50 bg-white shadow-lg border rounded-md"
            style={{
              padding: 0,
              margin: 0,
              lineHeight: 0,
              display: "inline-block",
              overflow: "hidden",
              boxSizing: "border-box",
              width: "max-content",
            }}
          >
            <DatePicker
              selected={selectedDates[selectedDates.length - 1] || null}
              onChange={handleDateChange}
              highlightDates={selectedDates}
              inline
            />
          </div>
        )}
      </div>

      {selectedDates.length > 0 && (
        <div className="mt-3">
          <h4 className="text-xs text-gray-500">Selected Dates</h4>
          <div className="mt-1 flex flex-col space-y-2">
            {selectedDates.map((date) => (
              <div
                key={date.getTime()}
                className="flex items-center justify-between text-xs px-3 py-2 rounded-md border border-gray-300"
              >
                {date.toDateString()}
                <button
                  type="button"
                  onClick={() => removeDate(date)}
                  className="ml-2 text-black-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
      )}
    </div>
  );
};

export default MultiDateField;