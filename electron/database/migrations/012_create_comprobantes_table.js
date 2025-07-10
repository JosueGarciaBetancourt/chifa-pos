export function up(db) {
    console.log('[MIGRACION] creando tabla comprobantes...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS comprobantes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          pedido_id INTEGER NOT NULL UNIQUE REFERENCES pedidos(id),
          tipo TEXT NOT NULL CHECK(tipo IN ('ticket', 'boleta', 'factura')),
          serie TEXT NOT NULL,
          numero TEXT NOT NULL,
          fecha_hora_emision DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          xml_base64 TEXT,
          estado TEXT NOT NULL CHECK(estado IN ('emitido', 'anulado'))
        );
      `).run();
  }
  