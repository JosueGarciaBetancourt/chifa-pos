export function up(db) {
  console.log('[MIGRACION] creando tabla movimientos_caja...');
  db.prepare(`
      CREATE TABLE IF NOT EXISTS movimientos_caja (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        caja_id INTEGER NOT NULL REFERENCES cajas(id),
        tipo TEXT NOT NULL CHECK(tipo IN ('apertura', 'ingreso', 'egreso', 'cierre')),
        usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
        jornada_laboral_id INTEGER NOT NULL REFERENCES jornadas_laborales(id),
        fecha_hora DATETIME NOT NULL,
        observaciones TEXT
      );
    `).run();
}
