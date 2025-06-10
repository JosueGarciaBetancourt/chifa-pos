import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { app } from 'electron';
import { runMigrations } from './runMigrations.js';
import { runSeeders } from './runSeeders.js';

export async function initDatabase() {
  console.log("- Inicializando base de datos...");

  const userDataPath = path.join(app.getPath('appData'), 'Electron');
  const dbDir = path.join(userDataPath, 'databases');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('- Carpeta databases creada en:', dbDir);
  }

  const dbPath = path.join(dbDir, 'chifa.db');
  console.log('- Ruta de base de datos:', dbPath);

  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('- Base de datos anterior eliminada.');
  }

  const db = new Database(dbPath);
  
  await runMigrations(db);
  await runSeeders(db);

  db.close();
}
