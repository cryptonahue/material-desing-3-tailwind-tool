import {
  argbFromHex,
  themeFromSourceColor,
  Hct,
  TonalPalette,
  Scheme,
  CorePalette,
} from "@material/material-color-utilities";
import { rgbaToHsl } from "@med/ts-color-converter";

interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
}

function argbToRgba(argb: number) {
  const r = (argb >> 16) & 0xff;
  const g = (argb >> 8) & 0xff;
  const b = argb & 0xff;
  return { r, g, b, a: 1 }; // Alpha is not used in HSL conversion
}

/**
 * Generates Material Design 3 theme from a set of custom colors.
 * @param colors - The four base colors for the theme.
 * @returns A CSS string with the generated theme.
 */
export function generateTheme(colors: ThemeColors): string {
  // Base theme from primary color
  const theme = themeFromSourceColor(argbFromHex(colors.primary), [
    { name: "secondary", value: argbFromHex(colors.secondary), blend: true },
    { name: "tertiary", value: argbFromHex(colors.tertiary), blend: true },
  ]);

  // Override neutral palettes if a neutral color is provided
  if (colors.neutral) {
    const neutralHct = Hct.fromInt(argbFromHex(colors.neutral));
    theme.palettes.neutral = TonalPalette.fromHueAndChroma(neutralHct.hue, neutralHct.chroma);
    theme.palettes.neutralVariant = TonalPalette.fromHueAndChroma(neutralHct.hue, neutralHct.chroma / 3);
  }

  // Cast to CorePalette for Scheme generation
  const corePalette = theme.palettes as CorePalette;

  const lightScheme = Scheme.light(corePalette);
  const darkScheme = Scheme.dark(corePalette);

  const toCssCasing = (str: string) =>
    str.replace(/([A-Z])/g, "-$1").toLowerCase();

  const schemeToCss = (scheme: Scheme) => {
    const jsonScheme = scheme.toJSON();
    return Object.entries(jsonScheme)
      .map(([key, value]) => {
        const { r, g, b } = argbToRgba(value);
        const hsl = rgbaToHsl({ r, g, b, a: 1 });
        return `    --${toCssCasing(key)}: ${hsl.h} ${hsl.s}% ${hsl.l}%;`;
      })
      .join("\n");
  };

  const lightCss = schemeToCss(lightScheme);
  const darkCss = schemeToCss(darkScheme);

  return `:root {\n${lightCss}\n}\n\n.dark {\n${darkCss}\n}`;
}
