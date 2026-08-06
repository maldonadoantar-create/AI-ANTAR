# Arcos — conoce gente en Querétaro

Demo funcional de una app de citas ambientada en Querétaro: desliza perfiles,
haz match y chatea, todo corriendo en el navegador con `localStorage` (sin
backend).

Como los 74 arcos del Acueducto de Querétaro conectan dos lados de la
ciudad, el diseño usa el arco como firma visual: las tarjetas de perfil, los
medallones de avatar y la pantalla de match están enmarcados con esa misma
silueta.

## Correr en local

```bash
npm install
npm run dev
```

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion (swipe con gestos, animación de match)
- Persistencia en `localStorage` — perfil propio, likes/pasos y chats
  sobreviven a un refresh, sin servidor.

## Estructura

- `src/data/profiles.ts` — perfiles ficticios en colonias reales de Querétaro.
- `src/lib/storage.ts` — helpers de `localStorage`.
- `src/lib/avatar.ts` + `src/components/Avatar.tsx` — medallones generados
  (iniciales sobre degradado) en vez de fotos externas.
- `src/components/SwipeDeck.tsx` — el mazo de swipe con física de arrastre.
- `src/screens/` — Onboarding, Discover, Matches, Chat y Profile.
