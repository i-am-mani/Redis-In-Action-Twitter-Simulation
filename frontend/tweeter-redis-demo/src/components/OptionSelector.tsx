import * as React from "react";

export const OptionSelector: React.FC<{
  onSelected: (option: string) => void;
  value: string;
  allOptions: string[];
  label: string;
}> = ({ onSelected, value, allOptions, label }) => {
  return (
    <div className="flex flex-col">
      <label className="font-thin tracking-wide">{label}</label>

      <select
        className="block w-full text-gray-700 py-2 px-3 border border-gray-300
         bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        name="animals"
        onChange={(e) => {
          onSelected(e.target.value);
        }}
      >
        <option value="">Select an options</option>
        {allOptions.map((option) => (
          <option selected={option === value} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
