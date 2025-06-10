import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { initDatabase } from './init-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;
let db;

function connectDatabase() {
  const userDataPath = path.join(app.getPath('appData'), 'Electron');
  const dbDir = path.join(userDataPath, 'databases');
  const dbPath = path.join(dbDir, 'chifa.db');
  
  console.log('📌 Conectando a base de datos en:', dbPath);

  db = new Database(dbPath);
}

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

ipcMain.handle('test', () => {
  return 'Funciona desde Electron!';
});

ipcMain.handle('getProductosByCategoria', (event, categoria) => {
  try {
    const stmt = db.prepare('SELECT id, nombre, descripcion, precio FROM productos WHERE categoria = ?');
    const productos = stmt.all(categoria);
    return productos;
  } catch (error) {
    console.error('Error consultando productos:', error);
    return [];
  }
});

app.whenReady().then(() => {
  try {
    // Inicializar desde cero en cada arranque
    initDatabase();

    // Conectar base de datos
    connectDatabase();

    createWindow();
  } catch  (error) {
    console.error(error);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
