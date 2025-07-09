export function up(db) {
    console.log('[MIGRACIÓN] creando tabla inventario_movimientos...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS inventario_movimientos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          insumo_id INTEGER NOT NULL REFERENCES insumos(id),
          tipo TEXT NOT NULL CHECK(tipo IN ('entrada', 'salida', 'ajuste')),
          cantidad REAL NOT NULL,
          fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
          pedido_id INTEGER REFERENCES pedidos(id)
        );
      `).run();
  }
  