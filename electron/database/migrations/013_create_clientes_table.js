export function up(db) {
  console.log('[MIGRACION] creando tabla clientes...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dni TEXT UNIQUE,
      digitoVerificador INTEGER,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      direccion TEXT,
      telefono TEXT,
      verificado_reniec BOOLEAN NOT NULL DEFAULT 0,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}
