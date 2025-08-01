export function up(db) {
  console.log('[MIGRACION] Creando tabla empresa_local...');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS empresa_local (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ruc TEXT NOT NULL,
      razon_social TEXT NOT NULL,
      nombre_comercial TEXT,
      direccion TEXT NOT NULL,
      telefono TEXT,
      email TEXT,
      logo_base64 TEXT,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}
