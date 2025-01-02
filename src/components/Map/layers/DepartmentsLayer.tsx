import { useMemo, useState, useCallback } from 'react';
import { GeoJSON } from 'react-leaflet';
import { Feature, FeatureCollection } from 'geojson';
import { scaleQuantize } from 'd3-scale';
import { schemeBlues } from 'd3-scale-chromatic';
import type { Filters } from '../../../pages/types';
import { Layer } from 'leaflet';

interface DepartmentsLayerProps {
  data: FeatureCollection;
  filters: Filters;
  selectedRegion: string | null;
  visible: boolean;
}

export const DepartmentsLayer = ({
  data,
  filters,
  selectedRegion,
  visible,
}: DepartmentsLayerProps) => {
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(
    null
  );

  // Filtrer les départements de la région sélectionnée
  const filteredData = useMemo(() => {
    if (!selectedRegion) return data;

    return {
      type: 'FeatureCollection',
      features: data.features.filter(
        (feature) => feature.properties?.region_id === selectedRegion
      ),
    } as FeatureCollection;
  }, [data, selectedRegion]);

  // Calculer les KPIs par département
  const departmentKPIs = useMemo(() => {
    const kpis: Record<string, number> = {};

    // Ici vous devrez implémenter la logique pour calculer les KPIs
    // basée sur vos données de test et les filtres actuels
    filteredData.features.forEach((feature) => {
      const deptId = feature.properties?.id;
      if (deptId) {
        kpis[deptId] = Math.random() * 100; // À remplacer par votre logique
      }
    });

    return kpis;
  }, [filteredData, filters]);

  // Créer l'échelle de couleurs
  const colorScale = useMemo(() => {
    const values = Object.values(departmentKPIs);
    if (values.length === 0) return () => '#ccc';

    return scaleQuantize<string>()
      .domain([Math.min(...values), Math.max(...values)])
      .range(schemeBlues[9]);
  }, [departmentKPIs]);

  // Style des départements
  const getDepartmentStyle = useCallback(
    (feature: Feature) => {
      const deptId = feature.properties?.id;
      const isHovered = hoveredDepartment === deptId;
      const kpiValue = departmentKPIs[deptId] || 0;

      return {
        fillColor: colorScale(kpiValue),
        weight: isHovered ? 3 : 1,
        opacity: 1,
        color: isHovered ? '#666' : '#999',
        fillOpacity: isHovered ? 0.7 : 0.5,
      };
    },
    [hoveredDepartment, departmentKPIs, colorScale]
  );

  // Gestionnaire d'événements pour chaque département
  const onEachFeature = useCallback(
    (feature: Feature, layer: Layer) => {
      const deptId = feature.properties?.id;
      const deptName = feature.properties?.name || 'Département inconnu';
      const kpiValue = departmentKPIs[deptId] || 0;

      layer.on({
        mouseover: () => setHoveredDepartment(deptId),
        mouseout: () => setHoveredDepartment(null),
      });

      layer.bindTooltip(
        `
        <div class="p-2">
          <div class="font-bold">${deptName}</div>
          <div>Tests éligibles : ${Math.round(kpiValue)}</div>
        </div>
        `,
        { permanent: false, direction: 'top' }
      );
    },
    [departmentKPIs]
  );

  if (!visible) return null;

  return (
    <GeoJSON
      key={selectedRegion || 'all'} // Force re-render when region changes
      data={filteredData}
      style={getDepartmentStyle}
      onEachFeature={onEachFeature}
    />
  );
};
