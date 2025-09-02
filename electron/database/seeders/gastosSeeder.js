export function seed(db) {
  console.log('[SEEDER] Insertando gastos...');

  const stmt = db.prepare(`
    INSERT INTO gastos (tipo_gasto_id, usuario_id, proveedor_id, monto, metodo_pago_id, fecha_hora, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const gastos = [
    // Servicios
    [2, 1, null, 250.00, 1, '2025-08-01 10:00:00', 'Pago de recibo de luz'],
    [2, 1, null, 120.00, 2, '2025-08-03 11:30:00', 'Pago de internet por tarjeta'],

    // Mantenimiento
    [3, 1, null, 350.00, 1, '2025-08-05 09:45:00', 'Reparación de horno'],

    // Transporte
    [4, 2, null, 50.00, 1, '2025-08-07 15:20:00', 'Taxi para reparto'],

    // Compras de insumos (relación con proveedor_id = 1)
    [1, 2, 1, 480.00, 3, '2025-08-08 14:10:00', 'Compra de pollo y verduras'],

    // Otros
    [5, 1, null, 60.00, 1, '2025-08-10 08:50:00', 'Compra de útiles de limpieza']
  ];

  const insertMany = db.transaction((gastos) => {
    for (const g of gastos) stmt.run(g);
  });

  insertMany(gastos);
  console.log(`[SEEDER] ${gastos.length} gastos insertados`);
}
