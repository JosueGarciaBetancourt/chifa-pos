export function up(db) {
  console.log('[MIGRACION] creando tabla aperturas_caja...');
  db.prepare(`
      CREATE TABLE IF NOT EXISTS aperturas_caja (
        movimiento_id INTEGER PRIMARY KEY REFERENCES movimientos_caja(id), -- referencia un movimiento del tipo apertura previamente creado
        monto_inicial REAL NOT NULL DEFAULT 0
      );
    `).run();
}
