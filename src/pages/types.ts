interface Location {
  id: string;
  name: string;
}

export interface Filters {
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
  dateRange: {
    start: Date;
    end: Date;
  };
}
