/** @type {import('tailwindcss').Config} */

function toCssCasing(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

const md3Colors = [
  "primary",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "secondary",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "tertiary",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "error",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "background",
  "onBackground",
  "surface",
  "onSurface",
  "surfaceVariant",
  "onSurfaceVariant",
  "outline",
  "outlineVariant",
  "shadow",
  "scrim",
  "inverseSurface",
  "inverseOnSurface",
  "inversePrimary",
].reduce((acc, color) => {
  const cssVariable = toCssCasing(color);
  acc[color] = `hsl(var(--${cssVariable}) / <alpha-value>)`;
  return acc;
}, {});


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: md3Colors,
    },
  },
  plugins: [],
};
