import { LocationSelectProps } from "./types";

export const LocationSelect = ({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  isDisabled,
  isLoading,
}: LocationSelectProps) => (
  <div className="flex-1">
    <label
      htmlFor={id}
      className="block text-[13px] font-medium text-[#65676B] dark:text-gray-400 mb-1.5"
    >
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        className="w-full h-10 px-3 bg-[#F0F2F5] dark:bg-[#3A3B3C] 
          border border-transparent hover:border-[#1b74e4] 
          rounded-lg text-[#050505] dark:text-gray-200
          focus:border-[#1b74e4] focus:ring-2 focus:ring-[#1b74e4]/30
          transition-all duration-200 appearance-none"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
      >
        <option value="">{isLoading ? "Loading..." : placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
);
