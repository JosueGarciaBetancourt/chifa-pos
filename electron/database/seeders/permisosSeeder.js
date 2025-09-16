export function seed(db) {
  console.log('[SEEDER] Insertando permisos...');

  const stmt = db.prepare(`
    INSERT INTO permisos (id, modulo_id, accion_id, codigo)
    VALUES (?, ?, ?, ?)
  `);

  const permisos = [
    // ===============================
    // Caja
    // ===============================
    [1, 1, 1, 'caja.acceder'],
    [2, 1, 2, 'caja.ver'],
    [3, 1, 3, 'caja.crear'],
    [4, 1, 4, 'caja.actualizar'],
    [5, 1, 5, 'caja.eliminar'],

    // ===============================
    // Cocina
    // ===============================
    [6, 2, 1, 'cocina.acceder'],
    [7, 2, 2, 'cocina.ver'],
    [8, 2, 3, 'cocina.crear'],
    [9, 2, 4, 'cocina.actualizar'],
    [10, 2, 5, 'cocina.eliminar'],

    // ===============================
    // Pedidos
    // ===============================
    [11, 3, 1, 'pedidos.acceder'],
    [12, 3, 2, 'pedidos.ver'],
    [13, 3, 3, 'pedidos.crear'],
    [14, 3, 4, 'pedidos.actualizar'],
    [15, 3, 5, 'pedidos.eliminar'],

    // ===============================
    // Inventario
    // ===============================
    [16, 4, 1, 'inventario.acceder'],
    [17, 4, 2, 'inventario.ver'],
    [18, 4, 3, 'inventario.crear'],
    [19, 4, 4, 'inventario.actualizar'],
    [20, 4, 5, 'inventario.eliminar'],

    // ===============================
    // Delivery
    // ===============================
    [21, 5, 1, 'delivery.acceder'],
    [22, 5, 2, 'delivery.ver'],
    [23, 5, 3, 'delivery.crear'],
    [24, 5, 4, 'delivery.actualizar'],
    [25, 5, 5, 'delivery.eliminar'],

    // ===============================
    // Reportes
    // ===============================
    [26, 6, 1, 'reportes.acceder'],
    [27, 6, 2, 'reportes.ver'],
    [28, 6, 11, 'reportes.exportar'],
    [29, 6, 13, 'reportes.imprimir'],
    [30, 6, 14, 'reportes.notificar'],
  ];

  const insertMany = db.transaction((permisos) => {
    for (const p of permisos) stmt.run(p);
  });

  insertMany(permisos);
  console.log(`[SEEDER] ${permisos.length} permisos insertados`);
}
