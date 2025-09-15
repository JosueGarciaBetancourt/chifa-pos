export function up(db) {
  console.log('[MIGRACION] creando tabla notificaciones...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS notificaciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo_id INTEGER NOT NULL REFERENCES tipos_notificaciones(id) ON DELETE CASCADE,
      titulo TEXT,
      mensaje TEXT NOT NULL,
      creado_en DATETIME NOT NULL,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}
