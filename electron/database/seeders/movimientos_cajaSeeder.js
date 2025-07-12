export function seed(db) {
  console.log('[SEEDER] Insertando movimientos_caja...');

  const stmt = db.prepare(`
    INSERT INTO movimientos_caja (id, usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre, monto_inicial, monto_final, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  function toSQLiteDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const ahora = new Date();
  const ayer = new Date(ahora - 86400000);
  const semanaPasada = new Date(ahora - 7 * 86400000);

  const movimientos = [
    [1, 3, 'apertura', toSQLiteDatetime(ahora), null, 500.0, null, 'Apertura turno mañana'],

    [2, 3, 'apertura', toSQLiteDatetime(ayer), null, 500.0, null, 'Apertura turno mañana'],
    [3, 3, 'venta', toSQLiteDatetime(ayer), null, 0, 85.0, 'Pedido 1'],
    [4, 3, 'venta', toSQLiteDatetime(ayer), null, 0, 68.5, 'Pedido 2'],
    [5, 1, 'gasto', toSQLiteDatetime(ayer), null, 0, -120.0, 'Compra de insumos'],
    [6, 3, 'cierre', toSQLiteDatetime(ayer), toSQLiteDatetime(ayer), 500.0, 533.5, 'Cierre turno mañana'],

    [7, 1, 'apertura', toSQLiteDatetime(semanaPasada), null, 500.0, null, 'Apertura turno mañana'],
    [8, 1, 'venta', toSQLiteDatetime(semanaPasada), null, 0, 120.0, 'Pedido 9'],
    [9, 1, 'venta', toSQLiteDatetime(semanaPasada), null, 0, 88.0, 'Pedido 10'],
    [10, 1, 'gasto', toSQLiteDatetime(semanaPasada), null, 0, -200.0, 'Pago de servicios'],
    [11, 1, 'cierre', toSQLiteDatetime(semanaPasada), toSQLiteDatetime(semanaPasada), 500.0, 508.0, 'Cierre turno mañana']
  ];

  const insertMany = db.transaction((movimientos) => {
    for (const m of movimientos) stmt.run(m);
  });

  insertMany(movimientos);
  console.log(`[SEEDER] ${movimientos.length} movimientos de caja insertados`);
}
