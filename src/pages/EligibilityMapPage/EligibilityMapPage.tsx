import { useState } from 'react';
import { EligibilityMap } from '../../components/EligibilityMap/EligibilityMap';
import { TestTrendChart } from '../../components/TestTrendChart/TestTrendChart';
import { TestResultsTable } from '../../components/TestResultsTable/TestResultsTable';
import { Filters } from '../types';
import { mockLocationData, mockTestResults } from '../mock';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { KPISection } from './KPISection';
import { FiltersSection } from './FiltersSection';

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

  // Nouveaux états pour le graphique de tendance
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'monthly'>(
    'daily'
  );
  const [trendData, setTrendData] = useState<
    Array<{ timestamp: string; value: number }>
  >([]);
  const [isLoadingTrend, setIsLoadingTrend] = useState(false);

  // Nouvel état pour le chargement de la table
  const [isLoadingTable, setIsLoadingTable] = useState(false);

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
        <PageTitle title="Carte d'éligibilité 5G Box" />

        <KPISection
          totalTests={totalTests}
          eligibleTests={eligibleTests}
          updateKPIs={updateKPIs}
        />

        <TestTrendChart
          data={trendData}
          frequency={frequency}
          onFrequencyChange={setFrequency}
          loading={isLoadingTrend}
        />

        <FiltersSection
          setFilters={setFilters}
          mockLocationData={mockLocationData}
        />

        {/* Carte */}
        <EligibilityMap
          filters={filters}
          className="h-[600px] rounded-lg shadow-lg"
        />

        {/* Table des résultats */}
        <TestResultsTable
          data={mockTestResults}
          filters={filters}
          loading={isLoadingTable}
          className="mt-6"
        />
      </div>
    </div>
  );
};
