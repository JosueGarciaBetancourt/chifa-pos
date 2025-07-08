export function seed(db) {
  console.log('[SEEDER] insertando pedidos iniciales...');

  const stmt = db.prepare(`
    INSERT INTO pedidos (cliente_id, usuario_id, mesa_id, tipo, estado, direccion_entrega, total, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const pedidos = [
    // Pedido en salón
    [1, 1, 1, 'local', 'pendiente', null, 45.50, 'Sin observaciones'],
    // Pedido para delivery
    [2, 2, null, 'delivery', 'entregado', 'Av. Primavera 123', 75.00, 'Entregar sin contacto'],
    // Otro pedido en salón
    [3, 1, 2, 'local', 'en preparación', null, 60.00, 'Agregar cubiertos extra']
  ];

  const insertMany = db.transaction((pedidos) => {
    for (const pedido of pedidos) stmt.run(pedido);
  });

  insertMany(pedidos);

  console.log('[SEEDER] pedidos insertados correctamente.');
}
