import { useState, useEffect, useCallback } from 'react';
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
import { filterTestResults } from '../../utils/filterTestResults';

const testResults: TestResult[] = mockTestResults.map((result) => ({
  ...result,
  region: 'Région',
  department: 'Département',
  city: 'Ville',
}));

export const EligibilityMapPage = () => {
  // Filters state
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

  // KPIs state
  const [totalTests, setTotalTests] = useState(0);
  const [eligibleTests, setEligibleTests] = useState(0);

  // Trend chart state
  const [frequency, setFrequency] = useState<'hourly' | 'daily' | 'monthly'>(
    'daily'
  );
  const [trendData, setTrendData] = useState([]);

  // Filter the test results based on current filters
  const filteredTestResults = useCallback(() => {
    return filterTestResults(testResults, {
      location: filters.location,
      eligibility: filters.eligibility,
      dateRange: filters.dateRange,
    });
  }, [filters]);

  // Update KPIs based on filtered data
  useEffect(() => {
    const filtered = filteredTestResults();
    setTotalTests(filtered.length);
    setEligibleTests(filtered.filter((test) => test.can_subscribe).length);
  }, [filteredTestResults]);

  // Update trend data based on filtered results
  useEffect(() => {
    // Here you would aggregate the filtered data based on frequency
    // This is a placeholder - implement actual aggregation logic
    const aggregatedData = [];
    setTrendData(aggregatedData);
  }, [filteredTestResults, frequency]);

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: range,
    }));
  };

  const regionalKPIData = useRegionalKPI(filteredTestResults());

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageTitle title="Carte d'éligibilité 5G Box" />

        <KPISection
          totalTests={totalTests}
          eligibleTests={eligibleTests}
          updateKPIs={async () => {
            const filtered = filteredTestResults();
            const total = filtered.length;
            setTotalTests(total);
            setEligibleTests(
              filtered.filter((test) => test.can_subscribe).length
            );
            return total;
          }}
        />

        <div className="grid grid-cols-1 gap-6">
          <TestTrendChart
            data={trendData}
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
                department: null,
                city: null,
              },
            }));
          }}
        />

        <TestResultsTable
          data={filteredTestResults()}
          filters={filters}
          className="mt-6"
        />
      </div>
    </div>
  );
};
