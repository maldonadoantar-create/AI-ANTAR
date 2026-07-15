# Brokerage Industrial — INGENIUM BNI

Landing page para el servicio de Brokerage Industrial, fiel a la identidad de marca de
[ingenium-bni.com](https://ingenium-bni.com/) (navy `#05070D` + naranja `#FF6A1F`),
con un explorador de 6 propiedades con filtros en vivo, animaciones fluidas y
estructura pensada para reconstrucción 1:1 en **Elementor PRO** (Flexbox Containers).

## Vista previa local

```bash
cd brokerage-industrial
python3 -m http.server 8080
# abre http://localhost:8080
```

No requiere build ni dependencias: HTML + CSS + JS planos.

## Estructura

```
brokerage-industrial/
├── index.html              # Landing completa (header, hero, pilares, tipos de
│                            #   espacio, explorador de propiedades, proceso,
│                            #   stats, CTA/asesor, footer)
├── assets/css/style.css    # Design tokens + layout flex + animaciones
├── assets/js/main.js       # Filtros en vivo, scroll-reveal, contadores,
│                            #   nav móvil, deep-link de filtros por URL
└── ELEMENTOR-GUIDE.md      # Mapa sección-por-sección para reconstruir en
                             #   Elementor PRO (Containers, breakpoints, motion)
```

## Sistema de diseño

- **Color**: navy `ink-950…ink-500` + naranja `orange-300…orange-700` (marca)
- **Tipografía**: Archivo (display/encabezados), Inter (texto), JetBrains Mono
  (precios, specs, datos — guiño a los planos técnicos industriales)
- **Firma visual**: overlay tipo "blueprint" (grid técnico + scanline + reveal con
  `clip-path`) en el hero y en el hover de cada tarjeta de propiedad
- **Motion**: transiciones con curvas custom (`cubic-bezier`), `prefers-reduced-motion`
  respetado, `hover` con feedback en `:active`, reveal por scroll con
  `IntersectionObserver`

## Responsive

Breakpoints alineados a los valores por defecto de Elementor: **1024 / 768 / 767 / 480**.
Sin scroll horizontal en ningún ancho (verificado con Playwright en 390 / 768 / 1440px).

## Auditoría

Revisado contra las [Web Interface Guidelines de Vercel](https://github.com/vercel-labs/web-interface-guidelines):
accesibilidad de formularios y botones-ícono, `focus-visible`, `scroll-margin-top` en
anclas, `color-scheme`/`theme-color`, deep-link de filtros vía URL, `touch-action`,
`overscroll-behavior` en el menú móvil, `text-wrap: balance` y `tabular-nums`.
