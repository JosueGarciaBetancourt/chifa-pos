export function up(db) {
  console.log('[MIGRACION] creando tabla pedidos...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL DEFAULT 1 REFERENCES clientes(id),
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
      mesa_id INTEGER REFERENCES mesas(id),
      tipo_id INTEGER NOT NULL REFERENCES tipos_pedidos(id) ON DELETE CASCADE,
      estado_id INTEGER NOT NULL REFERENCES estados_pedidos(id) ON DELETE CASCADE,
      fecha_hora DATETIME NOT NULL,
      direccion_entrega TEXT,
      subTotal REAL NOT NULL DEFAULT 0, -- sin IGV
      igv REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0, -- con IGV
      observaciones_generales TEXT,
      cotizacion_id INTEGER REFERENCES cotizaciones(id),
      sede_id INTEGER NOT NULL DEFAULT 1 REFERENCES sede_local(id) ON DELETE CASCADE
    );
  `).run();
}