import type { Meta, StoryObj } from '@storybook/react';
import { RegionalKPIMap } from './RegionalKPIMap';
import regionsGeoJSON from '../../data/france-regions.json';
const meta: Meta<typeof RegionalKPIMap> = {
  title: 'Components/RegionalKPIMap',
  component: RegionalKPIMap,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof RegionalKPIMap>;

export const Default: Story = {
  args: {
    regionsData: regionsGeoJSON,
    kpiData: {
      '11': 150,
      '24': 200,
      '27': 300,
      // ... autres régions
    },
    className: 'h-[600px]',
    onRegionClick: (regionId) => console.log('Region clicked:', regionId),
  },
};
