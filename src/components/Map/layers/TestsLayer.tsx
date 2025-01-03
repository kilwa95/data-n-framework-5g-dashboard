import { useMemo, useState } from 'react';
import { LayerGroup, CircleMarker, Tooltip, Polygon } from 'react-leaflet';
import type { Filters } from '../../../pages/types';
import { getTestMarkerStyle, getSiteMarkerStyle } from '../styles';
import { calculateSectorPolygon } from '../utils';

interface TestData {
  id: string;
  coordinates: [number, number];
  eligibility: boolean;
  details: {
    is_ztd: boolean;
    foundCoverage: boolean;
    sector_capacity: string;
    active_4g_cells: number;
    active_5g_cells: number;
  };
}

interface SiteData {
  id: string;
  coordinates: [number, number];
  azimuth: number;
  status: string;
}

interface TestsLayerProps {
  testData: TestData[];
  sitesData?: SiteData[];
  filters: Filters;
  visible: boolean;
}

export const TestsLayer = ({
  testData,
  sitesData = [],
  filters,
  visible,
}: TestsLayerProps) => {
  const [hoveredTestId, setHoveredTestId] = useState<string | null>(null);
  const [hoveredSiteId, setHoveredSiteId] = useState<string | null>(null);

  // Filtrer les tests selon les critères
  const filteredTests = useMemo(() => {
    return testData.filter((test) => {
      const matchesLocation =
        !filters.location.region || // Si pas de région sélectionnée, on garde tout
        (test.coordinates[0] >= filters.location.region.bounds[0][0] &&
          test.coordinates[0] <= filters.location.region.bounds[1][0] &&
          test.coordinates[1] >= filters.location.region.bounds[0][1] &&
          test.coordinates[1] <= filters.location.region.bounds[1][1]);

      const matchesEligibility =
        (!filters.eligibility.can_subscribe || test.eligibility) &&
        (!filters.eligibility.is_ztd || test.details.is_ztd) &&
        (!filters.eligibility.found_coverage || test.details.foundCoverage) &&
        (!filters.eligibility.sector_capacity ||
          test.details.sector_capacity === 'High') &&
        (!filters.eligibility.active_4g || test.details.active_4g_cells > 0) &&
        (!filters.eligibility.active_5g || test.details.active_5g_cells > 0);

      return matchesLocation && matchesEligibility;
    });
  }, [testData, filters]);

  if (!visible) return null;

  return (
    <LayerGroup>
      {/* Points de test */}
      {filteredTests.map((test) => (
        <CircleMarker
          key={test.id}
          center={test.coordinates}
          {...getTestMarkerStyle(test.eligibility, hoveredTestId === test.id)}
          eventHandlers={{
            mouseover: () => setHoveredTestId(test.id),
            mouseout: () => setHoveredTestId(null),
          }}
        >
          <Tooltip permanent={hoveredTestId === test.id}>
            <div className="p-2">
              <div className="font-bold">Test #{test.id}</div>
              <div>Éligible : {test.eligibility ? 'Oui' : 'Non'}</div>
              <div>ZTD : {test.details.is_ztd ? 'Oui' : 'Non'}</div>
              <div>
                Couverture : {test.details.foundCoverage ? 'Oui' : 'Non'}
              </div>
              <div>Capacité secteur : {test.details.sector_capacity}</div>
              <div>Cellules 4G : {test.details.active_4g_cells}</div>
              <div>Cellules 5G : {test.details.active_5g_cells}</div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}

      {/* Sites et secteurs */}
      {sitesData.map((site) => (
        <LayerGroup key={site.id}>
          {/* Triangle du site */}
          <Polygon
            positions={calculateSectorPolygon(site.coordinates, site.azimuth)}
            pathOptions={getSiteMarkerStyle(
              site.status,
              hoveredSiteId === site.id
            )}
            eventHandlers={{
              mouseover: () => setHoveredSiteId(site.id),
              mouseout: () => setHoveredSiteId(null),
            }}
          >
            <Tooltip permanent={hoveredSiteId === site.id}>
              <div className="p-2">
                <div className="font-bold">Site #{site.id}</div>
                <div>Status : {site.status}</div>
                <div>Azimut : {site.azimuth}°</div>
              </div>
            </Tooltip>
          </Polygon>
        </LayerGroup>
      ))}
    </LayerGroup>
  );
};
