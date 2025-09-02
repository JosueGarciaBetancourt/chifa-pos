export function up(db) {
  console.log('[MIGRACION] creando tabla compras_insumos_proveedores...');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS compras_insumos_proveedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo_gasto_id INTEGER NOT NULL REFERENCES tipos_gastos(id),
      insumo_proveedor_id INTEGER NOT NULL REFERENCES insumos_proveedores(id) ON DELETE CASCADE,
      cantidad INTEGER NOT NULL,
      costo_unitario_real REAL NOT NULL,
      observaciones TEXT,
      fecha DATETIME NOT NULL,
      usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL
    );
  `).run();
}
