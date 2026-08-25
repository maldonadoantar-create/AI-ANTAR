# AI-ANTAR — Remotion

Proyecto [Remotion](https://www.remotion.dev/) para crear y renderizar video mediante codigo (React + TypeScript). Incluye una composicion de ejemplo (`HelloWorld`) lista para editar.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- [FFmpeg](https://ffmpeg.org/) instalado y disponible en el `PATH`

### Instalar FFmpeg en tu ordenador

- **macOS** (con [Homebrew](https://brew.sh/)):
  ```bash
  brew install ffmpeg
  ```
- **Windows** (con [winget](https://learn.microsoft.com/windows/package-manager/winget/) o [Chocolatey](https://chocolatey.org/)):
  ```bash
  winget install ffmpeg
  # o
  choco install ffmpeg
  ```
- **Linux** (Debian/Ubuntu):
  ```bash
  sudo apt-get update && sudo apt-get install -y ffmpeg
  ```

Verifica la instalacion con:

```bash
ffmpeg -version
```

Alternativamente, Remotion puede descargar su propio binario de FFmpeg automaticamente:

```bash
npx remotion ffmpeg-version
```

## Instalacion del proyecto

Clona el repositorio y, dentro de la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

## Uso

- **Editor visual (Remotion Studio)**, para previsualizar y ajustar las composiciones en el navegador:
  ```bash
  npm start
  ```
- **Renderizar un video** a `out/video.mp4`:
  ```bash
  npm run build
  ```
- **Renderizar cualquier composicion** a una ruta especifica:
  ```bash
  npx remotion render <ID_DE_COMPOSICION> out/mi-video.mp4
  ```
- **Actualizar Remotion** a la ultima version:
  ```bash
  npm run upgrade
  ```

## Estructura

```
src/
  index.ts               # Punto de entrada, registra el Root
  Root.tsx                # Declara las composiciones disponibles
  compositions/
    HelloWorld.tsx        # Composicion de ejemplo (animacion de texto)
remotion.config.ts        # Configuracion de renderizado
```

## Crear una nueva composicion

1. Crea un componente React en `src/compositions/` (recibe `useCurrentFrame`, `useVideoConfig`, etc. de `remotion`).
2. Registra la composicion en `src/Root.tsx` con un `<Composition />` (id, duracion, fps, dimensiones).
3. Previsualiza con `npm start` o renderiza con `npx remotion render <ID>`.
