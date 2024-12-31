import { FeatureCollection } from 'geojson';

export interface RegionalKPIMapProps {
  regionsData: FeatureCollection;
  kpiData: Record<string, number>;
  className?: string;
  onRegionClick?: (regionId: string) => void;
}
