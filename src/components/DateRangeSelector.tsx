import { useState, useEffect } from 'react';
import { format, subDays, isAfter, isBefore, parse } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import './DateRangeSelector.css';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Invalid date format');
    }
  };

  return (
    <div className={`date-range-selector ${className}`}>
      <div className="date-range-inputs">
        <div className="date-input-group">
          <label htmlFor="start-date">{labels.from}</label>
          <input
            id="start-date"
            type="date"
            value={format(dateRange.start, dateFormat)}
            onChange={(e) => handleDateChange('start', e.target.value)}
            max={format(dateRange.end, dateFormat)}
          />
        </div>

        <div className="date-input-group">
          <label htmlFor="end-date">{labels.to}</label>
          <input
            id="end-date"
            type="date"
            value={format(dateRange.end, dateFormat)}
            onChange={(e) => handleDateChange('end', e.target.value)}
            min={format(dateRange.start, dateFormat)}
          />
        </div>
      </div>

      {error && <div className="date-range-error">{error}</div>}
    </div>
  );
};
