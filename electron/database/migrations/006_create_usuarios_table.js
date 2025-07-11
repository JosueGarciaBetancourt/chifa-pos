export function up(db) {
  console.log('[MIGRACION] Creando tabla usuarios...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dni TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}
