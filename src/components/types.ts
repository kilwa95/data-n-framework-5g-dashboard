export interface DateRangeSelectorProps {
    onChange: (range: { start: Date; end: Date }) => void;
    format?: string;
    locale?: "fr" | "en";
    className?: string;
    labels?: {
      from: string;
      to: string;
    };
  }