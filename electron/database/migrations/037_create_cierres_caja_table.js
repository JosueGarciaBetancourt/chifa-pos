export function up(db) {
  console.log('[MIGRACION] creando tabla cierres_caja...');
  db.prepare(`
      CREATE TABLE IF NOT EXISTS cierres_caja (
        movimiento_id INTEGER PRIMARY KEY REFERENCES movimientos_caja(id), -- referencia un movimiento del tipo cierre previamente creado
        movimiento_apertura_id INTEGER UNIQUE NOT NULL REFERENCES movimientos_caja(id), -- referencia un movimiento del tipo apertura que aún no cierra
        monto_final_manual REAL NOT NULL DEFAULT 0,
        monto_final_calculado REAL DEFAULT NULL,
        diferencia REAL DEFAULT NULL
      );
    `).run();
}
