export function seed(db) {
  console.log('[SEEDER] Insertando permisos...');
  
  const stmt = db.prepare(`
    INSERT INTO permisos (nombre)
    VALUES (?)
  `);

  // Por ahora permisos básicos por módulos
  const permisos = [
    ['all'],
    ['caja'],
    ['cocina'],
    ['pedidos'],
    ['inventario'],
    ['delivery'],
    ['reportes'],
  ];

  const insertMany = db.transaction((permisos) => {
    for (const r of permisos) stmt.run(r);
  });

  insertMany(permisos);
  console.log(`[SEEDER] ${permisos.length} permisos insertados`);
}