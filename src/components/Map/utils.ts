import { LatLng } from 'leaflet';

export const calculateSectorPolygon = (
  center: [number, number],
  azimuth: number,
  radius: number = 0.001, // ~100m en degrés
  angle: number = 60 // angle du secteur en degrés
): [number, number][] => {
  const centerPoint = new LatLng(center[0], center[1]);
  const points: [number, number][] = [];

  // Point central
  points.push([centerPoint.lat, centerPoint.lng]);

  // Points de l'arc
  const startAngle = azimuth - angle / 2;
  const endAngle = azimuth + angle / 2;

  for (let i = startAngle; i <= endAngle; i += 5) {
    const radian = (i * Math.PI) / 180;
    const point = centerPoint.destinationPoint(radius, i);
    points.push([point.lat, point.lng]);
  }

  // Fermer le polygone
  points.push([centerPoint.lat, centerPoint.lng]);

  return points;
};

// Extension de LatLng pour calculer un point de destination
declare module 'leaflet' {
  interface LatLng {
    destinationPoint(distance: number, bearing: number): LatLng;
  }
}

LatLng.prototype.destinationPoint = function (
  distance: number,
  bearing: number
): LatLng {
  const R = 6371000; // Rayon de la Terre en mètres
  const δ = distance / R; // Distance angulaire
  const θ = (bearing * Math.PI) / 180; // Bearing en radians
  const φ1 = (this.lat * Math.PI) / 180; // Latitude actuelle en radians
  const λ1 = (this.lng * Math.PI) / 180; // Longitude actuelle en radians

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  );

  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
      Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
    );

  return new LatLng(
    (φ2 * 180) / Math.PI,
    (((λ2 * 180) / Math.PI + 540) % 360) - 180
  );
};
