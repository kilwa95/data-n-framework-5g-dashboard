import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Filters } from '../../pages/types';
import regionsGeoJSON from '../../data/france-regions.json';
import departmentsGeoJSON from '../../data/france-departments.json';
import { useRegionKPIs } from '../../hooks/useRegionKPIs';
import { useDepartmentKPIs } from '../../hooks/useDepartmentKPIs';
import { RegionsLayer } from './layers/RegionsLayer';
import { DepartmentsLayer } from './layers/DepartmentsLayer';
import { TestsLayer } from './layers/TestsLayer';

interface MapProps {
  filters: Filters;
  className: string;
  testData?: Array<{
    id: string;
    coordinates: [number, number];
    eligibility: boolean;
    region: string;
    department: string;
    city: string;
    details: {
      is_ztd: boolean;
      foundCoverage: boolean;
      sector_capacity: string;
      active_4g_cells: number;
      active_5g_cells: number;
    };
  }>;
  sitesData?: Array<{
    id: string;
    coordinates: [number, number];
    azimuth: number;
    status: string;
  }>;
}

export const Map = ({ filters, className, testData, sitesData }: MapProps) => {
  const [zoom, setZoom] = useState(6);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const regionKPIs = useRegionKPIs(testData, filters);
  const departmentKPIs = useDepartmentKPIs(testData, filters, selectedRegion);

  return (
    <div className="relative">
      <MapContainer
        center={[46.227638, 2.213749]}
        className={className}
        minZoom={6}
        zoom={6}
        maxZoom={18}
        maxBounds={[
          [51.5, -5.5],
          [41.3, 8.2],
        ]}
        maxBoundsViscosity={1.0}
        onZoomEnd={(e) => setZoom(e.target.getZoom())}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Régions">
            <RegionsLayer
              data={regionsGeoJSON}
              filters={filters}
              kpis={regionKPIs}
              onRegionSelect={setSelectedRegion}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Départements">
            <DepartmentsLayer
              data={departmentsGeoJSON}
              filters={filters}
              selectedRegion={selectedRegion}
              kpis={departmentKPIs}
              visible={zoom > 8}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Tests">
            <TestsLayer
              testData={testData}
              sitesData={sitesData}
              filters={filters}
              visible={zoom > 10}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};
