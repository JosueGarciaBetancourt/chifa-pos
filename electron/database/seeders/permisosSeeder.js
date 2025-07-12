export function seed(db) {
  console.log('[SEEDER] Insertando permisos...');
  
  const stmt = db.prepare(`
    INSERT INTO permisos (id, nombre)
    VALUES (?, ?)
  `);

  // Por ahora permisos básicos por módulos
  const permisos = [
    [1, 'all'],
    [2, 'caja'],
    [3, 'cocina'],
    [4, 'pedidos'],
    [5, 'inventario'],
    [6, 'delivery'],
    [7, 'reportes'],
  ];

  const insertMany = db.transaction((permisos) => {
    for (const r of permisos) stmt.run(r);
  });

  insertMany(permisos);
  console.log(`[SEEDER] ${permisos.length} permisos insertados`);
}
