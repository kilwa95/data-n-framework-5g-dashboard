import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Filters } from '../../pages/types';

interface MapProps {
  filters: Filters;
  className: string;
}

export const Map = ({ filters, className }: MapProps) => {
  return (
    <div className="relative">
      <MapContainer
        center={[46.227638, 2.213749]}
        className={className}
        minZoom={6}
        zoom={6}
        maxZoom={18}
        maxBounds={[
          [51.5, -5.5], // North-West corner of France
          [41.3, 8.2], // South-East corner of France
        ]}
        maxBoundsViscosity={1.0} // Empêche le glissement en dehors des limites de la France
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxNativeZoom={18}
          maxZoom={18}
          minZoom={6}
          tileSize={256}
        />
      </MapContainer>
    </div>
  );
};
