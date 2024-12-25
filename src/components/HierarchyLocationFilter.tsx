import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
}

interface HierarchyData {
  regions: Location[];
  departments: Record<string, Location[]>;
  cities: Record<string, Location[]>;
}

interface HierarchyLocationFilterProps {
  onChange: (selection: {
    region: Location | null;
    department: Location | null;
    city: Location | null;
  }) => void;
  initialData?: HierarchyData;
  loadData?: {
    departments?: (regionId: string) => Promise<Location[]>;
    cities?: (departmentId: string) => Promise<Location[]>;
  };
  labels?: {
    region?: string;
    department?: string;
    city?: string;
  };
  placeholders?: {
    region?: string;
    department?: string;
    city?: string;
  };
  className?: string;
}

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

  const [isLoading, setIsLoading] = useState<{
    departments: boolean;
    cities: boolean;
  }>({
    departments: false,
    cities: false,
  });

  useEffect(() => {
    onChange({
      region: selectedRegion,
      department: selectedDepartment,
      city: selectedCity,
    });
  }, [selectedRegion, selectedDepartment, selectedCity, onChange]);

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

  const renderSelect = (
    id: string,
    label: string,
    placeholder: string,
    options: Location[],
    value: string | undefined,
    onChange: (value: string) => void,
    isDisabled: boolean,
    isLoading: boolean
  ) => (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-[#65676B] dark:text-gray-400 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full h-10 px-3 bg-[#F0F2F5] dark:bg-[#3A3B3C] 
            border border-transparent hover:border-[#1b74e4] 
            rounded-lg text-[#050505] dark:text-gray-200
            focus:border-[#1b74e4] focus:ring-2 focus:ring-[#1b74e4]/30
            transition-all duration-200 appearance-none"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
        >
          <option value="">{isLoading ? 'Loading...' : placeholder}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`p-4 bg-white dark:bg-[#242526] rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {renderSelect(
          'region',
          labels.region!,
          placeholders.region!,
          regions,
          selectedRegion?.id,
          handleRegionChange,
          false,
          false
        )}

        {renderSelect(
          'department',
          labels.department!,
          placeholders.department!,
          departments,
          selectedDepartment?.id,
          handleDepartmentChange,
          !selectedRegion,
          isLoading.departments
        )}

        {renderSelect(
          'city',
          labels.city!,
          placeholders.city!,
          cities,
          selectedCity?.id,
          handleCityChange,
          !selectedDepartment,
          isLoading.cities
        )}
      </div>
    </div>
  );
};
