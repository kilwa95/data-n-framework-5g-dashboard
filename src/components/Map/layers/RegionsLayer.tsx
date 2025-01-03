import { useMemo, useState, useCallback } from 'react';
import { GeoJSON } from 'react-leaflet';
import { Feature, FeatureCollection } from 'geojson';
import { scaleQuantize } from 'd3-scale';
import { schemeBlues } from 'd3-scale-chromatic';
import type { Filters } from '../../../pages/types';
import { Layer } from 'leaflet';

interface RegionsLayerProps {
  data: FeatureCollection;
  filters: Filters;
  onRegionSelect: (regionId: string | null) => void;
}

export const RegionsLayer = ({
  data,
  filters,
  onRegionSelect,
}: RegionsLayerProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Calculer les KPIs par région en fonction des filtres
  const regionKPIs = useMemo(() => {
    const kpis: Record<string, number> = {};

    // Ici, vous devrez implémenter la logique pour calculer les KPIs
    // basée sur vos données de test et les filtres actuels
    // Pour l'exemple, on utilise des valeurs statiques
    data.features.forEach((feature) => {
      const regionId = feature.properties?.id;
      if (regionId) {
        kpis[regionId] = Math.random() * 100; // À remplacer par votre logique
      }
    });

    return kpis;
  }, [data, filters]);

  // Créer l'échelle de couleurs
  const colorScale = useMemo(() => {
    const values = Object.values(regionKPIs);
    return scaleQuantize<string>()
      .domain([Math.min(...values), Math.max(...values)])
      .range(schemeBlues[9]);
  }, [regionKPIs]);

  // Style des régions
  const getRegionStyle = useCallback(
    (feature: Feature) => {
      const regionId = feature.properties?.id;
      const isHovered = hoveredRegion === regionId;
      const kpiValue = regionKPIs[regionId] || 0;

      return {
        fillColor: colorScale(kpiValue),
        weight: isHovered ? 3 : 1,
        opacity: 1,
        color: isHovered ? '#666' : '#999',
        fillOpacity: isHovered ? 0.7 : 0.5,
      };
    },
    [hoveredRegion, regionKPIs, colorScale]
  );

  // Gestionnaire d'événements pour chaque région
  const onEachFeature = useCallback(
    (feature: Feature, layer: Layer) => {
      const regionId = feature.properties?.id;
      const regionName = feature.properties?.name || 'Région inconnue';
      const kpiValue = regionKPIs[regionId] || 0;

      layer.on({
        mouseover: () => setHoveredRegion(regionId),
        mouseout: () => setHoveredRegion(null),
        click: () => onRegionSelect(regionId),
      });

      layer.bindTooltip(
        `
        <div class="p-2">
          <div class="font-bold">${regionName}</div>
          <div>Tests éligibles : ${Math.round(kpiValue)}</div>
        </div>
        `,
        { permanent: false, direction: 'top' }
      );
    },
    [regionKPIs, onRegionSelect]
  );

  return (
    <GeoJSON data={data} style={getRegionStyle} onEachFeature={onEachFeature} />
  );
};
