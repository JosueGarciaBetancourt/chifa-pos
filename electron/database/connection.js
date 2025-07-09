// electron/database/connection.js
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import Database from 'better-sqlite3';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Devuelve la ruta absoluta al archivo chifa.db según el entorno */
function resolveDbPath() {
  // 🖥️  Estamos *dentro* de Electron → usa la carpeta del usuario
  if (process.versions?.electron) {
    const { app } = require('electron');
    const userData = path.join(app.getPath('appData'), 'Electron', 'databases');
    return path.join(userData, 'chifa.db');
  }

  // 🛠️  Backend puro / tests → guarda dentro del proyecto
  return path.join(__dirname, '../../data', 'chifa.db');
}

/** Devuelve una instancia de better-sqlite3 */
export function connection() {
  const dbPath = resolveDbPath();
  const dbDir  = path.dirname(dbPath);

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('- Carpeta databases creada en:', dbDir);
  }

  console.log('- Conectando a base de datos en:', dbPath);
  return new Database(dbPath);
}