import type { Meta, StoryObj } from '@storybook/react';
import { EligibilityMapPage } from './EligibilityMapPage';
import { mockLocationData, mockTestResults } from '../mock';
import { subDays } from 'date-fns';

const mockTestData = [
  {
    datetime: '2024-12-31T10:30:00Z',
    longitude: 2.3522,
    latitude: 48.8566,
    can_subscribe: 1,
    is_ztd: 0,
    foundCoverage: 1,
    cell_1800_coverage: 1,
    sector_capacity: 1,
    max_user: 20,
    site_name: 'Site_A',
    sector: 'Sector_1',
    active_4gcoverage: 1,
    active_4g_cells: 5,
    active_5gcoverage: 1,
    active_5g_cells: 3,
  },
  {
    datetime: '2024-12-31T11:15:00Z',
    longitude: 3.0586,
    latitude: 50.6292,
    can_subscribe: 0,
    is_ztd: 1,
    foundCoverage: 0,
    cell_1800_coverage: 0,
    sector_capacity: 0,
    max_user: 0,
    site_name: 'Site_B',
    sector: 'Sector_2',
    active_4gcoverage: 0,
    active_4g_cells: 0,
    active_5gcoverage: 0,
    active_5g_cells: 0,
  },
];

const meta = {
  title: 'Pages/EligibilityMapPage',
  component: EligibilityMapPage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
    // Ajout de documentation pour la page
    docs: {
      description: {
        component: `
# Page de carte d'éligibilité 5G Box

Cette page présente une vue complète des tests d'éligibilité 5G Box avec :
- Des KPIs de suivi
- Un graphique de tendance
- Une carte interactive des régions
- Des filtres de données
- Un tableau détaillé des résultats

## Fonctionnalités principales

### Filtres
- Sélection de date (Du - Au)
- Filtres de localisation hiérarchiques (Région, Département, Ville)
- Filtres d'éligibilité (Éligible, ZTD, etc.)

### Visualisations
- Carte régionale avec données KPI
- Graphique de tendance avec sélection de fréquence
- Tableau de données détaillé
        `,
      },
    },
  },
  // Décorateur pour ajouter un padding autour de la page
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof EligibilityMapPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut - état initial
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'État initial de la page avec les données par défaut.',
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
        dateRange: {
          start: subDays(new Date(), 30),
          end: new Date(),
        },
      },
    },
  },
};

// Story avec données vides
export const NoData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'État de la page sans données.',
      },
    },
    mockData: {
      locationData: {
        regions: [],
        departments: {},
        cities: {},
      },
      testResults: [],
    },
  },
};

// Story en mode sombre
export const DarkMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Page en mode sombre.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

// Story avec erreur
export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'État de la page avec une erreur.',
      },
    },
    mockData: {
      error: new Error('Erreur lors du chargement des données'),
    },
  },
};

// Story avec données de test complètes
export const WithFullData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Page avec un jeu complet de données de test.',
      },
    },
    mockData: {
      locationData: {
        regions: [
          { id: 'r1', name: 'Île-de-France' },
          { id: 'r2', name: 'Hauts-de-France' },
        ],
        departments: {
          r1: [{ id: 'd1', name: 'Paris' }],
          r2: [{ id: 'd2', name: 'Nord' }],
        },
        cities: {
          d1: [{ id: 'c1', name: 'Paris' }],
          d2: [{ id: 'c2', name: 'Lille' }],
        },
      },
      testResults: mockTestData.map((result) => ({
        id: Math.random().toString(36).substr(2, 9),
        datetime: new Date(result.datetime).toISOString(),
        region: result.latitude > 49 ? 'r2' : 'r1',
        department: result.latitude > 49 ? 'd2' : 'd1',
        city: result.latitude > 49 ? 'c2' : 'c1',
        longitude: result.longitude,
        latitude: result.latitude,
        can_subscribe: Boolean(result.can_subscribe),
        is_ztd: Boolean(result.is_ztd),
        foundCoverage: Boolean(result.foundCoverage),
        cell_1800_coverage: result.cell_1800_coverage,
        sector_capacity: result.sector_capacity ? 'High' : 'Low',
        max_user: result.max_user,
        site_name: result.site_name,
        sector: result.sector,
        active_4gcoverage: Boolean(result.active_4gcoverage),
        active_4g_cells: result.active_4g_cells,
        active_5gcoverage: Boolean(result.active_5gcoverage),
        active_5g_cells: result.active_5g_cells,
      })),
    },
  },
};

// Story avec interactions simulées
export const WithInteractions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Page avec des interactions simulées.',
      },
    },
    mockData: {
      ...WithFullData.parameters?.mockData,
    },
    play: async ({ canvasElement }) => {
      // Ici, vous pouvez ajouter des interactions automatisées
      // pour tester le comportement de la page
    },
  },
};
