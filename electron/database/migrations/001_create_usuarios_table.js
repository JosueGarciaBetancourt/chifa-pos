export function up(db) { 
  console.log('[MIGRACIÓN] creando tabla usuarios...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dni TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      rol TEXT NOT NULL,
      contrasena_hash TEXT NOT NULL,
      activo BOOLEAN NOT NULL
    );
  `).run();
}
