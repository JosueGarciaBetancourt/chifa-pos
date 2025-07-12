export function seed(db) {
  console.log('[SEEDER] Insertando estados_pedidos...');

  const stmt = db.prepare(`
    INSERT INTO estados_pedidos (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const estados_pedidos = [
    [1, 'pendiente', 'Pedido recién creado. Aún no comienza la preparación en cocina'],
    [2, 'en_cocina', 'Se han iniciado las preparaciones de uno o más platos'],
    [3, 'listo', 'Todos los platos están marcados como listos. El pedido puede entregarse'], // Cobra sentido en pedidos para llevar
    [4, 'entregado', 'Pedido completo fue entregado al cliente'],
    [5, 'pagado', 'Pedido fue entregado y se recibió el pago'],
    [6, 'cancelado', 'Pedido completo fue cancelado antes de finalizar'], // Se cancelan todos los platos del pedido
  ];

  const insertMany = db.transaction((estados_pedidos) => {
    for (const ep of estados_pedidos) stmt.run(ep);
  });

  insertMany(estados_pedidos);
  console.log(`[SEEDER] ${estados_pedidos.length} estados_pedidos insertados`);
}
