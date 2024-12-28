import { TestResult, TestResultsFilters } from './types';

export const filterTestResults = (
  data: TestResult[],
  filters?: TestResultsFilters
) => {
  if (!filters) return data;

  return data.filter((row) => {
    // Apply location filters
    if (filters.location?.region && row.region !== filters.location.region.id)
      return false;
    if (
      filters.location?.department &&
      row.department !== filters.location.department.id
    )
      return false;
    if (filters.location?.city && row.city !== filters.location.city.id)
      return false;

    // Apply eligibility filters
    if (filters.eligibility?.can_subscribe && !row.can_subscribe) return false;
    if (filters.eligibility?.is_ztd && !row.is_ztd) return false;
    if (filters.eligibility?.found_coverage && !row.foundCoverage) return false;
    if (filters.eligibility?.active_4g && !row.active_4gcoverage) return false;
    if (filters.eligibility?.active_5g && !row.active_5gcoverage) return false;

    return true;
  });
};
