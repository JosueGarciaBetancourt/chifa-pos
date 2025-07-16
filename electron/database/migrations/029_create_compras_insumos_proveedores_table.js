export function up(db) {
  console.log('[MIGRACION] creando tabla compras_insumos_proveedores...');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS compras_insumos_proveedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      insumo_id INTEGER NOT NULL REFERENCES insumos(id) ON DELETE CASCADE,
      proveedor_id INTEGER NOT NULL REFERENCES proveedores(id) ON DELETE CASCADE,
      cantidad INTEGER NOT NULL,
      costo_unitario REAL NOT NULL,
      fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL
    );
  `).run();
}
