import { useState } from 'react';
import { LocationItem as Location } from '../components/types';

interface UseLocationHierarchyProps {
  initialData?: {
    regions: Location[];
    departments: { [key: string]: Location[] };
    cities: { [key: string]: Location[] };
  };
  loadData?: {
    departments?: (regionId: string) => Promise<Location[]>;
    cities?: (departmentId: string) => Promise<Location[]>;
  };
}

export const useLocationHierarchy = ({
  initialData,
  loadData,
}: UseLocationHierarchyProps) => {
  const [regions, setRegions] = useState<Location[]>(
    initialData?.regions || []
  );
  const [departments, setDepartments] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<Location | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Location | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);

  const [isLoading, setIsLoading] = useState({
    departments: false,
    cities: false,
  });

  const handleRegionChange = async (regionId: string) => {
    const region = regions.find((r) => r.id === regionId) || null;
    setSelectedRegion(region);
    setSelectedDepartment(null);
    setSelectedCity(null);
    setCities([]);

    if (!region) return;

    setIsLoading((prev) => ({ ...prev, departments: true }));
    try {
      let newDepartments: Location[];
      if (loadData?.departments) {
        newDepartments = await loadData.departments(regionId);
      } else {
        newDepartments = initialData?.departments[regionId] || [];
      }
      setDepartments(newDepartments);
    } finally {
      setIsLoading((prev) => ({ ...prev, departments: false }));
    }
  };

  const handleDepartmentChange = async (departmentId: string) => {
    const department = departments.find((d) => d.id === departmentId) || null;
    setSelectedDepartment(department);
    setSelectedCity(null);

    if (!department) return;

    setIsLoading((prev) => ({ ...prev, cities: true }));
    try {
      let newCities: Location[];
      if (loadData?.cities) {
        newCities = await loadData.cities(departmentId);
      } else {
        newCities = initialData?.cities[departmentId] || [];
      }
      setCities(newCities);
    } finally {
      setIsLoading((prev) => ({ ...prev, cities: false }));
    }
  };

  const handleCityChange = (cityId: string) => {
    const city = cities.find((c) => c.id === cityId) || null;
    setSelectedCity(city);
  };

  return {
    regions,
    departments,
    cities,
    selectedRegion,
    selectedDepartment,
    selectedCity,
    isLoading,
    handleRegionChange,
    handleDepartmentChange,
    handleCityChange,
  };
};
