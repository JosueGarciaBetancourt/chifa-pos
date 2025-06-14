// electron/main.js (ES Modules)
process.on('uncaughtException', (err) => {
  if (
    err.message.includes('VideoProcessorGetOutputExtension') ||
    err.message.includes('Autofill')
  ) {
    // Silencia errores molestos del sistema
    return;
  }

  console.error('- Error no manejado:', err);
});

import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import { initDatabase } from './database/initDatabase.js';
import { connection } from './database/connection.js';
import { productosHandlers } from './handlers/productos.js';

import expressApp from '../backend/src/app.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;
let db;
let server;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(async () => {
  try {
    // Opcional: inicializar y conectar base local para uso desde Electron (via IPC)
    await initDatabase();
    db = connection();
    productosHandlers(db);

    const URL = expressApp.get('url') || 'http://localhost';
    const PORT = expressApp.get('port') || 4000;
    server = expressApp.listen(PORT, '0.0.0.0', () =>
      console.log(`- API REST (Express) ${URL}:${PORT}/api`)
    );

    createWindow();
  } catch (error) {
    console.error('Error durante el arranque:', error);
  }
});

/* =============== cierre limpio =============== */
function closeGracefully() {
  console.log('\n- Cerrando servidor…');
  server?.close(() => {
    console.log('- Servidor cerrado correctamente');
    // Si quieres cerrar la BD:
    // db?.close();
    app.quit();             // termina Electron
  });
}

process.on('SIGINT',  closeGracefully); // Ctrl-C
process.on('SIGTERM', closeGracefully); // kill / cierre SO

app.on('window-all-closed', () => {
  // No uses backendProcess?.kill() porque ya no existe
  if (process.platform !== 'darwin') closeGracefully();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
