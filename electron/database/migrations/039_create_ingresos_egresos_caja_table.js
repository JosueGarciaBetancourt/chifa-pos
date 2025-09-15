export function up(db) {
  console.log('[MIGRACION] creando tabla ingresos_egresos_caja...');
  db.prepare(`
      CREATE TABLE IF NOT EXISTS ingresos_egresos_caja (
        movimiento_id INTEGER PRIMARY KEY REFERENCES movimientos_caja(id), -- referencia un movimiento del tipo ingreso/egreso previamente creado
        movimiento_apertura_id INTEGER REFERENCES movimientos_caja(id), -- referencia un movimiento del tipo apertura que aún no cierra
        comprobante_id INTEGER REFERENCES comprobantes_venta(id), -- ingreso
        gasto_id INTEGER REFERENCES gastos(id), -- egreso
        monto REAL NOT NULL DEFAULT 0
      );
    `).run();
}
