export function up(db) {
  console.log('[MIGRACION] creando tabla logs_sistema...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS logs_sistema (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
      accion TEXT NOT NULL,                      -- Ejemplo: 'crear', 'actualizar', 'eliminar', 'login'
      modulo TEXT NOT NULL,                      -- Ejemplo: 'usuarios', 'pedidos', 'inventario'
      descripcion TEXT,                          -- Detalle del cambio o acción realizada
      fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      dispositivo_id INTEGER REFERENCES dispositivos(id) ON DELETE SET NULL
    );
  `).run();
}
