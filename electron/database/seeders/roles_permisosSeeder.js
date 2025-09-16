export function seed(db) {
  console.log('[SEEDER] Insertando roles_permisos...');

  const stmt = db.prepare(`
    INSERT INTO roles_permisos (id, rol_id, permiso_id)
    VALUES (?, ?, ?)
  `);

  const roles_permisos = [
    // ===============================
    // ADMIN → todos los permisos (1–30)
    // ===============================
    ...Array.from({ length: 30 }, (_, i) => [i + 1, 1, i + 1]),

    // ===============================
    // SUPERVISOR → todos excepto eliminar
    // ===============================
    // Caja (1–5) → sin eliminar (5)
    [31, 2, 1], [32, 2, 2], [33, 2, 3], [34, 2, 4],
    // Cocina (6–10) → sin eliminar (10)
    [35, 2, 6], [36, 2, 7], [37, 2, 8], [38, 2, 9],
    // Pedidos (11–15) → sin eliminar (15)
    [39, 2, 11], [40, 2, 12], [41, 2, 13], [42, 2, 14],
    // Inventario (16–20) → sin eliminar (20)
    [43, 2, 16], [44, 2, 17], [45, 2, 18], [46, 2, 19],
    // Delivery (21–25) → sin eliminar (25)
    [47, 2, 21], [48, 2, 22], [49, 2, 23], [50, 2, 24],
    // Reportes (26–30) → tiene 5 permisos, ninguno es "eliminar"
    [51, 2, 26], [52, 2, 27], [53, 2, 28], [54, 2, 29], [55, 2, 30],

    // ===============================
    // CAJERO → caja (ver), pedidos (ver/crear), reportes (ver/exportar)
    // ===============================
    [56, 3, 2],   // caja - ver
    [57, 3, 12],  // pedidos - ver
    [58, 3, 13],  // pedidos - crear
    [59, 3, 27],  // reportes - ver
    [60, 3, 28],  // reportes - exportar

    // ===============================
    // COCINERO → cocina, pedidos, inventario (ver)
    // ===============================
    [61, 4, 7],   // cocina - ver
    [62, 4, 8],   // cocina - crear
    [63, 4, 9],   // cocina - actualizar
    [64, 4, 12],  // pedidos - ver
    [65, 4, 14],  // pedidos - actualizar
    [66, 4, 17],  // inventario - ver

    // ===============================
    // MOZO → pedidos (ver/crear/actualizar), delivery (ver/crear/actualizar)
    // ===============================
    [67, 5, 12],  // pedidos - ver
    [68, 5, 13],  // pedidos - crear
    [69, 5, 14],  // pedidos - actualizar
    [70, 5, 22],  // delivery - ver
    [71, 5, 23],  // delivery - crear
    [72, 5, 24]   // delivery - actualizar
  ];

  const insertMany = db.transaction((roles_permisos) => {
    for (const rp of roles_permisos) {
      stmt.run(rp);
    }
  });

  insertMany(roles_permisos);
  console.log(`[SEEDER] ${roles_permisos.length} roles_permisos insertados`);
}
