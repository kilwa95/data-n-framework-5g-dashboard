import { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: string;
  name: string;
}

interface MapFilters {
  region: Location | null;
  department: Location | null;
  city: Location | null;
  eligibility: Record<string, boolean>;
}

interface EligibilityMapProps {
  filters: MapFilters;
  className?: string;
}

export const EligibilityMap = ({
  filters,
  className = '',
}: EligibilityMapProps) => {
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState([46.603354, 1.888334]); // France center
  const [activeLayer, setActiveLayer] = useState<
    'regions' | 'departments' | 'tests'
  >('regions');
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGeoData = async () => {
      setLoading(true);
      try {
        // Simuler un appel API - à remplacer par votre vraie API
        const response = await fetch(`/api/${activeLayer}`, {
          method: 'POST',
          body: JSON.stringify(filters),
        });
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error('Failed to fetch geo data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoData();
  }, [activeLayer, filters]);

  const getLayerStyle = (feature: any) => ({
    fillColor: getColorByEligibilityRate(feature.properties.eligibilityRate),
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7,
  });

  const getColorByEligibilityRate = (rate: number) => {
    return rate > 80
      ? '#10B981'
      : rate > 60
        ? '#34D399'
        : rate > 40
          ? '#6EE7B7'
          : rate > 20
            ? '#A7F3D0'
            : '#D1FAE5';
  };

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-[600px] w-full rounded-lg"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && activeLayer !== 'tests' && (
          <GeoJSON
            data={geoData}
            style={getLayerStyle}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: () => {
                  if (activeLayer === 'regions') {
                    setActiveLayer('departments');
                    setZoom(8);
                  } else if (activeLayer === 'departments') {
                    setActiveLayer('tests');
                    setZoom(12);
                  }
                },
              });
            }}
          >
            <Tooltip>
              {({ feature }: { feature: { properties: { name: string; eligibleCount: number; totalCount: number } } }) => (
                <div className="p-2">
                  <h3 className="font-semibold">
                    {feature.properties.name}
                  </h3>
                  <p>
                    Tests éligibles: {feature.properties.eligibleCount}
                  </p>
                  <p>Total tests: {feature.properties.totalCount}</p>
                </div>
              )}
            </Tooltip>
          </GeoJSON>
        )}

        {geoData &&
          activeLayer === 'tests' &&
          geoData.features.map((point: any) => (
            <CircleMarker
              key={point.id}
              center={[
                point.geometry.coordinates[1],
                point.geometry.coordinates[0],
              ]}
              radius={6}
              pathOptions={{
                color: point.properties.eligible ? '#10B981' : '#EF4444',
                fillColor: point.properties.eligible ? '#10B981' : '#EF4444',
                fillOpacity: 0.7,
              }}
            >
              <Tooltip>
                <div className="p-2">
                  <h3 className="font-semibold">Test #{point.id}</h3>
                  <p>Éligible: {point.properties.eligible ? 'Oui' : 'Non'}</p>
                  <p>ZTD: {point.properties.is_ztd ? 'Oui' : 'Non'}</p>
                  <p>
                    Coverage: {point.properties.found_coverage ? 'Oui' : 'Non'}
                  </p>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
      </MapContainer>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
