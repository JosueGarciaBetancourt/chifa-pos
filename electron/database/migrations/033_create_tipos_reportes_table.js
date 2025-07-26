export function up(db) {
    console.log('[MIGRACION] creando tabla tipos_reportes...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS tipos_reportes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT UNIQUE NOT NULL,
          descripcion TEXT
        );
      `).run();
  }
  