export function seed(db) {
  console.log('[SEEDER] Insertando logs_sistema...');

  const stmt = db.prepare(`
    INSERT INTO logs_sistema (
      id,
      usuario_id,
      accion,
      modulo,
      descripcion,
      fecha_hora,
      dispositivo_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const logs_sistema = [
    [1, 1, 'login', 'usuarios', 'Inicio de sesión del administrador.', '2025-07-11 08:00:00', 1],
    [2, 2, 'crear', 'pedidos', 'El mozo creó el pedido #1005.', '2025-07-11 08:10:00', 3],
    [3, 3, 'actualizar', 'inventario', 'Reposición de stock para "arroz jazmín" (de 2kg a 5kg).', '2025-07-11 08:20:00', 2],
    [4, 4, 'eliminar', 'clientes', 'Cliente con ID 55 eliminado por error.', '2025-07-11 09:00:00', 1],
    [5, 2, 'crear', 'reservas', 'Reserva realizada para mesa 4 a las 20:00h.', '2025-07-11 09:15:00', 3]
  ];

  const insertMany = db.transaction((logs) => {
    for (const log of logs) stmt.run(log);
  });

  insertMany(logs_sistema);
  console.log(`[SEEDER] ${logs_sistema.length} logs_sistema insertados`);
}
