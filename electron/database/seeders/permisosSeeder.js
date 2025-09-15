export function seed(db) {
  console.log('[SEEDER] Insertando permisos...');

  const stmt = db.prepare(`
    INSERT INTO permisos (id, modulo_id, accion_id)
    VALUES (?, ?, ?)
  `);

  // Permisos básicos (ejemplo: ver/crear/actualizar/eliminar en cada módulo)
  const permisos = [
    // Caja
    [1, 1, 2], // caja - ver
    [2, 1, 3], // caja - crear
    [3, 1, 4], // caja - actualizar
    [4, 1, 5], // caja - eliminar

    // Cocina
    [5, 2, 2], // cocina - ver
    [6, 2, 3], // cocina - crear
    [7, 2, 4], // cocina - actualizar
    [8, 2, 5], // cocina - eliminar

    // Pedidos
    [9, 3, 2],  // pedidos - ver
    [10, 3, 3], // pedidos - crear
    [11, 3, 4], // pedidos - actualizar
    [12, 3, 5], // pedidos - eliminar

    // Inventario
    [13, 4, 2],  // inventario - ver
    [14, 4, 3],  // inventario - crear
    [15, 4, 4],  // inventario - actualizar
    [16, 4, 5],  // inventario - eliminar

    // Delivery
    [17, 5, 2],  // delivery - ver
    [18, 5, 3],  // delivery - crear
    [19, 5, 4],  // delivery - actualizar
    [20, 5, 5],  // delivery - eliminar

    // Reportes (solo ver, exportar, imprimir, notificar)
    [21, 6, 2],   // reportes - ver
    [22, 6, 11],  // reportes - exportar
    [23, 6, 13],  // reportes - imprimir
    [24, 6, 14],  // reportes - notificar
  ];

  const insertMany = db.transaction((permisos) => {
    for (const p of permisos) stmt.run(p);
  });

  insertMany(permisos);
  console.log(`[SEEDER] ${permisos.length} permisos insertados`);
}
