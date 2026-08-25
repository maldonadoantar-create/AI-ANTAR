import {existsSync} from 'node:fs';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Algunos entornos aislados (p. ej. contenedores de CI/sandbox) ya traen un
// Chromium headless preinstalado y bloquean la descarga automatica de
// Remotion. Si detectamos ese binario, lo reutilizamos; en un ordenador
// normal esta ruta no existe y Remotion descarga su propio navegador.
const sandboxHeadlessShell =
	'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';

if (existsSync(sandboxHeadlessShell)) {
	Config.setBrowserExecutable(sandboxHeadlessShell);
}
