import { TestResult } from '../components/types';
import { startOfHour, startOfDay, startOfMonth, format } from 'date-fns';

export const aggregateTestResults = (
  results: TestResult[],
  frequency: 'hourly' | 'daily' | 'monthly'
) => {
  const aggregated = results.reduce(
    (acc, result) => {
      const date = new Date(result.datetime);
      let key: string;

      // Déterminer la clé de regroupement en fonction de la fréquence
      switch (frequency) {
        case 'hourly':
          key = format(startOfHour(date), "yyyy-MM-dd'T'HH:00:00");
          break;
        case 'daily':
          key = format(startOfDay(date), "yyyy-MM-dd'T'00:00:00");
          break;
        case 'monthly':
          key = format(startOfMonth(date), "yyyy-MM-dd'T'00:00:00");
          break;
      }

      // Initialiser ou incrémenter le compteur
      if (!acc[key]) {
        acc[key] = {
          timestamp: key,
          total: 0,
          eligible: 0,
        };
      }

      acc[key].total++;
      if (result.can_subscribe) {
        acc[key].eligible++;
      }

      return acc;
    },
    {} as Record<string, { timestamp: string; total: number; eligible: number }>
  );

  // Convertir l'objet en tableau et trier par timestamp
  return Object.values(aggregated).sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );
};
