import type { CSSProperties } from "react";

export type TvTheme = {
  headerImage: string;
  backgroundImage: string;
  cornerLeft?: string;
  cornerRight?: string;
  primary: string;
  accent: string;
  glow: string;
  cardBorder: string;
  headerText: string;
  sloganLeft: string;
  sloganRight: string;
  footerLeft: string;
  footerRight: string;
};

export const TV_THEMES: Readonly<Record<string, TvTheme>> = {
  GAC01: {
    headerImage: "/tv-theme/gac01/header.webp",
    backgroundImage: "/tv-theme/gac01/background.webp",
    cornerLeft: "/tv-theme/gac01/corner-left.png",
    cornerRight: "/tv-theme/gac01/corner-right.png",
    primary: "#0B3D2E",
    accent: "#D4A73A",
    glow: "rgba(212, 167, 58, 0.42)",
    cardBorder: "rgba(212, 167, 58, 0.78)",
    headerText: "#FFF8DC",
    sloganLeft: "HIGHER STANDARDS",
    sloganRight: "FLY HIGHER",
    footerLeft: "LANDED LOCALLY · HIGHER DAILY",
    footerRight: "GREEN AIR CANNABIS · FLY HIGHER",
  },
};

export function getTvTheme(storeCode?: string | null): TvTheme | undefined {
  return storeCode ? TV_THEMES[storeCode] : undefined;
}

type TvThemeVariables = CSSProperties & {
  "--tv-theme-header-image": string;
  "--tv-theme-background-image": string;
  "--tv-theme-primary": string;
  "--tv-theme-accent": string;
  "--tv-theme-glow": string;
  "--tv-theme-card-border": string;
  "--tv-theme-header-text": string;
};

export function getTvThemeVariables(theme: TvTheme): TvThemeVariables {
  return {
    "--tv-theme-header-image": `url("${theme.headerImage}")`,
    "--tv-theme-background-image": `url("${theme.backgroundImage}")`,
    "--tv-theme-primary": theme.primary,
    "--tv-theme-accent": theme.accent,
    "--tv-theme-glow": theme.glow,
    "--tv-theme-card-border": theme.cardBorder,
    "--tv-theme-header-text": theme.headerText,
  };
}
