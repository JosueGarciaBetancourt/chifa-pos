export function up(db) {
  console.log('[MIGRACIÓN] creando tabla mesas...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS mesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero TEXT UNIQUE NOT NULL,
      capacidad INTEGER NOT NULL,
      estado TEXT NOT NULL CHECK(estado IN ('libre', 'ocupada', 'reservada', 'inactiva')) DEFAULT 'libre'
    );
  `).run();
}
