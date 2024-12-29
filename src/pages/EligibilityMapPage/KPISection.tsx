import { KPITracker } from "../../components/KPITracker/KPITracker";

interface KPISectionProps {
  totalTests: number;
  eligibleTests: number;
  updateKPIs: () => Promise<number>;
}

export const KPISection = ({
  totalTests,
  eligibleTests,
  updateKPIs,
}: KPISectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <KPITracker
        title="Nombre total de tests"
        value={totalTests}
        refreshInterval={30000}
        onRefresh={updateKPIs}
      />
      <KPITracker
        title="Tests éligibles"
        value={eligibleTests}
        refreshInterval={30000}
        onRefresh={async () => eligibleTests}
      />
    </div>
  );
};
