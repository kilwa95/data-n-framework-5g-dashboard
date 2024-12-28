import { Location } from '../components/types';
import { Filters } from './types';

export const filterLocations = (
  locations: Location[],
  filters: Filters | null | undefined
) => {
  if (!filters) return locations;

  return locations.filter((location) => {
    // Apply location filters
    if (filters.region && location.data?.region !== filters.region.id)
      return false;
    if (
      filters.department &&
      location.data?.department !== filters.department.id
    )
      return false;
    if (filters.city && location.data?.city !== filters.city.id) return false;

    // Apply eligibility filters
    const data = location.data || {};
    if (filters.eligibility.can_subscribe && !data.can_subscribe) return false;
    if (filters.eligibility.is_ztd && !data.is_ztd) return false;
    if (filters.eligibility.found_coverage && !data.found_coverage)
      return false;
    if (filters.eligibility.sector_capacity && !data.sector_capacity)
      return false;
    if (filters.eligibility.active_4g && !data.active_4g) return false;
    if (filters.eligibility.active_5g && !data.active_5g) return false;

    return true;
  });
};
