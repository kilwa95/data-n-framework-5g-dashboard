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

  export interface DateInputProps {
    id: string;
    label: string;
    value: Date;
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    dateFormat: string;
  }