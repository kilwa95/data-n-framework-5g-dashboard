import { useMemo } from 'react';
import type { TestResult } from '../components/types';

export const useRegionalKPI = (testResults: TestResult[]) => {
  return useMemo(() => {
    const kpiByRegion: Record<string, number> = {};

    testResults.forEach((result) => {
      if (result.can_subscribe) {
        const regionId = result.region;
        kpiByRegion[regionId] = (kpiByRegion[regionId] || 0) + 1;
      }
    });

    return kpiByRegion;
  }, [testResults]);
};
