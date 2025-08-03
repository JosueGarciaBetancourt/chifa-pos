export function up(db) {
  console.log('[MIGRACION] Creando tabla permisos...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS permisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}

