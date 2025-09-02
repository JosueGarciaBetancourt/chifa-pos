export function seed(db) {
  console.log('[SEEDER] Insertando movimientos_caja...');

  const stmt = db.prepare(`
    INSERT INTO movimientos_caja (
      id, caja_id, usuario_id, jornada_laboral_id, tipo,
      gasto_id, comprobante_id,
      fecha_hora_inicio, fecha_hora_cierre,
      monto_inicial, monto_final, observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const movimientos = [
    // Jornada 3 (iniciada, aún abierta): usuario_id 4
    [1, 1, 4, 3, 'apertura', null, null, '2024-07-03 09:00:00', null, 400.0, null, 'Apertura turno actual'],

    // Jornada 2 (finalizada): usuario_id 3
    [2, 1, 3, 2, 'apertura', null, null, '2024-07-02 08:00:00', '2024-07-02 18:00:00', 500.0, 653.5, 'Apertura + cierre turno mañana'],
    [3, 1, 3, 2, 'ingreso', null, 1, '2024-07-02 10:00:00', null, 0, 85.0, 'Pedido 1'],
    [4, 1, 3, 2, 'ingreso', null, 2, '2024-07-02 13:00:00', null, 0, 68.5, 'Pedido 2'],

    // Jornada 5 (finalizada): usuario_id 2
    [5, 1, 2, 5, 'apertura', null, null, '2024-07-02 14:00:00', '2024-07-02 22:00:00', 400.0, 462.0, 'Apertura + cierre jornada tarde'],
    [6, 1, 2, 5, 'ingreso', null, 3, '2024-07-02 16:00:00', null, 0, 92.0, 'Pedido 21'],
    [7, 1, 2, 5, 'egreso', 1, null, '2024-07-02 17:00:00', null, 0, -30.0, 'Compra de agua'], // vinculado a gasto_id 1

    // Jornada 1 (finalizada): usuario_id 1
    [8, 1, 1, 1, 'apertura', null, null, '2024-07-01 08:00:00', '2024-07-01 18:00:00', 600.0, 608.0, 'Apertura + cierre jornada antigua'],
    [9, 1, 1, 1, 'ingreso', null, 4, '2024-07-01 10:00:00', null, 0, 120.0, 'Pedido 9'],
    [10, 1, 1, 1, 'ingreso', null, 5, '2024-07-01 12:30:00', null, 0, 88.0, 'Pedido 10'],
    [11, 1, 1, 1, 'egreso', 2, null, '2024-07-01 13:00:00', null, 0, -200.0, 'Pago de servicios'] // vinculado a gasto_id 2
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) {
      stmt.run(row);
    }
  });

  insertMany(movimientos);
  console.log(`[SEEDER] ${movimientos.length} movimientos de caja insertados vinculados a jornadas_laborales`);
}
