export function up(db) {
    console.log('[MIGRACION] creando tabla cotizaciones...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS cotizaciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cliente_id INTEGER NOT NULL REFERENCES clientes(id),
          usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
          fecha_hora DATETIME NOT NULL,
          validez_dias INTEGER NOT NULL,
          estado TEXT NOT NULL CHECK(estado IN ('activa', 'vencida', 'convertida')),
          total REAL NOT NULL
        );
      `).run();
  }
  