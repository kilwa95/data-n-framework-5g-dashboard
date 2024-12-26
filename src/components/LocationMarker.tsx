import { CircleMarker, Tooltip } from 'react-leaflet';
import type { LocationMarkerProps } from './types';

export const LocationMarker = ({
  location,
  isHovered,
  getMarkerStyle,
  onMarkerClick,
  onHover,
}: LocationMarkerProps) => {
  return (
    <CircleMarker
      key={location.id}
      center={location.coordinates}
      {...getMarkerStyle(location.id)}
      eventHandlers={{
        click: () => onMarkerClick?.(location),
        mouseover: () => onHover(location.id),
        mouseout: () => onHover(null),
      }}
    >
      <Tooltip
        permanent={isHovered}
        direction="top"
        offset={[0, -10]}
        opacity={1}
        className="bg-white shadow-lg rounded-lg border-0 px-3 py-1"
      >
        <div className="text-sm font-medium text-gray-900">{location.name}</div>
      </Tooltip>
    </CircleMarker>
  );
};
