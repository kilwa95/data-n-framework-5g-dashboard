import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './Map';

const meta: Meta<typeof Map> = {
  title: 'Components/Map',
  component: Map,
  parameters: {
    layout: 'fullscreen',
    chromatic: { delay: 500 },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Default: Story = {};
