import { useState, useEffect } from 'react';
import { Filters } from '../types';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { DateRangeSelector } from '../../components/DateRangeSelector/DateRangeSelector';
import { subDays } from 'date-fns';
import { EligibilityFilter } from '../../components/EligibilityFilter/EligibilityFilter';
import { KPISection } from './KPISection';
import { TestTrendChart } from '../../components/TestTrendChart/TestTrendChart';
import { DataPoint, HierarchyData } from '../../components/types';
import { HierarchyLocationFilter } from '../../components/HierarchyLocationFilter/HierarchyLocationFilter';
import { Map } from '../../components/Map/Map';

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
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [locationData, setLocationData] = useState<HierarchyData>({
    regions: [],
    departments: {},
    cities: {},
  });

  useEffect(() => {
    const data = [
      {
        timestamp: '2025-01-01T11:29:55',
        value: 1465,
      },
      {
        timestamp: '2025-01-01T12:29:55',
        value: 1272,
      },
      {
        timestamp: '2025-01-01T13:29:55',
        value: 625,
      },
      {
        timestamp: '2025-01-01T14:29:55',
        value: 1156,
      },
      {
        timestamp: '2025-01-01T15:29:55',
        value: 755,
      },
      {
        timestamp: '2025-01-01T16:29:55',
        value: 777,
      },
      {
        timestamp: '2025-01-01T17:29:55',
        value: 928,
      },
      {
        timestamp: '2025-01-01T18:29:55',
        value: 1453,
      },
      {
        timestamp: '2025-01-01T19:29:55',
        value: 1118,
      },
      {
        timestamp: '2025-01-01T20:29:55',
        value: 600,
      },
      {
        timestamp: '2025-01-01T21:29:55',
        value: 522,
      },
      {
        timestamp: '2025-01-01T22:29:55',
        value: 1327,
      },
      {
        timestamp: '2025-01-01T23:29:55',
        value: 1288,
      },
      {
        timestamp: '2025-01-02T00:29:55',
        value: 1226,
      },
      {
        timestamp: '2025-01-02T01:29:55',
        value: 630,
      },
      {
        timestamp: '2025-01-02T02:29:55',
        value: 1066,
      },
      {
        timestamp: '2025-01-02T03:29:55',
        value: 1475,
      },
      {
        timestamp: '2025-01-02T04:29:55',
        value: 949,
      },
      {
        timestamp: '2025-01-02T05:29:55',
        value: 720,
      },
      {
        timestamp: '2025-01-02T06:29:55',
        value: 683,
      },
      {
        timestamp: '2025-01-02T07:29:55',
        value: 1129,
      },
      {
        timestamp: '2025-01-02T08:29:55',
        value: 964,
      },
      {
        timestamp: '2025-01-02T09:29:55',
        value: 683,
      },
      {
        timestamp: '2025-01-02T10:29:55',
        value: 924,
      },
    ];

    setChartData(data);
  }, []);

  useEffect(() => {
    const data: HierarchyData = {
      cities: {
        d1: [{ id: 'c1', name: 'Paris' }],
        d2: [
          { id: 'c2', name: 'Nanterre' },
          { id: 'c3', name: 'Boulogne-Billancourt' },
        ],
      },
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
      regions: [
        { id: 'r1', name: 'Île-de-France' },
        { id: 'r2', name: 'Auvergne-Rhône-Alpes' },
      ],
    };
    setLocationData(data);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageTitle title="Carte d'éligibilité 5G Box" />

        <KPISection
          totalTests={0}
          eligibleTests={0}
          updateKPIs={() => Promise.resolve(0)}
        />
        <TestTrendChart
          data={chartData}
          frequency={'hourly'}
          onFrequencyChange={() => {}}
        />

        <DateRangeSelector
          locale="fr"
          labels={{
            from: 'Du',
            to: 'Au',
          }}
          onChange={(dateRange) =>
            setFilters((prev) => ({
              ...prev,
              dateRange,
            }))
          }
        />
        <EligibilityFilter
          onChange={(eligibility) =>
            setFilters((prev) => ({
              ...prev,
              eligibility: eligibility as Filters['eligibility'],
            }))
          }
        />

        <HierarchyLocationFilter
          initialData={locationData}
          onChange={(location) =>
            setFilters((prev) => ({
              ...prev,
              location: location as Filters['location'],
            }))
          }
        />
        <Map filters={filters} className="h-[600px] rounded-lg shadow-lg" />
      </div>
    </div>
  );
};
