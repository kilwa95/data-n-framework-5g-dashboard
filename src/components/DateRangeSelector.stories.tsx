import type { Meta, StoryObj } from "@storybook/react";
import { DateRangeSelector } from "./DateRangeSelector";

const meta = {
  title: "Components/DateRangeSelector",
  component: DateRangeSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateRangeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: (range) => console.log("Date range changed:", range),
  },
};

export const FrenchLocale: Story = {
  args: {
    onChange: (range) => console.log("Date range changed:", range),
    locale: "fr",
    labels: {
      from: "Du",
      to: "Au",
    },
  },
};

export const CustomFormat: Story = {
  args: {
    onChange: (range) => console.log("Date range changed:", range),
    format: "dd/MM/yyyy",
  },
};
