export function up(db) {
  console.log('[MIGRACION] Creando tabla sede_local...');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS sede_local (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empresa_id INTEGER NOT NULL REFERENCES empresa_local(id) ON DELETE CASCADE,
      nombre TEXT NOT NULL,
      direccion TEXT,
      ciudad TEXT,
      distrito TEXT,
      telefono TEXT,
      serie_boleta TEXT,
      serie_factura TEXT,
      serie_ticket TEXT
    );
  `).run();
}
