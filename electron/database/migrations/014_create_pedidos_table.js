export function up(db) {
  console.log('[MIGRACION] creando tabla pedidos...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER REFERENCES clientes(id),
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
      mesa_id INTEGER REFERENCES mesas(id),
      tipo TEXT NOT NULL CHECK(tipo IN ('consumo_local', 'para_llevar', 'delivery')),
      estado TEXT NOT NULL CHECK(estado IN ('pendiente', 'cocina', 'listo', 'entregado',  'pagado', 'cancelado')),
      fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      direccion_entrega TEXT,
      total REAL NOT NULL DEFAULT 0,
      observaciones TEXT
    );
  `).run();
}
