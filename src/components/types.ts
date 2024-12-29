export interface DateRangeSelectorProps {
  onChange: (range: { start: Date; end: Date }) => void;
  format?: string;
  locale?: "fr" | "en";
  className?: string;
  labels?: {
    from: string;
    to: string;
  };
}

export interface DateInputProps {
  id: string;
  label: string;
  value: Date;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  dateFormat: string;
}

export interface EligibilityOption {
  id: string;
  label: string;
  value: boolean;
}

export interface EligibilityFilterProps {
  onChange: (selections: Record<string, boolean>) => void;
  initialValues?: Record<string, boolean>;
  className?: string;
}

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export interface Location {
  id: string;
  coordinates: [number, number];
  name: string;
  data?: Record<string, unknown>;
}
export interface EligibilityMapProps {
  filters?: {
    region: unknown;
    department: unknown;
    city: unknown;
    eligibility: {
      can_subscribe: boolean;
      is_ztd: boolean;
      found_coverage: boolean;
      sector_capacity: boolean;
      active_4g: boolean;
      active_5g: boolean;
    };
  };
  locations?: Location[];
  className?: string;
  onMarkerClick?: (location: Location) => void;
}

interface MarkerStyle {
  color: string;
  fillColor: string;
  weight: number;
  opacity: number;
  radius: number;
}

export interface LocationMarkerProps {
  location: Location;
  isHovered: boolean;
  getMarkerStyle: (locationId: string) => MarkerStyle;
  onMarkerClick?: (location: Location) => void;
  onHover: (locationId: string | null) => void;
}

export interface LocationItem {
  id: string;
  name: string;
}

export interface HierarchyData {
  regions: LocationItem[];
  departments: Record<string, LocationItem[]>;
  cities: Record<string, LocationItem[]>;
}

export interface HierarchyLocationFilterProps {
  onChange: (selection: {
    region: LocationItem | null;
    department: LocationItem | null;
    city: LocationItem | null;
  }) => void;
  initialData?: HierarchyData;
  loadData?: {
    departments?: (regionId: string) => Promise<Location[]>;
    cities?: (departmentId: string) => Promise<Location[]>;
  };
  labels?: {
    region?: string;
    department?: string;
    city?: string;
  };
  placeholders?: {
    region?: string;
    department?: string;
    city?: string;
  };
  className?: string;
}

export interface LocationSelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: LocationItem[];
  value: string | undefined;
  onChange: (value: string) => void;
  isDisabled: boolean;
  isLoading: boolean;
}

export interface KPITrackerProps {
  title?: string;
  value: number;
  loading?: boolean;
  formatter?: (value: number) => string;
  className?: string;
  refreshInterval?: number;
  onRefresh?: () => Promise<number>;
}

export interface TestResult {
  id: string;
  region: string;
  department: string;
  city: string;
  datetime: string;
  longitude: number;
  latitude: number;
  can_subscribe: boolean;
  is_ztd: boolean;
  foundCoverage: boolean;
  cell_1800_coverage: number;
  sector_capacity: string;
  max_user: number;
  site_name: string;
  sector: string;
  active_4gcoverage: boolean;
  active_4g_cells: number;
  active_5gcoverage: boolean;
  active_5g_cells: number;
}

export interface TestResultsTableProps {
  data: TestResult[];
  filters?: {
    location: {
      region: LocationItem | null;
      department: LocationItem | null;
      city: LocationItem | null;
    };
    eligibility: {
      can_subscribe: boolean;
      is_ztd: boolean;
      found_coverage: boolean;
      sector_capacity: boolean;
      active_4g: boolean;
      active_5g: boolean;
    };
  };
  loading?: boolean;
  className?: string;
}

export type FrequencyType = "hourly" | "daily" | "monthly";

interface DataPoint {
  timestamp: string;
  value: number;
}

export interface TestTrendChartProps {
  data: DataPoint[];
  frequency: FrequencyType;
  onFrequencyChange: (frequency: FrequencyType) => void;
  loading?: boolean;
  className?: string;
}
