export function up(db) {
  console.log('[MIGRACION] Creando tabla usuarios_permisos...');
  
  db.prepare(`
    CREATE TABLE usuarios_permisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      permiso_id INTEGER NOT NULL REFERENCES permisos(id) ON DELETE CASCADE,
      tipo TEXT NOT NULL CHECK(tipo IN ('extra', 'revocado')),
      UNIQUE(usuario_id, permiso_id)
    );
  `).run();
}

