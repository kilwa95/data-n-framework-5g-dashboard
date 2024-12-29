import { useState, useEffect } from "react";
import { EligibilityOption } from "../types";
import { EligibilityFilterProps } from "../types";
import { Toggle } from "./Toggle";
import { defaultEligibilityOptions } from "../constants";

export const EligibilityFilter = ({
  onChange,
  initialValues = {},
  className = "",
}: EligibilityFilterProps) => {
  const [options, setOptions] = useState<EligibilityOption[]>(
    defaultEligibilityOptions.map((option) => ({
      ...option,
      value: initialValues[option.id] ?? option.value,
    })),
  );

  useEffect(() => {
    const selections = options.reduce(
      (acc, option) => ({
        ...acc,
        [option.id]: option.value,
      }),
      {},
    );
    onChange(selections);
  }, [options, onChange]);

  const handleOptionChange = (id: string, newValue: boolean) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: newValue } : option,
      ),
    );
  };

  const handleReset = () => {
    setOptions(defaultEligibilityOptions);
  };

  return (
    <div
      className={`p-4 bg-white dark:bg-[#242526] rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <Toggle
              checked={option.value}
              onChange={(checked) => handleOptionChange(option.id, checked)}
              label={option.label}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 text-sm text-[#1b74e4] hover:bg-[#F0F2F5] 
          dark:hover:bg-[#3A3B3C] rounded-lg transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};
