import { useState } from 'react';
import { HierarchyLocationFilter } from '../components/HierarchyLocationFilter';
import { EligibilityFilter } from '../components/EligibilityFilter';
import { EligibilityMap } from '../components/EligibilityMap';
import { KPITracker } from '../components/KPITracker';

// Types pour les données de localisation
interface Location {
  id: string;
  name: string;
}

// Types pour les filtres
interface Filters {
  location: {
    region: Location | null;
    department: Location | null;
    city: Location | null;
  };
  eligibility: {
    can_subscribe: boolean;
    is_ztd: boolean;
    found_coverage: boolean;
    sector_capacity: boolean;
    active_4g: boolean;
    active_5g: boolean;
  };
}

// Données de test pour HierarchyLocationFilter
const mockLocationData = {
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
};

export const EligibilityMapPage = () => {
  // État des filtres
  const [filters, setFilters] = useState<Filters>({
    location: {
      region: null,
      department: null,
      city: null,
    },
    eligibility: {
      can_subscribe: false,
      is_ztd: false,
      found_coverage: false,
      sector_capacity: false,
      active_4g: false,
      active_5g: false,
    },
  });

  // État pour les KPIs
  const [totalTests, setTotalTests] = useState(0);
  const [eligibleTests, setEligibleTests] = useState(0);

  // Gestionnaire de mise à jour des KPIs
  const updateKPIs = async () => {
    // Simuler un appel API pour mettre à jour les KPIs
    // À remplacer par votre vraie logique d'API
    const newTotal = Math.floor(Math.random() * 10000);
    setTotalTests(newTotal);
    setEligibleTests(Math.floor(newTotal * 0.7));
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête avec titre */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#050505] dark:text-white">
            Carte d'éligibilité 5G Box
          </h1>
        </div>

        {/* Section KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <KPITracker
            title="Nombre total de tests"
            value={totalTests}
            refreshInterval={30000}
            onRefresh={updateKPIs}
          />
          <KPITracker
            title="Tests éligibles"
            value={eligibleTests}
            refreshInterval={30000}
            onRefresh={async () => eligibleTests}
          />
        </div>

        {/* Section Filtres */}
        <div className="space-y-4">
          <HierarchyLocationFilter
            onChange={(location) =>
              setFilters((prev) => ({ ...prev, location }))
            }
            initialData={mockLocationData}
            labels={{
              region: 'Région',
              department: 'Département',
              city: 'Ville',
            }}
            placeholders={{
              region: 'Sélectionnez une région',
              department: 'Sélectionnez un département',
              city: 'Sélectionnez une ville',
            }}
          />
          <EligibilityFilter
            onChange={(eligibility) =>
              setFilters((prev) => ({ ...prev, eligibility }))
            }
          />
        </div>

        {/* Carte */}
        <EligibilityMap
          filters={filters}
          className="h-[600px] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};
