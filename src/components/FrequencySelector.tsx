import { FrequencyType } from "./types";

interface FrequencySelectorProps {
  activeFrequency: FrequencyType;
  onFrequencyChange: (frequency: FrequencyType) => void;
}

export const FrequencySelector = ({
  activeFrequency,
  onFrequencyChange,
}: FrequencySelectorProps) => {
  return (
    <div className="flex gap-2">
      {(["hourly", "daily", "monthly"] as FrequencyType[]).map((freq) => (
        <button
          key={freq}
          onClick={() => onFrequencyChange(freq)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors
            ${
              activeFrequency === freq
                ? "bg-[#1b74e4] text-white"
                : "bg-[#F0F2F5] dark:bg-[#3A3B3C] text-[#050505] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
        >
          {freq === "hourly" && "Horaire"}
          {freq === "daily" && "Journalier"}
          {freq === "monthly" && "Mensuel"}
        </button>
      ))}
    </div>
  );
};
