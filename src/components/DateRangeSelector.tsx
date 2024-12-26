import { useState, useEffect } from 'react';
import { format, subDays, isAfter, isBefore, parse } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import type { DateRangeSelectorProps } from './types';
import { DateInput } from './DateInput';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <DateInput
          id="start-date"
          label={labels.from}
          value={dateRange.start}
          onChange={(value) => handleDateChange('start', value)}
          max={format(dateRange.end, dateFormat)}
          dateFormat={dateFormat}
        />

        <DateInput
          id="end-date"
          label={labels.to}
          value={dateRange.end}
          onChange={(value) => handleDateChange('end', value)}
          min={format(dateRange.start, dateFormat)}
          dateFormat={dateFormat}
        />
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
