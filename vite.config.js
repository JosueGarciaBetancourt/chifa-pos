import 'dotenv/config.js';
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
  server: {
    host: '0.0.0.0', // Acepta conexiones externas
    origin: process.env.FRONTEND_URL,
    strictPort: true,
    port: Number(process.env.FRONTEND_PORT) // Asegúrate de usar el mismo puerto que configuras en ngrok
  },
  build: {
    outDir: 'dist',
  },
});
