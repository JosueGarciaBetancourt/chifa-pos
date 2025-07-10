export function up(db) {
  console.log('[MIGRACION] creando tabla detalles_pedido...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS detalles_pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
      producto_id INTEGER NOT NULL REFERENCES productos(id),
      cantidad INTEGER NOT NULL,
      precio_unitario REAL NOT NULL,
      subtotal REAL GENERATED ALWAYS AS (cantidad * precio_unitario) VIRTUAL
    );
  `).run();
}
