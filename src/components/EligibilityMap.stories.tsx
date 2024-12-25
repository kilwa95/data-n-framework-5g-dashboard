import type { Meta, StoryObj } from '@storybook/react';
import { EligibilityMap } from './EligibilityMap';

const meta = {
  title: 'Components/EligibilityMap',
  component: EligibilityMap,
  parameters: {
    layout: 'centered',
  },
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
  },
};
