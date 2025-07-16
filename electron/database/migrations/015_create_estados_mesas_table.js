export function up(db) {
  console.log('[MIGRACION] creando tabla estados_mesas...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS estados_mesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL,
      descripcion TEXT
    );
  `).run();
}
