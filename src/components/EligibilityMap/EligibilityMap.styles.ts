export const mapStyle = {
  height: "100%",
  width: "100%",
};

export const departmentStyle = {
  fillColor: "#f5f5f5",
  weight: 1,
  opacity: 1,
  color: "#e5e7eb",
  fillOpacity: 0.7,
};

export const getMarkerStyle = (isHovered: boolean) => ({
  radius: isHovered ? 8 : 6,
  fillColor: "#1e88e5",
  color: "#1e88e5",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
});
