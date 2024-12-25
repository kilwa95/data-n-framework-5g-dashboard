import { useState, useEffect } from 'react';

interface EligibilityOption {
  id: string;
  label: string;
  value: boolean;
}

interface EligibilityFilterProps {
  onChange: (selections: Record<string, boolean>) => void;
  initialValues?: Record<string, boolean>;
  className?: string;
}

export const EligibilityFilter = ({
  onChange,
  initialValues = {},
  className = '',
}: EligibilityFilterProps) => {
  const defaultOptions: EligibilityOption[] = [
    { id: 'can_subscribe', label: 'Eligible', value: false },
    { id: 'is_ztd', label: 'ZTD', value: false },
    { id: 'found_coverage', label: 'Found Coverage', value: false },
    { id: 'sector_capacity', label: 'Sector Capacity', value: false },
    { id: 'active_4g', label: 'Active 4G', value: false },
    { id: 'active_5g', label: 'Active 5G', value: false },
  ];

  const [options, setOptions] = useState<EligibilityOption[]>(
    defaultOptions.map((option) => ({
      ...option,
      value: initialValues[option.id] ?? option.value,
    }))
  );

  useEffect(() => {
    const selections = options.reduce(
      (acc, option) => ({
        ...acc,
        [option.id]: option.value,
      }),
      {}
    );
    onChange(selections);
  }, [options, onChange]);

  const handleOptionChange = (id: string, newValue: boolean) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: newValue } : option
      )
    );
  };

  const handleReset = () => {
    setOptions(defaultOptions);
  };

  return (
    <div
      className={`p-4 bg-white dark:bg-[#242526] rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={option.value}
                onChange={(e) =>
                  handleOptionChange(option.id, e.target.checked)
                }
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
                {option.label}
              </span>
            </label>
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
