export function seed(db) {
  console.log('[SEEDER] Insertando estados_detalles_pedidos...');

  const stmt = db.prepare(`
    INSERT INTO estados_detalles_pedidos (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const estados_detalles_pedidos = [
    [1, 'pendiente', 'El producto aún no ha comenzado a ser atendido o preparado'],
    [2, 'en_preparacion', 'El producto está en proceso en cocina'],
    [3, 'listo', 'El producto está listo para ser entregado o servido'],
    [4, 'servido', 'Fue entregado al cliente (en mesa o empaquetado para delivery/llevar)'],
    [5, 'cancelado', 'Se anuló la preparación o entrega de este producto'],
    [6, 'reemplazado', 'El producto fue reemplazado por otro por solicitud del cliente o error']
  ];

  const insertMany = db.transaction((estados_detalles_pedidos) => {
    for (const edp of estados_detalles_pedidos) stmt.run(edp);
  });

  insertMany(estados_detalles_pedidos);
  console.log(`[SEEDER] ${estados_detalles_pedidos.length} estados_detalles_pedidos insertados`);
}
