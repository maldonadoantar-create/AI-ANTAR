export const AVATAR_THEMES = [
  { id: "cantera", label: "Cantera", from: "#E8B4A8", to: "#C2543A" },
  { id: "jacaranda", label: "Jacaranda", from: "#C7B4F0", to: "#7C62C2" },
  { id: "atardecer", label: "Atardecer", from: "#F0B23D", to: "#F0714F" },
  { id: "acueducto", label: "Acueducto", from: "#A084E8", to: "#F0714F" },
  { id: "noche", label: "Noche", from: "#7A5B85", to: "#2A1730" },
  { id: "talavera", label: "Talavera", from: "#8FD3D0", to: "#2F6E76" },
] as const;

export type AvatarTheme = (typeof AVATAR_THEMES)[number];

export function themeById(id: string): AvatarTheme {
  return AVATAR_THEMES.find((t) => t.id === id) ?? AVATAR_THEMES[0];
}

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash;
}

export function themeForSeed(seed: string): AvatarTheme {
  return AVATAR_THEMES[hashSeed(seed) % AVATAR_THEMES.length];
}

export function initials(name: string): string {
  return name.trim().slice(0, 1).toUpperCase() || "?";
}
