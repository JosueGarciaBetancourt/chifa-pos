export function up(db) {
  console.log('[MIGRACION] creando tabla notificaciones_usuarios...');
  db.prepare(`
    CREATE TABLE notificaciones_usuarios (
      notificacion_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      leido INTEGER DEFAULT 0,
      PRIMARY KEY (notificacion_id, usuario_id),
      FOREIGN KEY (notificacion_id) REFERENCES notificaciones(id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
  `).run();
}
