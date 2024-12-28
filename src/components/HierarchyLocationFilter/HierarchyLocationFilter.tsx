import { useEffect } from 'react';
import { useLocationHierarchy } from '../../hooks/useLocationHierarchy';
import { LocationSelect } from '../LocationSelect';
import { HierarchyLocationFilterProps } from '../types';

export const HierarchyLocationFilter = ({
  onChange,
  initialData,
  loadData,
  labels = {
    region: 'Region',
    department: 'Department',
    city: 'City',
  },
  placeholders = {
    region: 'Select a region',
    department: 'Select a department',
    city: 'Select a city',
  },
  className = '',
}: HierarchyLocationFilterProps) => {
  const {
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
  } = useLocationHierarchy({ initialData, loadData });

  useEffect(() => {
    onChange({
      region: selectedRegion,
      department: selectedDepartment,
      city: selectedCity,
    });
  }, [selectedRegion, selectedDepartment, selectedCity, onChange]);

  return (
    <div
      className={`p-4 bg-white dark:bg-[#242526] rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <LocationSelect
          id="region"
          label={labels.region!}
          placeholder={placeholders.region!}
          options={regions}
          value={selectedRegion?.id}
          onChange={handleRegionChange}
          isDisabled={false}
          isLoading={false}
        />

        <LocationSelect
          id="department"
          label={labels.department!}
          placeholder={placeholders.department!}
          options={departments}
          value={selectedDepartment?.id}
          onChange={handleDepartmentChange}
          isDisabled={!selectedRegion}
          isLoading={isLoading.departments}
        />

        <LocationSelect
          id="city"
          label={labels.city!}
          placeholder={placeholders.city!}
          options={cities}
          value={selectedCity?.id}
          onChange={handleCityChange}
          isDisabled={!selectedDepartment}
          isLoading={isLoading.cities}
        />
      </div>
    </div>
  );
};
