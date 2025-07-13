export function seed(db) {
  console.log('[SEEDER] Insertando movimientos_caja...');

  const stmt = db.prepare(`
    INSERT INTO movimientos_caja (
      id, usuario_id, jornada_laboral_id, tipo, 
      fecha_hora_inicio, fecha_hora_cierre, 
      monto_inicial, monto_final, observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  function toSQLiteDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const movimientos = [
    // Jornada 3 (iniciada): usuario_id 4
    [1, 4, 3, 'apertura', '2024-07-03 09:00:00', null, 400.0, null, 'Apertura turno actual'],

    // Jornada 2 (finalizada): usuario_id 3
    [2, 3, 2, 'apertura', '2024-07-02 08:00:00', null, 500.0, null, 'Apertura turno mañana'],
    [3, 3, 2, 'venta', '2024-07-02 10:00:00', null, 0, 85.0, 'Pedido 1'],
    [4, 3, 2, 'venta', '2024-07-02 13:00:00', null, 0, 68.5, 'Pedido 2'],
    [5, 3, 2, 'cierre', '2024-07-02 18:00:00', '2024-07-02 18:00:00', 500.0, 653.5, 'Cierre turno mañana'],

    // Jornada 5 (finalizada): usuario_id 2
    [6, 2, 5, 'apertura', '2024-07-02 14:00:00', null, 400.0, null, 'Inicio de jornada tarde'],
    [7, 2, 5, 'venta', '2024-07-02 16:00:00', null, 0, 92.0, 'Pedido 21'],
    [8, 2, 5, 'gasto', '2024-07-02 17:00:00', null, 0, -30.0, 'Compra de agua'],
    [9, 2, 5, 'cierre', '2024-07-02 22:00:00', '2024-07-02 22:00:00', 400.0, 462.0, 'Fin de turno'],

    // Jornada 1 (finalizada): usuario_id 1
    [10, 1, 1, 'apertura', '2024-07-01 08:00:00', null, 600.0, null, 'Inicio jornada antigua'],
    [11, 1, 1, 'venta', '2024-07-01 10:00:00', null, 0, 120.0, 'Pedido 9'],
    [12, 1, 1, 'venta', '2024-07-01 12:30:00', null, 0, 88.0, 'Pedido 10'],
    [13, 1, 1, 'gasto', '2024-07-01 13:00:00', null, 0, -200.0, 'Pago de servicios'],
    [14, 1, 1, 'cierre', '2024-07-01 18:00:00', '2024-07-01 18:00:00', 600.0, 608.0, 'Fin de jornada']
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) {
      stmt.run(row);
    }
  });

  insertMany(movimientos);
  console.log(`[SEEDER] ${movimientos.length} movimientos de caja insertados vinculados a jornadas_laborales`);
}
