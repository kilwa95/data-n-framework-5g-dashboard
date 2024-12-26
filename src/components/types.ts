export interface DateRangeSelectorProps {
  onChange: (range: { start: Date; end: Date }) => void;
  format?: string;
  locale?: 'fr' | 'en';
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
  data?: Record<string, any>;
}
export interface EligibilityMapProps {
  filters?: {
    region: any;
    department: any;
    city: any;
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

export interface LocationMarkerProps {
  location: Location;
  isHovered: boolean;
  getMarkerStyle: (locationId: string) => any;
  onMarkerClick?: (location: Location) => void;
  onHover: (locationId: string | null) => void;
}
