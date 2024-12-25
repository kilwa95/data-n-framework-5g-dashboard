import type { Meta, StoryObj } from '@storybook/react';
import { EligibilityMap } from './EligibilityMap';

const meta = {
  title: 'Components/EligibilityMap',
  component: EligibilityMap,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof EligibilityMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: {
      region: null,
      department: null,
      city: null,
      eligibility: {
        can_subscribe: false,
        is_ztd: false,
        found_coverage: false,
        sector_capacity: false,
        active_4g: false,
        active_5g: false,
      },
    },
    className: 'h-[600px]',
  },
};
