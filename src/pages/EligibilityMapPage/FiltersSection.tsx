import { HierarchyLocationFilter } from "../../components/HierarchyLocationFilter/HierarchyLocationFilter";
import { EligibilityFilter } from "../../components/EligibilityFilter/EligibilityFilter";
import { Filters } from "../types";
interface LocationItem {
  id: string;
  name: string;
}

interface LocationData {
  regions: LocationItem[];
  departments: Record<string, LocationItem[]>;
  cities: Record<string, LocationItem[]>;
}

interface FiltersSectionProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  mockLocationData: LocationData;
}

export const FiltersSection = ({
  setFilters,
  mockLocationData,
}: FiltersSectionProps) => {
  return (
    <div className="space-y-4">
      <HierarchyLocationFilter
        onChange={(location) => setFilters((prev) => ({ ...prev, location }))}
        initialData={mockLocationData}
        labels={{
          region: "Région",
          department: "Département",
          city: "Ville",
        }}
        placeholders={{
          region: "Sélectionnez une région",
          department: "Sélectionnez un département",
          city: "Sélectionnez une ville",
        }}
      />
      <EligibilityFilter
        onChange={(eligibility) =>
          setFilters((prev) => ({
            ...prev,
            eligibility: eligibility as Filters["eligibility"],
          }))
        }
      />
    </div>
  );
};
