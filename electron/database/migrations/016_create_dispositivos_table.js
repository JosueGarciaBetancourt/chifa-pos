export function up(db) {
    console.log('[MIGRACION] creando tabla dispositivos...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS dispositivos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          mac_address TEXT UNIQUE NOT NULL,
          ip_address TEXT,
          tipo TEXT NOT NULL CHECK(tipo IN ('caja', 'cocina', 'tablet_mozo')),
          ultima_conexion DATETIME
        );
      `).run();
  }
  