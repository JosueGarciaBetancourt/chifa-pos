export function up(db) {
  console.log('[MIGRACION] creando tabla logs_sistema...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS logs_sistema (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
      accion_id INTEGER NOT NULL REFERENCES acciones_sistema(id),
      modulo_id INTEGER NOT NULL REFERENCES modulos_sistema(id),
      descripcion TEXT,
      fecha_hora DATETIME NOT NULL,
      dispositivo_id INTEGER REFERENCES dispositivos(id) ON DELETE SET NULL
    );  
  `).run();
}
