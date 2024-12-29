import type { Meta, StoryObj } from "@storybook/react";
import { TestResultsTable } from "./TestResultsTable";

const meta = {
  title: "Components/TestResultsTable",
  component: TestResultsTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TestResultsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = Array.from({ length: 10 }, (_, index) => ({
  id: `test-${index}`,
  datetime: new Date(2024, 0, 1, 12, 0).toISOString(),
  longitude: 2.3488 + Math.random() * 0.1,
  latitude: 48.8534 + Math.random() * 0.1,
  can_subscribe: Math.random() > 0.5,
  is_ztd: Math.random() > 0.5,
  foundCoverage: Math.random() > 0.3,
  cell_1800_coverage: Math.floor(Math.random() * 20),
  sector_capacity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
  max_user: Math.floor(Math.random() * 200),
  site_name: `Site ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
  sector: `Sector ${Math.floor(Math.random() * 5) + 1}`,
  active_4gcoverage: Math.random() > 0.2,
  active_4g_cells: Math.floor(Math.random() * 12),
  active_5gcoverage: Math.random() > 0.4,
  active_5g_cells: Math.floor(Math.random() * 8),
  region: "IDF",
  department: "75",
  city: "Paris",
}));

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Loading: Story = {
  args: {
    data: mockData,
    loading: true,
  },
};

export const WithFilters: Story = {
  args: {
    data: mockData,
    filters: {
      eligibility: {
        can_subscribe: true,
        active_5g: true,
      },
    },
  },
};
