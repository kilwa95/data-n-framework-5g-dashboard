export const getTestMarkerStyle = (
  isEligible: boolean,
  isHovered: boolean
) => ({
  radius: isHovered ? 8 : 6,
  fillColor: isEligible ? '#4CAF50' : '#f44336',
  color: isEligible ? '#388E3C' : '#D32F2F',
  weight: 1,
  opacity: 1,
  fillOpacity: isHovered ? 0.9 : 0.7,
});

export const getSiteMarkerStyle = (status: string, isHovered: boolean) => {
  const getColorByStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#4CAF50';
      case 'inactive':
        return '#f44336';
      case 'maintenance':
        return '#FFC107';
      default:
        return '#9E9E9E';
    }
  };

  return {
    fillColor: getColorByStatus(status),
    color: getColorByStatus(status),
    weight: 2,
    opacity: isHovered ? 1 : 0.8,
    fillOpacity: isHovered ? 0.4 : 0.2,
  };
};
