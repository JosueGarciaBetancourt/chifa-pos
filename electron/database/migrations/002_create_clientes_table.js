export function up(db) { 
  console.log('[MIGRACIÓN] creando tabla clientes...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dni TEXT UNIQUE,
      nombre TEXT,
      apellido TEXT,
      direccion TEXT,
      telefono TEXT,
      verificado_reniec BOOLEAN NOT NULL
    );
  `).run();
}
