export function up(db) {
  console.log('[MIGRACION] Creando tabla roles...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}

