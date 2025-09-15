export function up(db) {
  console.log('[MIGRACION] creando tabla modulos_sistema...');
  db.prepare(`
    CREATE TABLE modulos_sistema (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}
