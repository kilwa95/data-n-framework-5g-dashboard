import { useState } from 'react';
import { TestTrendChart } from '../../components/TestTrendChart/TestTrendChart';
import { TestResultsTable } from '../../components/TestResultsTable/TestResultsTable';
import { Filters } from '../types';
import { mockLocationData, mockTestResults } from '../mock';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { KPISection } from './KPISection';
import { FiltersSection } from './FiltersSection';
import { TestResult } from '../../components/types';
import { DateRangeSelector } from '../../components/DateRangeSelector/DateRangeSelector';
import { subDays } from 'date-fns';
import { RegionalKPIMap } from '../../components/RegionalKPIMap/RegionalKPIMap';
import { useRegionalKPI } from '../../hooks/useRegionalKPI';
import regionsGeoJSON from '../../data/france-regions.json';

const testResults: TestResult[] = mockTestResults.map((result) => ({
  ...result,
  region: 'Région',
  department: 'Département',
  city: 'Ville',
}));

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
    dateRange: {
      start: subDays(new Date(), 30),
      end: new Date(),
    },
  });

  // État pour les KPIs
  const [totalTests, setTotalTests] = useState(0);
  const [eligibleTests, setEligibleTests] = useState(0);

  // Nouveaux états pour le graphique de tendance
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'monthly'>(
    'daily'
  );

  // Gestionnaire de mise à jour des KPIs
  const updateKPIs = async (): Promise<number> => {
    const newTotal = Math.floor(Math.random() * 10000);
    setTotalTests(newTotal);
    setEligibleTests(Math.floor(newTotal * 0.7));
    return newTotal;
  };

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: range,
    }));
  };

  const regionalKPIData = useRegionalKPI(testResults);

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageTitle title="Carte d'éligibilité 5G Box" />

        <KPISection
          totalTests={totalTests}
          eligibleTests={eligibleTests}
          updateKPIs={updateKPIs}
        />

        <div className="grid grid-cols-1 gap-6">
          <TestTrendChart
            data={[]}
            frequency={frequency}
            onFrequencyChange={setFrequency}
          />
        </div>

        <DateRangeSelector
          onChange={handleDateRangeChange}
          format="yyyy-MM-dd"
          locale="fr"
          labels={{ from: 'Du', to: 'Au' }}
        />

        <FiltersSection
          setFilters={setFilters}
          mockLocationData={mockLocationData}
        />

        {/* Carte */}
        <RegionalKPIMap
          regionsData={regionsGeoJSON}
          kpiData={regionalKPIData}
          className="h-[600px] rounded-lg shadow-lg"
          onRegionClick={(regionId) => {
            setFilters((prev) => ({
              ...prev,
              location: {
                ...prev.location,
                region: { id: regionId, name: '' },
              },
            }));
          }}
        />

        {/* Table des résultats */}
        <TestResultsTable
          data={testResults}
          filters={filters}
          className="mt-6"
        />
      </div>
    </div>
  );
};
