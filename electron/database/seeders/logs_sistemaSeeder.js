export function seed(db) {
  console.log('[SEEDER] Insertando logs_sistema...');

  const stmt = db.prepare(`
    INSERT INTO logs_sistema (
      id,
      usuario_id,
      accion_id,
      modulo_id,
      descripcion,
      dispositivo_id,
      fecha_hora
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const logs_sistema = [
    [1, 1, 1, 1, 'Inicio de sesión del administrador en caja.', 1, '2025-07-11 08:00:00'], 
    [2, 2, 3, 3, 'El mozo creó el pedido #1005.', 3, '2025-07-11 08:10:00'], 
    [3, 3, 4, 4, 'Reposición de stock para "arroz jazmín" (de 2kg a 5kg).', 2, '2025-07-11 08:20:00'], 
    [4, 4, 5, 4, 'Producto con ID 55 eliminado del inventario.', 1, '2025-07-11 09:00:00'], 
    [5, 2, 3, 5, 'Delivery creado para pedido #1005, dirección: Av. Siempre Viva 742.', 3, '2025-07-11 09:15:00']
  ];

  const insertMany = db.transaction((logs) => {
    for (const log of logs) stmt.run(log);
  });

  insertMany(logs_sistema);
  console.log(`[SEEDER] ${logs_sistema.length} logs_sistema insertados`);
}
