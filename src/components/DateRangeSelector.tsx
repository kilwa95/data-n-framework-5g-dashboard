import { useState, useEffect } from 'react';
import { format, subDays, isAfter, isBefore, parse } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface DateRangeSelectorProps {
  onChange: (range: { start: Date; end: Date }) => void;
  format?: string;
  locale?: 'fr' | 'en';
  className?: string;
  labels?: {
    from: string;
    to: string;
  };
}

const locales = {
  fr,
  en: enUS,
};

export const DateRangeSelector = ({
  onChange,
  format: dateFormat = 'yyyy-MM-dd',
  locale = 'en',
  className = '',
  labels = { from: 'From', to: 'To' },
}: DateRangeSelectorProps) => {
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date(),
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onChange(dateRange);
  }, [dateRange, onChange]);

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    try {
      const newDate = parse(value, dateFormat, new Date(), {
        locale: locales[locale],
      });

      const newRange = {
        ...dateRange,
        [type]: newDate,
      };

      if (type === 'start' && isAfter(newDate, dateRange.end)) {
        setError('Start date cannot be after end date');
        return;
      }

      if (type === 'end' && isBefore(newDate, dateRange.start)) {
        setError('End date cannot be before start date');
        return;
      }

      setError(null);
      setDateRange(newRange);
    } catch (error) {
      setError('Invalid date format');
    }
  };

  return (
    <div
      className={`p-4 bg-white dark:bg-[#242526] rounded-lg shadow-md 
      border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="start-date"
            className="block text-[13px] font-medium text-[#65676B] dark:text-gray-400 mb-1.5"
          >
            {labels.from}
          </label>
          <div className="relative">
            <input
              id="start-date"
              type="date"
              className="w-full h-10 px-3 bg-[#F0F2F5] dark:bg-[#3A3B3C] 
              border border-transparent hover:border-[#1b74e4] 
              rounded-lg text-[#050505] dark:text-gray-200
              focus:border-[#1b74e4] focus:ring-2 focus:ring-[#1b74e4]/30
              transition-all duration-200"
              value={format(dateRange.start, dateFormat)}
              onChange={(e) => handleDateChange('start', e.target.value)}
              max={format(dateRange.end, dateFormat)}
            />
          </div>
        </div>

        <div className="flex-1">
          <label
            htmlFor="end-date"
            className="block text-[13px] font-medium text-[#65676B] dark:text-gray-400 mb-1.5"
          >
            {labels.to}
          </label>
          <div className="relative">
            <input
              id="end-date"
              type="date"
              className="w-full h-10 px-3 bg-[#F0F2F5] dark:bg-[#3A3B3C] 
              border border-transparent hover:border-[#1b74e4]
              rounded-lg text-[#050505] dark:text-gray-200
              focus:border-[#1b74e4] focus:ring-2 focus:ring-[#1b74e4]/30
              transition-all duration-200"
              value={format(dateRange.end, dateFormat)}
              onChange={(e) => handleDateChange('end', e.target.value)}
              min={format(dateRange.start, dateFormat)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div
          className="mt-3 px-3 py-2 bg-red-50 dark:bg-[#3E2729] 
        text-[13px] text-[#DC3545] dark:text-red-400 rounded-lg
        border-l-4 border-[#DC3545] animate-fadeIn"
        >
          {error}
        </div>
      )}
    </div>
  );
};
