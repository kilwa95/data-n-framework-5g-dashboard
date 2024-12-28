import { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import departmentsData from '../data/france-departments.json';
import type { EligibilityMapProps } from './types';
import {
  mapStyle,
  departmentStyle,
  getMarkerStyle,
} from './EligibilityMap.styles';
import { LocationMarker } from './LocationMarker';
import { filterLocations } from '../utils/locationFilters';

export const EligibilityMap = ({
  filters,
  locations = [],
  className = '',
  onMarkerClick,
}: EligibilityMapProps) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const filteredLocations = useMemo(
    () => filterLocations(locations, filters || null),
    [filters, locations]
  );

  const getMarkerStyleWithHover = useCallback(
    (locationId: string) => getMarkerStyle(hoveredLocation === locationId),
    [hoveredLocation]
  );

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        className="h-[600px] w-full"
        zoomControl={false}
        minZoom={5}
        maxZoom={9}
        style={mapStyle}
      >
        <ZoomControl position="bottomright" />

        {/* Fond de carte neutre */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Contours des départements */}
        <GeoJSON data={departmentsData} style={departmentStyle} />

        {/* Points de localisation */}
        {filteredLocations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            isHovered={hoveredLocation === location.id}
            getMarkerStyle={getMarkerStyleWithHover}
            onMarkerClick={onMarkerClick}
            onHover={setHoveredLocation}
          />
        ))}
      </MapContainer>
    </div>
  );
};
