import type { Meta, StoryObj } from '@storybook/react';
import { EligibilityMapPage } from './EligibilityMapPage';

// Assurez-vous que toutes les dépendances sont disponibles pour Storybook
import 'leaflet/dist/leaflet.css';

const meta = {
  title: 'Pages/EligibilityMapPage',
  component: EligibilityMapPage,
  parameters: {
    layout: 'fullscreen',
    // Désactiver les contrôles car cette page gère son propre état
    controls: { hideNoControlsWarning: true },
  },
  // Décorer le composant avec les providers nécessaires si besoin
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
export const Default: Story = {};

// Story avec des données initiales
export const WithInitialData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Version de la page avec des données initiales pré-remplies.',
      },
    },
  },
};
