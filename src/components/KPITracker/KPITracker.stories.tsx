import type { Meta, StoryObj } from '@storybook/react';
import { KPITracker } from './KPITracker';

const meta = {
  title: 'Components/KPITracker',
  component: KPITracker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KPITracker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories
export const Default: Story = {
  args: {
    value: 12345,
  },
};

export const Loading: Story = {
  args: {
    value: 12345,
    loading: true,
  },
};

export const CustomFormatting: Story = {
  args: {
    value: 12345,
    formatter: (value) => `${value.toLocaleString('fr-FR')} tests`,
  },
};

export const WithRefresh: Story = {
  args: {
    value: 12345,
    refreshInterval: 5000,
    onRefresh: () => Promise.resolve(Math.floor(Math.random() * 20000)),
  },
};

export const WithCustomTitle: Story = {
  args: {
    value: 12345,
    title: "Tests d'éligibilité 5G Box",
  },
};
