export interface TestResult {
    region: string;
    department: string;
    city: string;
    can_subscribe: boolean;
    is_ztd: boolean;
    foundCoverage: boolean;
    active_4gcoverage: boolean;
    active_5gcoverage: boolean;
  }
  
  export interface TestResultsFilters {
    location?: {
      region?: { id: string };
      department?: { id: string };
      city?: { id: string };
    };
    eligibility?: {
      can_subscribe?: boolean;
      is_ztd?: boolean;
      found_coverage?: boolean;
      active_4g?: boolean;
      active_5g?: boolean;
    };
  }