export function up(db) {
  console.log('[MIGRACION] Creando tabla roles_permisos...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS roles_permisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
      permiso_id INTEGER NOT NULL REFERENCES permisos(id) ON DELETE CASCADE,

      UNIQUE (rol_id, permiso_id)
    );
  `).run();
}

