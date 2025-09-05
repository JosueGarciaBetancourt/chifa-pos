export function seed(db) {
  console.log('[SEEDER] Insertando ingresos_egresos_caja...');

  const stmt = db.prepare(`
    INSERT INTO ingresos_egresos_caja (
      movimiento_id, movimiento_apertura_id, comprobante_id, gasto_id, monto
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const ingresosEgresos = [
    // Todos los ingresos/egresos de hoy están vinculados a apertura_id = 1
    [2, 1, 1, null, 50.0],   // movimiento_id 2 (Pedido desayuno)
    [3, 1, 2, null, 120.0],  // movimiento_id 3 (Pedido almuerzo)
    [4, 1, null, 1, 40.0],   // movimiento_id 4 (Compra insumos)
    [5, 1, 3, null, 75.0],   // movimiento_id 5 (Pedido tarde)
    [6, 1, 4, null, 30.0],   // movimiento_id 6 (Pedido café)
    [7, 1, 5, null, 60.0]    // movimiento_id 7 (Último movimiento registrado)
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) {
      stmt.run(row);
    }
  });

  insertMany(ingresosEgresos);
  console.log(`[SEEDER] ${ingresosEgresos.length} ingresos/egresos insertados`);
}
