import type { Meta, StoryObj } from "@storybook/react";
import { TestTrendChart } from "./TestTrendChart";
import { subHours, subDays, subMonths, format } from "date-fns";

const meta = {
  title: "Components/TestTrendChart",
  component: TestTrendChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TestTrendChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Génération de données de test
const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: format(subHours(new Date(), 23 - i), "yyyy-MM-dd'T'HH:mm:ss"),
    value: Math.floor(Math.random() * 1000) + 500,
  }));
};

const generateDailyData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    timestamp: format(subDays(new Date(), 29 - i), "yyyy-MM-dd'T'HH:mm:ss"),
    value: Math.floor(Math.random() * 5000) + 2000,
  }));
};

const generateMonthlyData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    timestamp: format(subMonths(new Date(), 11 - i), "yyyy-MM-dd'T'HH:mm:ss"),
    value: Math.floor(Math.random() * 50000) + 20000,
  }));
};

export const Hourly: Story = {
  args: {
    data: generateHourlyData(),
    frequency: "hourly",
    onFrequencyChange: (frequency) =>
      console.log("Frequency changed:", frequency),
  },
};

export const Daily: Story = {
  args: {
    data: generateDailyData(),
    frequency: "daily",
    onFrequencyChange: (frequency) =>
      console.log("Frequency changed:", frequency),
  },
};

export const Monthly: Story = {
  args: {
    data: generateMonthlyData(),
    frequency: "monthly",
    onFrequencyChange: (frequency) =>
      console.log("Frequency changed:", frequency),
  },
};

export const Loading: Story = {
  args: {
    data: generateDailyData(),
    frequency: "daily",
    onFrequencyChange: (frequency) =>
      console.log("Frequency changed:", frequency),
    loading: true,
  },
};
