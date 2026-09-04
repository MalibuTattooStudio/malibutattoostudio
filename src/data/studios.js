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

/**
 * Display metadata for the two physical studios. `artists.studio` holds one of
 * these keys; the UI derives every label / badge from here so a studio rename
 * happens in one place.
 */
export const STUDIO_META = {
  santacruz: {
    key: 'santacruz',
    label: 'Santa Cruz',
    badge: 'Santa Cruz Studio',
    city: 'Santa Cruz de Tenerife',
  },
  tabaiba: {
    key: 'tabaiba',
    label: 'Tabaiba Baja',
    badge: 'Tabaiba Baja Studio',
    city: 'Tabaiba Baja, El Rosario',
  },
};

export const studioMeta = (key) => STUDIO_META[key] || STUDIO_META.santacruz;
