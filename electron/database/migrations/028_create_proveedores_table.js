export function up(db) {
    console.log('[MIGRACION] creando tabla proveedores...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS proveedores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          ruc TEXT,
          correo TEXT,
          telefono TEXT,
          direccion TEXT,
          activo BOOLEAN NOT NULL DEFAULT 1
        );
      `).run();
  }
  