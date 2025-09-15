export function up(db) {
  console.log('[MIGRACION] creando tabla acciones_sistema...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS acciones_sistema (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL
    );  
  `).run();
}
