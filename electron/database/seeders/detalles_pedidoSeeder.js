export function seed(db) {
  console.log('[SEEDER] insertando detalles de pedido iniciales...');

  const stmt = db.prepare(`
    INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
    VALUES (?, ?, ?, ?, ?)
  `);

  const detalles = [
    // Pedido 1: 2 productos
    [1, 1, 2, 12.50, 2 * 12.50],   // Producto 1, 2 unidades
    [1, 2, 1, 20.00, 1 * 20.00],   // Producto 2, 1 unidad

    // Pedido 2: 1 producto
    [2, 3, 3, 8.00, 3 * 8.00],     // Producto 3, 3 unidades

    // Pedido 3: 1 producto
    [3, 1, 1, 12.50, 12.50]        // Producto 1, 1 unidad
  ];

  const insertMany = db.transaction((detalles) => {
    for (const detalle of detalles) stmt.run(detalle);
  });

  insertMany(detalles);

  console.log('[SEEDER] detalles de pedido insertados correctamente.');
}
