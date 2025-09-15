export function up(db) {
  console.log('[MIGRACION] creando tabla tipos_notificaciones...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS tipos_notificaciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL
    );
  `).run();
}