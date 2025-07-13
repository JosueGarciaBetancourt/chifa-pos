export function up(db) {
    console.log('[MIGRACION] creando tabla estados_comprobantes...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS estados_comprobantes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT UNIQUE NOT NULL,
          descripcion TEXT
        );
      `).run();
  }
  