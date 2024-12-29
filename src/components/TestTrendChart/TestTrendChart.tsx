import { useState, useEffect, useMemo } from 'react';
import { TestTrendLineChart } from '../TestTrendLineChart';
import { FrequencyType, TestTrendChartProps } from '../types';
import { FrequencySelector } from '../FrequencySelector';
import { formatters } from '../../utils/dateFormatters';

export const TestTrendChart = ({
  data,
  frequency,
  onFrequencyChange,
  loading = false,
  className = '',
}: TestTrendChartProps) => {
  const [activeFrequency, setActiveFrequency] =
    useState<FrequencyType>(frequency);

  useEffect(() => {
    setActiveFrequency(frequency);
  }, [frequency]);

  const handleFrequencyChange = (newFrequency: FrequencyType) => {
    setActiveFrequency(newFrequency);
    onFrequencyChange(newFrequency);
  };

  const formattedData = useMemo(() => {
    return data.map((point) => ({
      ...point,
      formattedTimestamp: formatters[frequency](point.timestamp),
    }));
  }, [data, frequency]);

  return (
    <div
      className={`p-4 bg-white dark:bg-[#242526] rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[13px] font-medium text-[#65676B] dark:text-gray-400">
          Tendance des tests par période
        </h3>
        <FrequencySelector
          activeFrequency={activeFrequency}
          onFrequencyChange={handleFrequencyChange}
        />
      </div>

      <div className="relative h-[300px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#242526]/50 z-10">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <TestTrendLineChart data={formattedData} />
      </div>
    </div>
  );
};
