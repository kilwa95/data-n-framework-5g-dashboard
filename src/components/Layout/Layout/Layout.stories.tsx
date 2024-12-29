import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <div className="bg-white dark:bg-[#242526] rounded-lg shadow-card p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to the Dashboard
          </h2>
          <p>This is the main content area of your application.</p>
        </div>
      </div>
    ),
  },
};

export const WithMultipleCards: Story = {
  args: {
    children: (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-[#242526] rounded-lg shadow-card p-6"
          >
            <h3 className="text-lg font-semibold mb-2">Card {i + 1}</h3>
            <p>Content for card {i + 1}</p>
          </div>
        ))}
      </div>
    ),
  },
};
