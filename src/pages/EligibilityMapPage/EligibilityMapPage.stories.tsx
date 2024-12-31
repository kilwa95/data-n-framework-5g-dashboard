import type { Meta, StoryObj } from '@storybook/react';
import { EligibilityMapPage } from './EligibilityMapPage';
import { mockLocationData, mockTestResults } from '../mock';
import { subDays } from 'date-fns';

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
          { id: 'r2', name: 'Auvergne-Rhône-Alpes' },
        ],
        departments: {
          r1: [
            { id: 'd1', name: 'Paris' },
            { id: 'd2', name: 'Hauts-de-Seine' },
          ],
          r2: [
            { id: 'd3', name: 'Rhône' },
            { id: 'd4', name: 'Isère' },
          ],
        },
        cities: {
          d1: [{ id: 'c1', name: 'Paris' }],
          d2: [
            { id: 'c2', name: 'Nanterre' },
            { id: 'c3', name: 'Boulogne-Billancourt' },
          ],
        },
      },
      testResults: Array.from({ length: 100 }, (_, i) => ({
        id: `test-${i}`,
        datetime: new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        region: 'r1',
        department: 'd1',
        city: 'c1',
        longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
        latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
        can_subscribe: Math.random() > 0.3,
        is_ztd: Math.random() > 0.5,
        foundCoverage: Math.random() > 0.2,
        cell_1800_coverage: Math.floor(Math.random() * 5),
        sector_capacity: Math.random() > 0.5 ? 'High' : 'Low',
        max_user: Math.floor(Math.random() * 200),
        site_name: `SITE_${Math.floor(Math.random() * 10)}`,
        sector: `S${Math.floor(Math.random() * 3) + 1}`,
        active_4gcoverage: Math.random() > 0.1,
        active_4g_cells: Math.floor(Math.random() * 6),
        active_5gcoverage: Math.random() > 0.2,
        active_5g_cells: Math.floor(Math.random() * 4),
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
