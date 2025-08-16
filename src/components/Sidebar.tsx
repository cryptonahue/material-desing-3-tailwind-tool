import React from "react";
import { ColorInput } from "./ColorInput";

interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
}

interface SidebarProps {
  colors: ThemeColors;
  onColorChange: (colorName: keyof ThemeColors, value: string) => void;
  isDarkMode: boolean;
  onDarkModeChange: (isDark: boolean) => void;
  cssTheme: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  colors,
  onColorChange,
  isDarkMode,
  onDarkModeChange,
  cssTheme,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(cssTheme);
  };

  return (
    <aside className="w-96 bg-gray-100 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-6">MD3 Theme Generator</h1>

      {/* Color Inputs */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-lg">Key Colors</h3>
        {(Object.keys(colors) as Array<keyof ThemeColors>).map((colorName) => (
          <ColorInput
            key={colorName}
            label={colorName}
            value={colors[colorName]}
            onChange={(e) => onColorChange(colorName, e.target.value)}
          />
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-lg">Mode</h3>
        <label className="flex items-center justify-between">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={(e) => onDarkModeChange(e.target.checked)}
            className="toggle-checkbox" // Placeholder for a styled toggle
          />
        </label>
      </div>

      {/* Export Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-lg">Export</h3>
        <textarea
          readOnly
          value={cssTheme}
          className="w-full h-48 p-2 border rounded bg-gray-200 dark:bg-gray-700 font-mono text-xs"
        />
        <button
          onClick={handleCopy}
          className="w-full mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Copy to Clipboard
        </button>
      </div>

      {/* TODO List */}
      <div>
        <h3 className="font-semibold mb-2 text-lg">Component Status</h3>
        <ul className="space-y-1">
            <li className="flex items-center gap-2 text-green-600">
                <span className="w-5 h-5">✅</span>
                <span>Buttons</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
                <span className="w-5 h-5">⚪️</span>
                <span>Cards</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
                <span className="w-5 h-5">⚪️</span>
                <span>Chips</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
                <span className="w-5 h-5">⚪️</span>
                <span>Text Fields</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
                <span className="w-5 h-5">⚪️</span>
                <span>Top App Bar</span>
            </li>
        </ul>
      </div>
    </aside>
  );
};
