import { format } from "date-fns";
import type { DateInputProps } from "../types";

export const DateInput = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  dateFormat,
}: DateInputProps) => {
  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-[#65676B] dark:text-gray-400 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="date"
          className="w-full h-10 px-3 bg-[#F0F2F5] dark:bg-[#3A3B3C] 
          border border-transparent hover:border-[#1b74e4] 
          rounded-lg text-[#050505] dark:text-gray-200
          focus:border-[#1b74e4] focus:ring-2 focus:ring-[#1b74e4]/30
          transition-all duration-200"
          value={format(value, dateFormat)}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};
