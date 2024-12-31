import { LayerGroup } from 'react-leaflet';
import { LocationMarker } from '../LocationMarker';
import { useState } from 'react';
import { TestMarkersProps } from '../types';

export const TestMarkers = ({ locations, onMarkerClick }: TestMarkersProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getMarkerStyle = (isHovered: boolean) => ({
    radius: isHovered ? 8 : 6,
    fillColor: '#1e88e5',
    color: '#1e88e5',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  });

  return (
    <LayerGroup>
      {locations.map((location) => (
        <LocationMarker
          key={location.id}
          location={location}
          isHovered={hoveredId === location.id}
          getMarkerStyle={(id) => getMarkerStyle(hoveredId === id)}
          onMarkerClick={onMarkerClick}
          onHover={setHoveredId}
        />
      ))}
    </LayerGroup>
  );
};
