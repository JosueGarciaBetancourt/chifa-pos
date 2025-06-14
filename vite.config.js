// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import electron  from 'vite-plugin-electron';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(__dirname, 'frontend'), // raíz del proyecto frontend
  plugins: [
    react(),
    tailwindcss(),
    electron({
      main: {
        entry: 'electron/main.js',
        vite: {
          build: {
            outDir: 'dist-electron',
            emptyOutDir: true,
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
            emptyOutDir: false,
          },
        },
      },
    })
  ],
  build: {
    outDir: 'dist',
  },
});
