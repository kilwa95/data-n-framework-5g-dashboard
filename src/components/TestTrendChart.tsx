import { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

type FrequencyType = 'hourly' | 'daily' | 'monthly';

interface DataPoint {
  timestamp: string;
  value: number;
}

interface TestTrendChartProps {
  data: DataPoint[];
  frequency: FrequencyType;
  onFrequencyChange: (frequency: FrequencyType) => void;
  loading?: boolean;
  className?: string;
}

const formatters = {
  hourly: (timestamp: string) =>
    format(parseISO(timestamp), 'HH:mm', { locale: fr }),
  daily: (timestamp: string) =>
    format(parseISO(timestamp), 'dd MMM', { locale: fr }),
  monthly: (timestamp: string) =>
    format(parseISO(timestamp), 'MMM yyyy', { locale: fr }),
};

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
        <div className="flex gap-2">
          {(['hourly', 'daily', 'monthly'] as FrequencyType[]).map((freq) => (
            <button
              key={freq}
              onClick={() => handleFrequencyChange(freq)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors
                ${
                  activeFrequency === freq
                    ? 'bg-[#1b74e4] text-white'
                    : 'bg-[#F0F2F5] dark:bg-[#3A3B3C] text-[#050505] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {freq === 'hourly' && 'Horaire'}
              {freq === 'daily' && 'Journalier'}
              {freq === 'monthly' && 'Mensuel'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[300px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-[#242526]/50 z-10">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E4E6EB"
              vertical={false}
            />
            <XAxis
              dataKey="formattedTimestamp"
              tick={{ fill: '#65676B' }}
              tickLine={{ stroke: '#65676B' }}
              axisLine={{ stroke: '#E4E6EB' }}
            />
            <YAxis
              tick={{ fill: '#65676B' }}
              tickLine={{ stroke: '#65676B' }}
              axisLine={{ stroke: '#E4E6EB' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
              labelStyle={{ color: '#65676B' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Nombre de tests"
              stroke="#1b74e4"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#1b74e4' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
