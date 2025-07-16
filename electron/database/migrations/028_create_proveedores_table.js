export function up(db) {
    console.log('[MIGRACION] creando tabla proveedores...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS proveedores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          ruc TEXT NOT NULL,
          correo TEXT,
          telefono TEXT NOT NULL
        );
      `).run();
  }
  