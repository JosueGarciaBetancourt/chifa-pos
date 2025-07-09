export function seed(db) {
  console.log('[SEEDER] Insertando movimientos_caja...');
  
  const stmt = db.prepare(`
    INSERT INTO movimientos_caja (usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre, monto_inicial, monto_final, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  function toSQLiteDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const ahora = new Date();
  const ayer = new Date(ahora - 86400000);
  const semanaPasada = new Date(ahora - 7 * 86400000);
  
  const movimientos = [
    // Apertura y cierre de hoy
    [3, 'apertura', toSQLiteDatetime(ahora), null, 500.0, null, 'Apertura turno mañana'],
    
    // Movimientos de ayer
    [3, 'apertura', toSQLiteDatetime(ayer), null, 500.0, null, 'Apertura turno mañana'],
    [3, 'venta', toSQLiteDatetime(ayer), null, 0, 85.0, 'Pedido 1'],          // Añadido monto_inicial=0
    [3, 'venta', toSQLiteDatetime(ayer), null, 0, 68.5, 'Pedido 2'],         // Añadido monto_inicial=0
    [1, 'gasto', toSQLiteDatetime(ayer), null, 0, -120.0, 'Compra de insumos'], // Añadido monto_inicial=0
    [3, 'cierre', toSQLiteDatetime(ayer), toSQLiteDatetime(ayer), 500.0, 533.5, 'Cierre turno mañana'],
    
    // Movimientos de la semana pasada
    [1, 'apertura', toSQLiteDatetime(semanaPasada), null, 500.0, null, 'Apertura turno mañana'],
    [1, 'venta', toSQLiteDatetime(semanaPasada), null, 0, 120.0, 'Pedido 9'],   // Añadido monto_inicial=0
    [1, 'venta', toSQLiteDatetime(semanaPasada), null, 0, 88.0, 'Pedido 10'],    // Añadido monto_inicial=0
    [1, 'gasto', toSQLiteDatetime(semanaPasada), null, 0, -200.0, 'Pago de servicios'], // Añadido monto_inicial=0
    [1, 'cierre', toSQLiteDatetime(semanaPasada), toSQLiteDatetime(semanaPasada), 500.0, 508.0, 'Cierre turno mañana']
  ];

  const insertMany = db.transaction((movimientos) => {
    for (const m of movimientos) stmt.run(m);
  });

  insertMany(movimientos);
  console.log('[SEEDER] 10 movimientos de caja insertados');
}