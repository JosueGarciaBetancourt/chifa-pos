export function seed(db) {
  console.log('[SEEDER] Insertando roles_permisos...');

  const stmt = db.prepare(`
    INSERT INTO roles_permisos (id, rol_id, permiso_id)
    VALUES (?, ?, ?)
  `);

  const roles_permisos = [
    // ===============================
    // ADMIN → todos los permisos
    // ===============================
    ...Array.from({ length: 24 }, (_, i) => [i + 1, 1, i + 1]),

    // ===============================
    // SUPERVISOR → todos excepto eliminar
    // (es decir: no incluye los permisos con acción "eliminar")
    // ===============================
    [25, 2, 1],  // caja - ver
    [26, 2, 2],  // caja - crear
    [27, 2, 3],  // caja - actualizar

    [28, 2, 5],  // cocina - ver
    [29, 2, 6],  // cocina - crear
    [30, 2, 7],  // cocina - actualizar

    [31, 2, 9],  // pedidos - ver
    [32, 2, 10], // pedidos - crear
    [33, 2, 11], // pedidos - actualizar

    [34, 2, 13], // inventario - ver
    [35, 2, 14], // inventario - crear
    [36, 2, 15], // inventario - actualizar

    [37, 2, 17], // delivery - ver
    [38, 2, 18], // delivery - crear
    [39, 2, 19], // delivery - actualizar

    [40, 2, 21], // reportes - ver
    [41, 2, 22], // reportes - exportar
    [42, 2, 23], // reportes - imprimir
    [43, 2, 24], // reportes - notificar

    // ===============================
    // CAJERO → caja, pedidos, reportes (solo ver/exportar)
    // ===============================
    [44, 3, 1],  // caja - ver
    [45, 3, 2],  // caja - crear
    [46, 3, 3],  // caja - actualizar

    [47, 3, 9],  // pedidos - ver
    [48, 3, 10], // pedidos - crear

    [49, 3, 21], // reportes - ver
    [50, 3, 22], // reportes - exportar

    // ===============================
    // COCINERO → cocina, pedidos
    // ===============================
    [51, 4, 5],  // cocina - ver
    [52, 4, 6],  // cocina - crear
    [53, 4, 7],  // cocina - actualizar

    [54, 4, 9],  // pedidos - ver
    [55, 4, 11], // pedidos - actualizar

    // ===============================
    // MOZO → pedidos, delivery
    // ===============================
    [56, 5, 9],  // pedidos - ver
    [57, 5, 10], // pedidos - crear
    [58, 5, 11], // pedidos - actualizar
    [59, 5, 12], // pedidos - eliminar

    // Delivery
    [60, 5, 17], // delivery - ver
    [61, 5, 18], // delivery - crear
    [62, 5, 19], // delivery - actualizar
    [63, 5, 20] // delivery - eliminar
  ];

  const insertMany = db.transaction((roles_permisos) => {
    for (const rp of roles_permisos) {
      stmt.run(rp);
    }
  });

  insertMany(roles_permisos);
  console.log(`[SEEDER] ${roles_permisos.length} roles_permisos insertados`);
}
