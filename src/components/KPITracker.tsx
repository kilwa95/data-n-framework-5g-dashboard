import { useState, useEffect } from 'react';

interface KPITrackerProps {
  title?: string;
  value: number;
  loading?: boolean;
  formatter?: (value: number) => string;
  className?: string;
  refreshInterval?: number;
  onRefresh?: () => Promise<number>;
}

export const KPITracker = ({
  title = 'Nombre de tests d\'éligibilité 5G Box',
  value: initialValue,
  loading = false,
  formatter = (val) => new Intl.NumberFormat('fr-FR').format(val),
  className = '',
  refreshInterval,
  onRefresh,
}: KPITrackerProps) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!refreshInterval || !onRefresh) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const newValue = await onRefresh();
        setValue(newValue);
      } catch (error) {
        console.error('Failed to refresh KPI value:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, onRefresh]);

  return (
    <div
      className={`p-4 bg-white dark:bg-[#242526] rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <h3 className="text-[13px] font-medium text-[#65676B] dark:text-gray-400 mb-1.5">
        {title}
      </h3>
      <div className="relative">
        <div
          className={`text-[32px] font-semibold text-[#050505] dark:text-gray-200 
            ${isLoading ? 'opacity-50' : ''}`}
        >
          {formatter(value)}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
