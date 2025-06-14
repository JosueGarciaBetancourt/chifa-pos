// electron/database/runMigrations.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* --------------------------------------------------------------------------
 *  Obtener __dirname en ESM
 * ------------------------------------------------------------------------ */
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* --------------------------------------------------------------------------
 *  Ejecuta las migraciones directamente embebidas (sin archivos externos)
 * ------------------------------------------------------------------------ */
export async function runMigrations(db) {
  /* 1. Tabla de control --------------------------------------------------- */
  db.prepare(`
    CREATE TABLE IF NOT EXISTS migrations (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      name    TEXT NOT NULL UNIQUE,
      run_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

  const applied = new Set(
    db.prepare('SELECT name FROM migrations').all().map(r => r.name)
  );

  console.log('- Ejecutando migraciones integradas');

  /* 2. Migración: crear tabla productos ---------------------------------- */
  const MIGRATION_NAME = '001_create_productos_table';

  if (!applied.has(MIGRATION_NAME)) {
    try {
      console.log('MIGRACIÓN creando tabla productos...');

      db.prepare(`
        CREATE TABLE IF NOT EXISTS productos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          precio REAL NOT NULL,
          categoria TEXT NOT NULL
        );
      `).run();

      db.prepare('INSERT INTO migrations (name) VALUES (?)').run(MIGRATION_NAME);
      console.log(`- Migracion ${MIGRATION_NAME} aplicada.`);
    } catch (err) {
      console.error(`- Error ejecutando ${MIGRATION_NAME}:`, err);
      throw err;
    }
  } else {
    console.log(`- Migracion ${MIGRATION_NAME} ya estaba aplicada.`);
  }

  // Puedes agregar más migraciones aquí abajo
}
