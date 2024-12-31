import type { Meta, StoryObj } from '@storybook/react';
import { LayeredMap } from './LayeredMap';
import 'leaflet/dist/leaflet.css';

// Données GeoJSON de test pour les régions
const mockRegionsData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Île-de-France',
        id: '11',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1.4477539062500002, 49.095452162534826],
            [3.2080078125000004, 49.095452162534826],
            [3.2080078125000004, 48.1367666796927],
            [1.4477539062500002, 48.1367666796927],
            [1.4477539062500002, 49.095452162534826],
          ],
        ],
      },
    },
  ],
};

// Données GeoJSON de test pour les départements
const mockDepartmentsData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Paris',
        id: '75',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2.224122, 48.90246],
            [2.433472, 48.90246],
            [2.433472, 48.789251],
            [2.224122, 48.789251],
            [2.224122, 48.90246],
          ],
        ],
      },
    },
  ],
};

// Données de test pour les marqueurs de test
const mockTestLocations = [
  {
    id: 'test1',
    coordinates: [48.8566, 2.3522] as [number, number],
    data: {
      name: 'Test Site 1',
      status: 'active',
      metrics: {
        signal: 85,
        speed: '150Mbps',
      },
    },
  },
  {
    id: 'test2',
    coordinates: [48.8744, 2.3526] as [number, number],
    data: {
      name: 'Test Site 2',
      status: 'inactive',
      metrics: {
        signal: 65,
        speed: '90Mbps',
      },
    },
  },
];

const meta = {
  title: 'Components/LayeredMap',
  component: LayeredMap,
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
} satisfies Meta<typeof LayeredMap>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut avec toutes les couches
export const Default: Story = {
  args: {
    regionsData: mockRegionsData,
    departmentsData: mockDepartmentsData,
    testLocations: mockTestLocations,
    className: 'h-[600px]',
    onTestMarkerClick: (location) =>
      console.log('Test marker clicked:', location),
  },
};

// Story avec uniquement les régions
export const RegionsOnly: Story = {
  args: {
    regionsData: mockRegionsData,
    departmentsData: { type: 'FeatureCollection', features: [] },
    testLocations: [],
    className: 'h-[600px]',
  },
};

// Story avec uniquement les départements
export const DepartmentsOnly: Story = {
  args: {
    regionsData: { type: 'FeatureCollection', features: [] },
    departmentsData: mockDepartmentsData,
    testLocations: [],
    className: 'h-[600px]',
  },
};

// Story avec uniquement les marqueurs de test
export const TestMarkersOnly: Story = {
  args: {
    regionsData: { type: 'FeatureCollection', features: [] },
    departmentsData: { type: 'FeatureCollection', features: [] },
    testLocations: mockTestLocations,
    className: 'h-[600px]',
    onTestMarkerClick: (location) =>
      console.log('Test marker clicked:', location),
  },
};

// Story avec interaction désactivée
export const NoInteraction: Story = {
  args: {
    regionsData: mockRegionsData,
    departmentsData: mockDepartmentsData,
    testLocations: mockTestLocations,
    className: 'h-[600px]',
  },
};

// Story avec style personnalisé
export const CustomStyling: Story = {
  args: {
    regionsData: mockRegionsData,
    departmentsData: mockDepartmentsData,
    testLocations: mockTestLocations,
    className: 'h-[600px] rounded-xl border-2 border-primary-500 shadow-xl',
  },
};
