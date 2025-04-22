import React, { useState, useEffect, useRef } from "react";
import { useField } from "formik";
import { Label } from "../../ui/label";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SingleDateFieldProps {
  label?: string;
  name: string;
  className?: string;
}

const SingleDateField: React.FC<SingleDateFieldProps> = ({
  className,
  label,
  name,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (field.value) {
      setSelectedDate(new Date(field.value));
    }
  }, [field.value]);

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
    setSelectedDate(date);
    helpers.setValue(date ? date.toISOString().split("T")[0] : "");
  };

  return (
    <div ref={calendarRef} className={className}>
      {label && <Label className="text-xs text-grey">{label}</Label>}
      <div className="relative w-full">
        <div
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs items-center justify-between cursor-pointer"
          onClick={() => setOpenCalendar(!openCalendar)}
        >
          <span className="text-muted-foreground">
            {selectedDate ? selectedDate.toDateString() : "Select a date"}
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
              selected={selectedDate}
              onChange={handleDateChange}
              inline
            />
          </div>
        )}
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1 font-semibold">{meta.error}</p>
      )}
    </div>
  );
};

export default SingleDateField;
