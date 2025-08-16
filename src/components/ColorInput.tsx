import React from "react";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <label className="capitalize text-sm">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className="w-8 h-8"
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-24 p-1 border rounded"
        />
      </div>
    </div>
  );
};
