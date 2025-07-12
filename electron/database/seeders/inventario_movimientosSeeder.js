export function seed(db) {
  console.log('[SEEDER] Insertando inventario_movimientos...');
  
  const stmt = db.prepare(`
    INSERT INTO inventario_movimientos (id, insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  function toSQLiteDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const ahora = new Date();
  const ayer = new Date(ahora - 86400000);
  const semanaPasada = new Date(ahora - 7 * 86400000);
  
  const movimientos = [
    [1, 1, 'entrada', 20.0, toSQLiteDatetime(semanaPasada), 1, null],
    [2, 2, 'entrada', 15.0, toSQLiteDatetime(semanaPasada), 1, null],
    [3, 6, 'entrada', 5.0, toSQLiteDatetime(semanaPasada), 1, null],
    [4, 7, 'entrada', 100.0, toSQLiteDatetime(semanaPasada), 1, null],
    [5, 1, 'entrada', 10.0, toSQLiteDatetime(ayer), 1, null],
    [6, 2, 'entrada', 8.0, toSQLiteDatetime(ayer), 1, null],

    [7, 1, 'salida', 0.6, toSQLiteDatetime(ahora), 2, 1],
    [8, 2, 'salida', 0.3, toSQLiteDatetime(ahora), 2, 1],
    [9, 6, 'salida', 0.1, toSQLiteDatetime(ahora), 2, 1],
    [10, 19, 'salida', 4, toSQLiteDatetime(ahora), 2, 1],

    [11, 3, 'salida', 0.25, toSQLiteDatetime(ahora), 1, 2],
    [12, 2, 'salida', 0.2, toSQLiteDatetime(ahora), 1, 2],
    [13, 21, 'salida', 0.05, toSQLiteDatetime(ahora), 1, 2],

    [14, 1, 'ajuste', -0.5, toSQLiteDatetime(semanaPasada), 4, null],
    [15, 7, 'ajuste', 5.0, toSQLiteDatetime(ayer), 3, null]
  ];

  const insertMany = db.transaction((movimientos) => {
    for (const m of movimientos) stmt.run(m);
  });

  insertMany(movimientos);
  console.log(`[SEEDER] ${movimientos.length} movimientos de inventario insertados`);
}
