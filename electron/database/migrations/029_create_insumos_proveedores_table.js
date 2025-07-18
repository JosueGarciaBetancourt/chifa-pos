export function up(db) {
  console.log('[MIGRACION] creando tabla insumos_proveedores...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS insumos_proveedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      insumo_id INTEGER NOT NULL REFERENCES insumos(id) ON DELETE CASCADE,
      proveedor_id INTEGER NOT NULL REFERENCES proveedores(id) ON DELETE CASCADE,
      observaciones TEXT,
      UNIQUE(insumo_id, proveedor_id)
    );
  `).run();
}
