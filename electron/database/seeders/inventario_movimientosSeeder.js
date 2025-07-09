export function seed(db) {
  console.log('[SEEDER] Insertando inventario_movimientos...');
  
  const stmt = db.prepare(`
    INSERT INTO inventario_movimientos (insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  // Función para formatear fecha/hora
  function toSQLiteDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const ahora = new Date();
  const ayer = new Date(ahora - 86400000);
  const semanaPasada = new Date(ahora - 7 * 86400000);
  
  const movimientos = [
    // Entradas
    [1, 'entrada', 20.0, toSQLiteDatetime(semanaPasada), 1, null],
    [2, 'entrada', 15.0, toSQLiteDatetime(semanaPasada), 1, null],
    [6, 'entrada', 5.0, toSQLiteDatetime(semanaPasada), 1, null],
    [7, 'entrada', 100.0, toSQLiteDatetime(semanaPasada), 1, null],
    [1, 'entrada', 10.0, toSQLiteDatetime(ayer), 1, null],
    [2, 'entrada', 8.0, toSQLiteDatetime(ayer), 1, null],
    
    // Salidas por pedidos
    [1, 'salida', 0.6, toSQLiteDatetime(ahora), 2, 1],
    [2, 'salida', 0.3, toSQLiteDatetime(ahora), 2, 1],
    [6, 'salida', 0.1, toSQLiteDatetime(ahora), 2, 1],
    [19, 'salida', 4, toSQLiteDatetime(ahora), 2, 1],
    
    [3, 'salida', 0.25, toSQLiteDatetime(ahora), 1, 2],
    [2, 'salida', 0.2, toSQLiteDatetime(ahora), 1, 2],
    [21, 'salida', 0.05, toSQLiteDatetime(ahora), 1, 2],
    
    // Ajustes
    [1, 'ajuste', -0.5, toSQLiteDatetime(semanaPasada), 4, null],
    [7, 'ajuste', 5.0, toSQLiteDatetime(ayer), 3, null]
  ];

  const insertMany = db.transaction((movimientos) => {
    for (const m of movimientos) stmt.run(m);
  });

  insertMany(movimientos);
  console.log('[SEEDER] 15 movimientos de inventario insertados');
}