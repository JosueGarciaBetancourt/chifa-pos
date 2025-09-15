export function up(db) {
    console.log('[MIGRACION] creando tabla comprobantes_venta...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS comprobantes_venta (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
          tipo_id INTEGER NOT NULL REFERENCES tipos_comprobantes(id) ON DELETE CASCADE,
          serie TEXT NOT NULL,
          numero TEXT NOT NULL,
          subTotal REAL NOT NULL DEFAULT 0, -- sin IGV
          igv REAL NOT NULL DEFAULT 0,
          total REAL NOT NULL DEFAULT 0, -- con IGV
          fecha_hora_emision DATETIME NOT NULL,
          observaciones TEXT,
          xml_base64 TEXT,
          metodo_pago_id INTEGER NOT NULL REFERENCES metodos_pago(id) ON DELETE CASCADE,
          estado_id INTEGER NOT NULL REFERENCES estados_comprobantes(id) ON DELETE CASCADE,
          sede_id INTEGER NOT NULL REFERENCES sede_local(id) ON DELETE CASCADE
        );
      `).run();
  }
  