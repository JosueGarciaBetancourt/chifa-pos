export function seed(db) {
  console.log('[SEEDER] Insertando roles...');

  const stmt = db.prepare(`
    INSERT INTO roles (id, nombre)
    VALUES (?, ?)
  `);

  const roles = [
    [1, 'admin'],
    [2, 'supervisor'],
    [3, 'cajero'],
    [4, 'cocinero'],
    [5, 'mozo'],
  ];

  const insertMany = db.transaction((roles) => {
    for (const r of roles) stmt.run(r);
  });

  insertMany(roles);
  console.log(`[SEEDER] ${roles.length} roles insertados`);
}
