import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Configuración de Electron para main y preload
    electron({
      main: {
        entry: 'electron/main.js',
        vite: {
          build: {
            outDir: 'dist-electron',
            emptyOutDir: true, // limpia el directorio antes de cada build
          },
        },
      },
      preload: {
        input: {
          preload: path.join(__dirname, 'electron/preload.js'),
        },
        vite: {
          build: {
            outDir: 'dist-electron',
            emptyOutDir: false, // evitar limpiar dist-electron otra vez
          },
        },
      },
    }),
  ],
  build: {
    outDir: 'dist', // donde se genera el build del frontend
  },
})
