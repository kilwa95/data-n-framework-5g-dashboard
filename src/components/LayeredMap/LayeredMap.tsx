import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapStyle } from '../EligibilityMap/EligibilityMap.styles';
import { TestMarkers } from './TestMarkers';
import { LayeredMapProps } from '../types';

export const LayeredMap = ({
  regionsData,
  departmentsData,
  testLocations,
  className = '',
  onTestMarkerClick,
}: LayeredMapProps) => {
  const regionStyle = {
    fillColor: '#e3f2fd',
    weight: 2,
    opacity: 1,
    color: '#2196f3',
    fillOpacity: 0.4,
  };

  const departmentStyle = {
    fillColor: '#f5f5f5',
    weight: 1,
    opacity: 1,
    color: '#90caf9',
    fillOpacity: 0.3,
  };

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        className="h-[600px] w-full"
        zoomControl={false}
        minZoom={5}
        style={mapStyle}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Régions">
            <GeoJSON
              data={regionsData}
              style={regionStyle}
              onEachFeature={(feature, layer) => {
                layer.bindTooltip(feature.properties.name);
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Départements">
            <GeoJSON
              data={departmentsData}
              style={departmentStyle}
              onEachFeature={(feature, layer) => {
                layer.bindTooltip(feature.properties.name);
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Tests">
            <TestMarkers
              locations={testLocations}
              onMarkerClick={onTestMarkerClick}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};
