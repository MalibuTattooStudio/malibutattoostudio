/**
 * Canonical per-studio accent colors — single source of truth for badges,
 * filter chips and any studio-coded UI. Matches the StudiosSection cards and
 * the TechOverlay HUD legend.
 */
export const STUDIO_COLORS = {
  all: '#ffffff',        // neutral — "all artists"
  santacruz: '#ff5500',  // brand orange
  tabaiba: '#00f0ff',    // cyan
  tattootruck: '#c084fc', // purple
};

export const studioColor = (key) => STUDIO_COLORS[key] || STUDIO_COLORS.santacruz;
