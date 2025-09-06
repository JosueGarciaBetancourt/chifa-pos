const node_env = process.env.NODE_ENV || 'development';

if (node_env === 'development') {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
}

// Captura errores globales de forma segura
process.on('uncaughtException', (err) => {
  if (
    err.message.includes('VideoProcessorGetOutputExtension') ||
    err.message.includes('Autofill')
  ) {
    return; // Silenciar errores molestos del sistema
  }
  console.error('X Excepción no capturadanpm ru:', err);
});

import { app as electronApp, BrowserWindow } from "electron";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { initDatabase } from "./database/initDatabase.js";
import { connection } from "./database/connection.js";
import { registerAllIpcHandlers } from './handlers/index.js';

import { app as expressApp, server } from "../backend/src/app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;
let db;

function createWindow() {
  try {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: true
      },
    });

    // Manejar errores del renderer
    mainWindow.webContents.on('crashed', (event, killed) => {
      console.error('Renderer process crashed:', { killed });
    });

    mainWindow.webContents.on('render-process-gone', (event, details) => {
      console.error('Render process gone:', details);
    });

    const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (frontend_url && node_env === "development") {
      mainWindow.loadURL(frontend_url);
      // Espera a que el frontend haya cargado completamente
      mainWindow.webContents.once("did-finish-load", () => {
        mainWindow.webContents.openDevTools();
      });
    } else {
      mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }
  } catch (error) {
    console.error("\nError creando la ventana principal:", error);
  }
}

electronApp.whenReady().then(async () => {
  try {
    console.log("\n- Inicializando base de datos...");
    await initDatabase();
    db = connection();

    console.log("\n- Registrando handlers IPC...");
    registerAllIpcHandlers(db);
    
    // Levantar servidor API
    const URL = expressApp.get("url") || "http://localhost";
    const PORT = expressApp.get("port") || 4000;

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`\nAPI REST activa en ${URL}:${PORT}/api\n`);
    });

    createWindow();
  } catch (error) {
    console.error("\nError crítico durante el arranque:", error);
  }
});

function closeGracefully() {
  console.log('\n- Cerrando servidor...');
  server?.close(() => {
    console.log('- Servidor cerrado correctamente');
    // Si quieres cerrar la BD:
    db?.close();
    electronApp.quit();             // termina Electron
  });
}

process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);

electronApp.on("window-all-closed", () => {
  if (process.platform !== "darwin") closeGracefully();
});

electronApp.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    try {
      createWindow();
    } catch (error) {
      console.error("\n Error al reactivar la ventana:", error);
    }
  }
});
