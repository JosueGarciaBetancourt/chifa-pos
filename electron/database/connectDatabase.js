import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { app } from 'electron';

export function connectDatabase() {
  const userDataPath = path.join(app.getPath('appData'), 'Electron');
  const dbDir = path.join(userDataPath, 'databases');
  const dbPath = path.join(dbDir, 'chifa.db');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('- Carpeta databases creada en:', dbDir);
  }

  console.log('- Conectando a base de datos en:', dbPath);
  console.log('\n');
  return new Database(dbPath);
}
