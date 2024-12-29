import type { ToggleProps } from "../types";

export const Toggle = ({ checked, onChange, label }: ToggleProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className="w-11 h-6 bg-[#F0F2F5] dark:bg-[#3A3B3C] 
          peer-focus:outline-none peer-focus:ring-2 
          peer-focus:ring-[#1b74e4]/30
          rounded-full peer peer-checked:after:translate-x-full 
          peer-checked:after:border-white after:content-[''] 
          after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:border-gray-300 after:border 
          after:rounded-full after:h-5 after:w-5 after:transition-all
          peer-checked:bg-[#1b74e4]"
      />
      <span className="ml-3 text-sm font-medium text-[#050505] dark:text-gray-200">
        {label}
      </span>
    </label>
  );
};
