export function up(db) {
  console.log('[MIGRACION] creando tabla dispositivos...');
  db.prepare(`
      CREATE TABLE dispositivos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        mac_address TEXT UNIQUE NOT NULL,
        ip_address TEXT,
        tipo_hardware TEXT NOT NULL CHECK(tipo_hardware IN ('pc','tablet','celular','impresora')),
        rol_funcional TEXT NOT NULL CHECK(rol_funcional IN ('caja','cocina','mozo')),
        ultima_conexion DATETIME,
        usuario_id INTEGER REFERENCES usuarios(id),
        activo BOOLEAN NOT NULL DEFAULT 1
      );
    `).run();
}
