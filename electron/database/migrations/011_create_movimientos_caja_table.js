export function up(db) {
    console.log('[MIGRACIÓN] creando tabla movimientos_caja...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS movimientos_caja (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
          tipo TEXT NOT NULL CHECK(tipo IN ('apertura', 'cierre', 'venta', 'gasto')),
          fecha_hora_inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          fecha_hora_cierre DATETIME,
          monto_inicial REAL NOT NULL,
          monto_final REAL,
          observaciones TEXT
        );
      `).run();
  }
  