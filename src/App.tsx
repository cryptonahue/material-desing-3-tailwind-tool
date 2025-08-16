import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { ButtonPreview } from "./components/Button";
import { generateTheme } from "./lib/theme";

interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
}

// Default Material Design 3 colors
const defaultColors: ThemeColors = {
  primary: "#6750A4",
  secondary: "#625B71",
  tertiary: "#7D5260",
  neutral: "#939094",
};

function App() {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cssTheme, setCssTheme] = useState("");

  useEffect(() => {
    const theme = generateTheme(colors);
    setCssTheme(theme);
  }, [colors]);

  useEffect(() => {
    const styleTagId = "dynamic-theme-style";
    let styleTag = document.getElementById(styleTagId) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleTagId;
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = cssTheme;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [cssTheme, isDarkMode]);

  const handleColorChange = (colorName: keyof ThemeColors, value: string) => {
    setColors((prevColors) => ({
      ...prevColors,
      [colorName]: value,
    }));
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar
        colors={colors}
        onColorChange={handleColorChange}
        isDarkMode={isDarkMode}
        onDarkModeChange={setIsDarkMode}
        cssTheme={cssTheme}
      />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-onSurface">Component Preview</h1>
          <div className="space-y-8">
            <ButtonPreview />
            {/* Other component previews will go here */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
