import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FrequencyType } from '../components/types';

export const formatters: Record<FrequencyType, (timestamp: string) => string> =
  {
    hourly: (timestamp: string) =>
      format(parseISO(timestamp), 'HH:mm', { locale: fr }),
    daily: (timestamp: string) =>
      format(parseISO(timestamp), 'dd MMM', { locale: fr }),
    monthly: (timestamp: string) =>
      format(parseISO(timestamp), 'MMM yyyy', { locale: fr }),
  };
