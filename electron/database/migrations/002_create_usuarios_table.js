export function up(db) {
  console.log('[MIGRACION] Creando tabla usuarios...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dni TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      rol_id INTEGER NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      activo BOOLEAN NOT NULL DEFAULT 1,

      FOREIGN KEY (rol_id) REFERENCES roles(id)
    );
  `).run();
}

// rol TEXT NOT NULL CHECK(rol IN ('cajero', 'mozo', 'supervisor', 'admin', 'cocina')),
