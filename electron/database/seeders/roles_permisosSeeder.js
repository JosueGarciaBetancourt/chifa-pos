export function seed(db) {
  console.log('[SEEDER] Insertando roles_permisos...');

  const stmt = db.prepare(`
    INSERT INTO roles_permisos (rol_id, permiso_id)
    VALUES (?, ?)
  `);

  const roles_permisos = [
    // admin → solo permiso "all"
    [1, 1],

    // supervisor → todos menos "all"
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7],

    // cajero → caja, pedidos, reportes
    [3, 2], [3, 4], [3, 7],

    // cocinero → cocina, pedidos
    [4, 3], [4, 4],

    // mozo → pedidos, delivery
    [5, 4], [5, 6],
  ];

  const insertMany = db.transaction((roles_permisos) => {
    for (const [rol_id, permiso_id] of roles_permisos) {
      stmt.run(rol_id, permiso_id);
    }
  });

  insertMany(roles_permisos);
  console.log(`[SEEDER] ${roles_permisos.length} roles_permisos insertados`);
}
