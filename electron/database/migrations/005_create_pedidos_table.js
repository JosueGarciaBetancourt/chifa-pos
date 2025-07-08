export function up(db) {
  console.log('[MIGRACIÓN] creando tabla pedidos...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      usuario_id INTEGER,
      mesa_id INTEGER,
      tipo TEXT NOT NULL,
      estado TEXT NOT NULL,
      fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
      direccion_entrega TEXT,
      total REAL NOT NULL,
      observaciones TEXT,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
      FOREIGN KEY (mesa_id) REFERENCES mesas(id)
    );
  `).run();
}
