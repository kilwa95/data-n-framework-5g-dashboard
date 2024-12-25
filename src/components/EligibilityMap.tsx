import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  CircleMarker,
  Tooltip,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { MarkerClusterGroup } from '@changey/react-leaflet-markercluster';
import '@changey/react-leaflet-markercluster/dist/styles.min.css';

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
  onMarkerClick?: (point: any) => void;
}

// Composant pour gérer les mises à jour de la carte
const MapUpdater = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.8 });
  }, [map, center, zoom]);

  return null;
};

export const EligibilityMap = ({
  filters,
  className = '',
  onMarkerClick,
}: EligibilityMapProps) => {
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState<[number, number]>([46.603354, 1.888334]); // France center
  const [activeLayer, setActiveLayer] = useState<
    'regions' | 'departments' | 'tests'
  >('regions');
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Styles de base pour la carte
  const mapStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '0.75rem',
    overflow: 'hidden',
  };

  const getLayerStyle = useCallback(
    (feature: any) => ({
      fillColor: getColorByEligibilityRate(feature.properties.eligibilityRate),
      weight: hoveredFeature === feature.id ? 2 : 1,
      opacity: 0.8,
      color: '#E5E7EB',
      fillOpacity: hoveredFeature === feature.id ? 0.8 : 0.6,
      className: 'transition-all duration-200',
    }),
    [hoveredFeature]
  );

  const getColorByEligibilityRate = (rate: number) => {
    return rate > 80
      ? '#047857'
      : rate > 60
        ? '#059669'
        : rate > 40
          ? '#10B981'
          : rate > 20
            ? '#34D399'
            : '#6EE7B7';
  };

  // Optimisation du rendu des marqueurs avec useMemo
  const markers = useMemo(() => {
    if (!geoData || activeLayer !== 'tests') return null;

    return geoData.features.map((point: any) => (
      <CircleMarker
        key={point.id}
        center={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
        radius={hoveredFeature === point.id ? 8 : 6}
        pathOptions={{
          color: point.properties.eligible ? '#047857' : '#DC2626',
          fillColor: point.properties.eligible ? '#047857' : '#DC2626',
          fillOpacity: hoveredFeature === point.id ? 1 : 0.8,
          weight: hoveredFeature === point.id ? 2 : 1,
          className: 'transition-all duration-200',
        }}
        eventHandlers={{
          click: () => onMarkerClick?.(point),
          mouseover: () => setHoveredFeature(point.id),
          mouseout: () => setHoveredFeature(null),
        }}
      >
        <Tooltip
          className="bg-white shadow-lg rounded-lg border-0 px-4 py-2"
          opacity={1}
          permanent={hoveredFeature === point.id}
        >
          <div className="text-sm">
            <h3 className="font-semibold text-gray-900">Test #{point.id}</h3>
            <div className="mt-1 text-gray-600">
              <p>Éligible: {point.properties.eligible ? 'Oui' : 'Non'}</p>
              <p>ZTD: {point.properties.is_ztd ? 'Oui' : 'Non'}</p>
              <p>Coverage: {point.properties.found_coverage ? 'Oui' : 'Non'}</p>
            </div>
          </div>
        </Tooltip>
      </CircleMarker>
    ));
  }, [geoData, activeLayer, hoveredFeature, onMarkerClick]);

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

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-[600px] w-full"
        zoomControl={false}
        attributionControl={false}
        style={mapStyle}
      >
        <ZoomControl position="bottomright" />
        <MapUpdater center={center} zoom={zoom} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
                    setCenter([
                      feature.properties.center[1],
                      feature.properties.center[0],
                    ]);
                  } else if (activeLayer === 'departments') {
                    setActiveLayer('tests');
                    setZoom(12);
                    setCenter([
                      feature.properties.center[1],
                      feature.properties.center[0],
                    ]);
                  }
                },
                mouseover: (e) => {
                  setHoveredFeature(feature.id);
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.8,
                    weight: 2,
                  });
                },
                mouseout: (e) => {
                  setHoveredFeature(null);
                  const layer = e.target;
                  layer.setStyle(getLayerStyle(feature));
                },
              });
            }}
          />
        )}

        {activeLayer === 'tests' && (
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            spiderfyOnMaxZoom={true}
            disableClusteringAtZoom={15}
          >
            {markers}
          </MarkerClusterGroup>
        )}
      </MapContainer>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
