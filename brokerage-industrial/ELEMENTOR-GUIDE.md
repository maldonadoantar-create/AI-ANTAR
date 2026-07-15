# Guía de reconstrucción en Elementor PRO

Este landing (`index.html` + `assets/css/style.css` + `assets/js/main.js`) está escrito con **Flexbox puro** y nombres de clase que calcan la estructura de **Elementor Containers** (`e-con` / `e-con-inner`). Cada sección del HTML trae un comentario `ELEMENTOR MAP` indicando a qué Container corresponde. Esta guía traduce esa estructura a pasos concretos dentro del editor.

> Requisito: Elementor PRO ≥ 3.6 con **Flexbox Container** activo en Configuración del sitio → Funciones (ya es el motor por defecto en versiones recientes).

## 0. Fundación del sitio

1. **Site Settings → Global Colors**, crear/editar:
   - `ink-950` `#05070D` (fondo)
   - `ink-800` `#0E1522` (superficie/tarjeta)
   - `text-primary` `#F6F7FB`
   - `text-secondary` `#9AA5C2`
   - `orange-500` `#FF6A1F` (acento)
   - `orange-600` `#EE5710`
2. **Site Settings → Global Fonts**:
   - Display / Encabezados: **Archivo**, pesos 700/800/900
   - Texto: **Inter**, pesos 400/500/600/700
   - Datos/Precios/Specs: **JetBrains Mono**, pesos 400/500/600
3. **Site Settings → Layout**: Content Width `1280px`, Breakpoints = Elementor default (Mobile 767 / Mobile Extra 480 / Tablet 768 / Tablet Extra 1024 / Laptop 1366 → usamos 1024 como el corte principal "Laptop").
4. Activa **Custom Colors / Custom Fonts** y desactiva Elementor's default page padding (lo controlamos por Container).

## 1. Header (Container global — Site Settings → Theme Builder → Header)

```
Container (flex, row, justify: space-between, align: center, height: 84px, position: Sticky, z-index 100)
├─ Container (flex, row, gap 10px) → Logo
│   ├─ Image/SVG widget (icono hexágono, color orange-500)
│   └─ Heading widget ("INGENIUM" + sub-heading "BNI · Brokerage Industrial")
├─ Container (flex, row, gap 24px) → Nav
│   └─ Nav Menu widget (Elementor PRO) — enlaces ancla: #top #tipos-espacio #propiedades #proceso #contacto
└─ Container (flex, row, gap 16px) → Acciones
    ├─ Icon + Text widget (teléfono) — oculto en Tablet/Mobile
    ├─ Button widget "Hablar con un asesor" — oculto en Tablet/Mobile (breakpoint visibility)
    └─ Toggle/Menu widget de Elementor (hamburguesa) — visible solo en Tablet/Mobile
```
- Background: `rgba(5,7,13,.6)` + **Background Blur** (Advanced → Background → Filters) 14px.
- Motion Effects → Sticky: "On scroll" + condición de clase para el borde inferior (usa un Custom CSS snippet corto o el widget "Sticky" nativo con clase `is-scrolled`).

## 2. Hero (`#top`)

```
Container (flex, row → column @tablet, gap 96px, padding-block 64px/96px)
├─ Container (flex, column, gap 24px, flex: 1 1 480px) → Copy
│   ├─ Text widget (eyebrow) "Brokerage Industrial"
│   ├─ Heading widget (H1) — usa <br> manual + <span> naranja para "tiempo correcto"
│   ├─ Text Editor (lede)
│   ├─ Container (flex, row, gap 16px, wrap) → 2 Button widgets
│   └─ Container (flex, row, gap 32px, border-top 1px) → 3× (Counter widget + Text)
│        Counter widget PRO nativo reemplaza el contador JS (`data-count`) 1:1.
└─ Container (flex, flex: 1 1 460px, aspect-ratio 4/4.4) → Visual
    └─ SVG/Image widget con la ilustración blueprint (exporta el `<svg>` de `index.html` como archivo .svg y súbelo a la Media Library)
```
- Los 2 badges flotantes (`badge-float`) son **Containers con posición Absoluta** (Advanced → Position: Absolute, offsets en %).
- El scan-line animado: usa **Motion Effects → Entrance Animation** para el reveal inicial, o incrusta el SVG con `<style>` embebido (Elementor permite HTML widget para el SVG completo si prefieres conservar la animación CSS exacta).

## 3. Franja de pilares (naranja)

```
Container (flex, row → column @mobile, gap 64px, bg: linear-gradient(100deg, orange-600, orange-500 55%, orange-400), padding-block 48px)
├─ Container (flex, column, flex: 1 1 260px) → eyebrow + Heading
└─ Container (flex, row wrap, gap 32px, flex: 2 1 560px) → 4× Container (icon + H3 + texto)
```

## 4. Tipos de espacio (`#tipos-espacio`)

```
Container (flex, column, padding-block 96px)
├─ Container (flex, row, justify space-between) → Heading + texto
└─ Container (flex, row wrap, gap 24px) → 4× "Icon Box" widget (PRO)
     Icon Box = icono en caja redondeada + H3 + texto + Text ("N disponibles")
     Hover: Icon Box → Style → Hover → transform translateY(-4px), cambiar bg del icon-wrap.
```

## 5. Explorador de propiedades (`#propiedades`) — la sección clave

```
Container (flex, column, padding-block 96px, bg ink-900, border-top/bottom 1px)
├─ Container (flex, row, justify space-between) → Heading + Button "Ver todas"
└─ Container (flex, row → column @1024, gap 48px, align-items flex-start) → Layout
    ├─ Container "Filtros" (flex, column, gap 24px, width 296px, position Sticky top 100px,
    │                        bg ink-800, border 1px, radius 20px, padding 32px)
    │   ├─ Container (flex, row, justify space-between) → "Filtros" + botón "Limpiar"
    │   ├─ Repeater/Container por grupo: Operación / Tipo / Ubicación / Precio
    │   │    Los "chips" = Button widgets en modo Toggle (usa el plugin nativo
    │   │    "Elementor Forms" NO es necesario; son botones con estado visual —
    │   │    en Elementor puro, usa una fila de Button widgets + una pequeña
    │   │    porción de JS custom (Advanced → Custom CSS/Custom Attributes) o el
    │   │    widget "Filterable Gallery" de Elementor PRO / JetSmartFilters de
    │   │    Crocoblock si el sitio ya usa JetEngine, para lógica de filtro real.
    │   └─ Button widget "Aplicar filtros" (ancho 100%)
    └─ Container "Grid" (flex, column, gap 24px, flex: 1 1 0)
        ├─ Container (flex, row, justify space-between, border-bottom) → contador + Select (Ordenar por)
        └─ Container (flex, row wrap, gap 24px) → 6× "Card" (ver abajo)
```

**Tarjeta de propiedad (repite 6×, o usa un Loop Grid con CPT "Propiedades" — recomendado a mediano plazo):**

```
Container (flex, column, flex: 1 1 300px, max-width calc(33.33% - gap), bg ink-800,
           border 1px, radius 20px, overflow hidden)
├─ Container (position relative, aspect-ratio 16/11) → Media
│   ├─ Image widget (foto real de la propiedad)
│   ├─ Text widget "En renta/venta" (badge, position absolute top-left)
│   ├─ Icon Button "favorito" (position absolute top-right)
│   └─ Container overlay specs (position absolute, bottom, clip-path en hover —
│        recrear con Motion Effects → Hover Animation "Grow" no es igual; para el
│        reveal tipo blueprint usa Advanced → Custom CSS del widget con las mismas
│        reglas de `clip-path` de `style.css`)
├─ Container (flex, column, gap 12px, padding 24px) → Body
│   ├─ Text (ubicación + ícono pin)
│   ├─ Heading H3 (título)
│   ├─ Text (precio, fuente JetBrains Mono, color orange-400)
│   └─ Container (flex, row wrap, gap 16px, border-top) → specs (m², andenes…)
└─ Container (flex, row, justify space-between, border-top, padding 14px 24px) → Link "Ver ficha técnica"
```

> **Recomendación de producción:** para que "6 propiedades y filtros" sea editable por
> contenido (no solo por diseño), migra las tarjetas a un **CPT "Propiedad"** con campos
> ACF/JetEngine (`operación`, `tipo`, `ubicación`, `precio_m2`, `m2_construccion`,
> `m2_terreno`, `altura`, `andenes`) y renderiza el grid con **Loop Grid** de Elementor PRO
> + **JetSmartFilters** (o el filtro nativo de Loop Grid) enlazado a esos campos. Esta
> maqueta HTML define el diseño exacto (spacing, tipografía, estados) que el Loop Grid
> debe reproducir.

## 6. Proceso (`#proceso`)

```
Container (flex, column, padding-block 96px)
├─ Container (flex, column, align center, text center, max-width 620px, margin auto)
└─ Container (flex, row → column @tablet, gap 24px) → 4× Container (número mono + H3 + texto)
     Línea punteada entre pasos: Advanced → Custom CSS (::after) o Shape Divider a medida.
```

## 7. Franja de estadísticas

```
Container (flex, row wrap, justify space-between, padding-block 64px, bg ink-800, border-y 1px)
└─ 4× Container (flex, row, gap 16px) → icon box + Counter widget + Text
```

## 8. CTA + Asesor (`#contacto`)

```
Container (flex, row → column @1024, gap 48px, bg gradient ink-800→ink-900,
           border 1px, radius 28px, padding 48px)
├─ Container (flex, column, gap 16px, flex 1 1 420px) → Copy + 2 botones
└─ Container "Advisor Card" (flex, column, gap 16px, width 340px, bg ink-950,
                              border 1px, radius 20px, padding 32px)
    ├─ Container (flex, row, gap 16px) → avatar circular + H3 + texto
    ├─ 3× Icon + Text (tel / mail / WhatsApp)
    └─ Button widget "Agendar visita" (ancho 100%)
```

## 9. Footer (Theme Builder → Footer)

```
Container (flex, row wrap, gap 48px, padding-top 96px)
├─ Container (flex, column) → logo + texto + 4 iconos sociales
├─ Nav Menu / Container → Enlaces
├─ Nav Menu / Container → Servicios
└─ Container (flex, column) → newsletter (Form widget PRO, 1 campo email + submit)

Container (flex, row wrap space-between, border-top, padding-block 24px) → copyright + legales
```

## Breakpoints (igual a los definidos en `style.css`)

| Punto de corte | Uso en esta maqueta |
|---|---|
| **1024px** (Elementor "Laptop"/Tablet Extra) | Hero pasa a columna, filtros dejan de ser sticky y ocupan ancho completo, tarjetas 3→2 por fila |
| **768px** (Tablet) | Nav se oculta, aparece el toggle hamburguesa, franja de pilares pasa a columna |
| **767px** (Mobile) | Tarjetas 2→1 por fila, pasos del proceso en columna sin línea punteada |
| **480px** (Mobile Extra) | Botones a ancho completo, badges del hero pasan de flotantes a apilados |

Configura estos mismos valores en **Site Settings → Layout → Breakpoints** para que el
comportamiento "Laptop / Tablet / Mobile" que pediste sea idéntico al de esta maqueta.

## Animaciones (Motion Effects)

| Elemento | Equivalente en Elementor |
|---|---|
| Reveal al hacer scroll (`data-reveal`) | Motion Effects → Entrance Animation: **Fade In Up**, duración 620ms, easing personalizado `cubic-bezier(.23,1,.32,1)` (Custom CSS si el picker no lo permite) |
| Stagger de tarjetas/pilares | Entrance Animation + **Animation Delay** incremental (0, 70ms, 140ms…) por widget |
| Hover de botones (`scale(.97)` en active) | Style → Hover/Click → Transform → Scale 0.97, Transition 160ms |
| Hover de tarjeta (`translateY(-6px)`) | Style → Hover → Transform → Offset Y `-6px`, Transition 320ms |
| Overlay de specs (clip-path) | No tiene control nativo — usa Advanced → Custom CSS con las mismas reglas `clip-path: inset()` del archivo `style.css` |
| Contadores del hero | **Counter widget** nativo de Elementor (ya anima el conteo, sin JS) |
| `prefers-reduced-motion` | Elementor respeta la preferencia del sistema en sus Entrance Animations desde 3.16+; no requiere configuración adicional |

## Assets

Las ilustraciones (hero + 6 tarjetas) son SVG inline en `index.html`. Para Elementor:
1. Exporta cada `<svg>...</svg>` como archivo `.svg` (herramienta como Figma/Illustrator o
   guardarlo tal cual con extensión `.svg`).
2. Súbelos a la Media Library (activa "Unfiltered File Uploads" en Elementor si es necesario).
3. Reemplázalos por fotografía real de cada propiedad cuando esté disponible — el
   `card-spec-overlay` (specs en hover) funciona igual sobre una foto.
