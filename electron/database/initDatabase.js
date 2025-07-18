// electron/database/initDatabase.js
import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { app } from 'electron';
import { runMigrations } from './runMigrations.js';
import { runSeeders } from './runSeeders.js';

export async function initDatabase(reset = false) {
  const userDataPath = app.getPath('appData');
  const dbDir = path.join(userDataPath, 'Electron', 'databases');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('- Carpeta databases creada en:', dbDir);
  }

  const dbPath = path.join(dbDir, 'chifa.db');
  console.log('- Ruta de base de datos:', dbPath);

  const dbExists = fs.existsSync(dbPath);

  // Si reset=true y la DB existe, eliminarla
  if (reset && dbExists) {
    fs.unlinkSync(dbPath);
    console.log('- Base de datos anterior eliminada.');
  }

  // Crear conexión a la base de datos
  const db = new Database(dbPath);

  // Ejecutar migraciones y seeders si:
  // - reset=true (independientemente de si existía antes)
  // - O si la base de datos no existía antes
  if (reset || !dbExists) {
    await runMigrations(db);
    await runSeeders(db);
    console.log('- Base de datos creada e inicializada');
  } else {
    console.log('- Base de datos ya existe, verificando migraciones pendientes...');
    await runMigrations(db);
    console.log('- Base de datos verificada');
  }

  return db;
}