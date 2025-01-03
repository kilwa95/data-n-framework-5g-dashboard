import { useMemo } from 'react';
import type { Filters } from '../pages/types';
import type { TestData } from '../types';

export const useRegionKPIs = (
  testData: TestData[] | undefined,
  filters: Filters
) => {
  return useMemo(() => {
    const kpis: Record<string, number> = {};

    if (!testData) return kpis;

    testData.forEach((test) => {
      // Vérifier si le test correspond aux filtres
      const matchesFilters =
        (!filters.location.region ||
          test.region === filters.location.region.id) &&
        (!filters.location.department ||
          test.department === filters.location.department.id) &&
        (!filters.location.city || test.city === filters.location.city.id) &&
        (!filters.eligibility.can_subscribe || test.can_subscribe) &&
        (!filters.eligibility.is_ztd || test.is_ztd) &&
        (!filters.eligibility.found_coverage || test.foundCoverage) &&
        (!filters.eligibility.sector_capacity ||
          test.sector_capacity === 'High') &&
        (!filters.eligibility.active_4g || test.active_4g_cells > 0) &&
        (!filters.eligibility.active_5g || test.active_5g_cells > 0);

      if (matchesFilters) {
        kpis[test.region] = (kpis[test.region] || 0) + 1;
      }
    });

    return kpis;
  }, [testData, filters]);
};
