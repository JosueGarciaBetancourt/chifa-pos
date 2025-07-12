export function up(db) {
  console.log('[MIGRACION] creando tabla notificaciones...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS notificaciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      tipo_id INTEGER NOT NULL REFERENCES tipos_notificaciones(id) ON DELETE CASCADE,
      titulo TEXT,
      mensaje TEXT NOT NULL,
      leido BOOLEAN NOT NULL DEFAULT 0, -- 0 = no leído, 1 = leído
      creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `).run();
}
