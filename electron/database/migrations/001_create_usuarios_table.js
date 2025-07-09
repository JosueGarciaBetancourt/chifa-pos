export function up(db) {
  console.log('[MIGRACIÓN] Creando tabla usuarios...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dni TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      rol TEXT NOT NULL CHECK(rol IN ('cajero', 'mozo', 'supervisor', 'admin', 'cocina')),
      contrasena_hash TEXT NOT NULL,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}