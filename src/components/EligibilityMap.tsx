import { useState, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Tooltip,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import departmentsData from '../data/france-departments.json';

interface Location {
  id: string;
  coordinates: [number, number];
  name: string;
  data?: Record<string, any>;
}

interface EligibilityMapProps {
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

export const EligibilityMap = ({
  filters,
  locations = [],
  className = '',
  onMarkerClick,
}: EligibilityMapProps) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Style de base pour la carte
  const mapStyle = {
    height: '100%',
    width: '100%',
  };

  // Style pour les départements
  const departmentStyle = {
    fillColor: '#f5f5f5',
    weight: 1,
    opacity: 1,
    color: '#e5e7eb',
    fillOpacity: 0.7,
  };

  // Style pour les marqueurs
  const getMarkerStyle = useCallback(
    (locationId: string) => ({
      radius: hoveredLocation === locationId ? 8 : 6,
      fillColor: '#1e88e5',
      color: '#1e88e5',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    }),
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
        {locations.map((location) => (
          <CircleMarker
            key={location.id}
            center={location.coordinates}
            {...getMarkerStyle(location.id)}
            eventHandlers={{
              click: () => onMarkerClick?.(location),
              mouseover: () => setHoveredLocation(location.id),
              mouseout: () => setHoveredLocation(null),
            }}
          >
            <Tooltip
              permanent={hoveredLocation === location.id}
              direction="top"
              offset={[0, -10]}
              opacity={1}
              className="bg-white shadow-lg rounded-lg border-0 px-3 py-1"
            >
              <div className="text-sm font-medium text-gray-900">
                {location.name}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}

        {/* Signature */}
        <div className="absolute bottom-2 right-2 z-[1000] text-sm text-gray-500 font-serif">
          Le Figaro
        </div>
      </MapContainer>
    </div>
  );
};
