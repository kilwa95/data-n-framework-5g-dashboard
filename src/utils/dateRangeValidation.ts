import { isAfter, isBefore, parse } from "date-fns";
import type { Locale } from "date-fns";

interface DateRange {
  start: Date;
  end: Date;
}

interface ValidateDateChangeResult {
  error: string | null;
  newRange: DateRange | null;
}

export const validateDateChange = (
  type: "start" | "end",
  value: string,
  currentRange: DateRange,
  dateFormat: string,
  locale: Locale,
): ValidateDateChangeResult => {
  try {
    const newDate = parse(value, dateFormat, new Date(), { locale });

    const newRange = {
      ...currentRange,
      [type]: newDate,
    };

    if (type === "start" && isAfter(newDate, currentRange.end)) {
      return {
        error: "Start date cannot be after end date",
        newRange: null,
      };
    }

    if (type === "end" && isBefore(newDate, currentRange.start)) {
      return {
        error: "End date cannot be before start date",
        newRange: null,
      };
    }

    return {
      error: null,
      newRange,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      error: "Invalid date format",
      newRange: null,
    };
  }
};
