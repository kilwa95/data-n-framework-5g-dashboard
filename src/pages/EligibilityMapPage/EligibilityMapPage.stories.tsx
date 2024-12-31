import type { Meta, StoryObj } from '@storybook/react';
import { EligibilityMapPage } from './EligibilityMapPage';
import { mockLocationData, mockTestResults } from '../mock';
import 'leaflet/dist/leaflet.css';

const meta = {
  title: 'Pages/EligibilityMapPage',
  component: EligibilityMapPage,
  parameters: {
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EligibilityMapPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Version par défaut de la page de carte d'éligibilité.",
      },
    },
  },
};

// Story avec des données initiales
export const WithInitialData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Version de la page avec des données initiales pré-remplies.',
      },
    },
    mockData: {
      locationData: mockLocationData,
      testResults: mockTestResults,
      kpis: {
        totalTests: 15000,
        eligibleTests: 10500,
      },
    },
  },
};

// Story en mode chargement
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'État de chargement de la page.',
      },
    },
    mockData: {
      loading: true,
    },
  },
};

// Story avec filtres appliqués
export const WithFilters: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Page avec des filtres pré-appliqués.',
      },
    },
    mockData: {
      locationData: mockLocationData,
      testResults: mockTestResults,
      initialFilters: {
        location: {
          region: { id: 'r1', name: 'Île-de-France' },
          department: null,
          city: null,
        },
        eligibility: {
          can_subscribe: true,
          is_ztd: false,
          found_coverage: true,
          sector_capacity: false,
          active_4g: true,
          active_5g: true,
        },
      },
    },
  },
};
