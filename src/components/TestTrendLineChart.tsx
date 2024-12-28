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

interface TestTrendLineChartProps {
  data: Array<{
    formattedTimestamp: string;
    value: number;
    [key: string]: any;
  }>;
}

export const TestTrendLineChart = ({ data }: TestTrendLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
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
  );
};
