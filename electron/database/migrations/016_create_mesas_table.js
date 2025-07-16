export function up(db) {
  console.log('[MIGRACION] creando tabla mesas...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS mesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT UNIQUE NOT NULL,
      capacidad INTEGER NOT NULL,
      estado_mesa_id INTEGER NOT NULL REFERENCES estados_mesas(id) ON DELETE CASCADE,
      sede_id INTEGER NOT NULL REFERENCES sede_local(id) ON DELETE CASCADE
    );
  `).run();
}
