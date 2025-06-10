import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Database from 'better-sqlite3';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

const userDataPath = path.join(app.getPath('appData'), 'Electron');
const dbDir = path.join(userDataPath, 'databases');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('Carpeta databases creada en:', dbDir);
}

const dbPath = path.join(dbDir, 'chifa.db');
console.log('Ruta de base de datos:', dbPath);

const db = new Database(dbPath);

// 📦 Función para crear ventana
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

// 📦 Manejar eventos IPC
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

// 📦 Cuando la app esté lista
app.whenReady().then(createWindow);

// 📦 Cerrar app en todas las plataformas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
