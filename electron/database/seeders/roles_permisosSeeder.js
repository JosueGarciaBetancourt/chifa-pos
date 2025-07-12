export function seed(db) {
  console.log('[SEEDER] Insertando roles_permisos...');

  const stmt = db.prepare(`
    INSERT INTO roles_permisos (id, rol_id, permiso_id)
    VALUES (?, ?, ?)
  `);

  const roles_permisos = [
    // admin → solo permiso "all"
    [1, 1, 1],

    // supervisor → todos menos "all"
    [2, 2, 2],
    [3, 2, 3],
    [4, 2, 4],
    [5, 2, 5],
    [6, 2, 6],
    [7, 2, 7],

    // cajero → caja, pedidos, reportes
    [8, 3, 2],
    [9, 3, 4],
    [10, 3, 7],

    // cocinero → cocina, pedidos
    [11, 4, 3],
    [12, 4, 4],

    // mozo → pedidos, delivery
    [13, 5, 4],
    [14, 5, 6]
  ];

  const insertMany = db.transaction((items) => {
    for (const item of items) {
      stmt.run(item);
    }
  });

  insertMany(roles_permisos);
  console.log(`[SEEDER] ${roles_permisos.length} roles_permisos insertados`);
}
