import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { DateInput } from '../forms/DateInput';
import { ErrorMessage } from '../ErrorMessage';
import { validateDateChange } from '../../utils/dateRangeValidation';
import { DateRangeSelectorProps } from '../types';

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
    const result = validateDateChange(
      type,
      value,
      dateRange,
      dateFormat,
      locales[locale]
    );

    setError(result.error);
    if (result.newRange) {
      setDateRange(result.newRange);
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

      {error && <ErrorMessage message={error} />}
    </div>
  );
};
