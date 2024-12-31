import { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import { Feature, FeatureCollection } from 'geojson';
import { scaleQuantize } from 'd3-scale';
import { schemeGreens } from 'd3-scale-chromatic';

interface RegionalKPIMapProps {
  regionsData: FeatureCollection;
  kpiData: Record<string, number>;
  className?: string;
  onRegionClick?: (regionId: string) => void;
}

export const RegionalKPIMap = ({
  regionsData,
  kpiData,
  className = '',
  onRegionClick,
}: RegionalKPIMapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(6);

  // Créer l'échelle de couleurs en fonction des valeurs KPI
  const colorScale = useMemo(() => {
    const values = Object.values(kpiData);
    return scaleQuantize<string>()
      .domain([Math.min(...values), Math.max(...values)])
      .range(schemeGreens[9]);
  }, [kpiData]);

  // Style des régions
  const getRegionStyle = useCallback(
    (feature: Feature) => {
      const regionId = feature.properties?.code || feature.properties?.id;
      const isHovered = hoveredRegion === regionId;
      const kpiValue = kpiData[regionId] || 0;

      return {
        fillColor: colorScale(kpiValue),
        weight: isHovered ? 3 : 1,
        opacity: 1,
        color: isHovered ? '#666' : '#999',
        fillOpacity: isHovered ? 0.7 : 0.5,
      };
    },
    [hoveredRegion, kpiData, colorScale]
  );

  // Gestionnaire d'événements pour chaque région
  const onEachRegion = useCallback(
    (feature: Feature, layer: L.Layer) => {
      const regionId = feature.properties?.code || feature.properties?.id;
      const regionName = feature.properties?.name || 'Région inconnue';
      const kpiValue = kpiData[regionId] || 0;

      layer.on({
        mouseover: () => setHoveredRegion(regionId),
        mouseout: () => setHoveredRegion(null),
        click: () => onRegionClick?.(regionId),
      });

      layer.bindTooltip(
        `
        <div class="p-2">
          <div class="font-bold">${regionName}</div>
          <div>Tests éligibles : ${kpiValue}</div>
        </div>
        `,
        { permanent: false, direction: 'top' }
      );
    },
    [kpiData, onRegionClick]
  );

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        className="h-full w-full"
        zoomControl={false}
        minZoom={5}
        maxZoom={9}
        onZoomEnd={(e) => setZoomLevel(e.target.getZoom())}
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <GeoJSON
          data={regionsData}
          style={getRegionStyle}
          onEachFeature={onEachRegion}
        />
      </MapContainer>
    </div>
  );
};
