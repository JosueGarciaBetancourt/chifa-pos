export function up(db) {
  console.log('[MIGRACION] Creando tabla permisos...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS permisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modulo_id INTEGER NOT NULL REFERENCES modulos_sistema(id),
      accion_id INTEGER NOT NULL REFERENCES acciones_sistema(id),
      UNIQUE(modulo_id, accion_id)
    );
  `).run();
}

