export function seed(db) {
  console.log('[SEEDER] Insertando roles...');
  
  const stmt = db.prepare(`
    INSERT INTO roles (nombre)
    VALUES (?)
  `);

  const roles = [
    ['admin'],
    ['supervisor'],
    ['cajero'],
    ['cocinero'],
    ['mozo'],
  ];

  const insertMany = db.transaction((roles) => {
    for (const r of roles) stmt.run(r);
  });

  insertMany(roles);
  console.log(`[SEEDER] ${roles.length} roles insertados`);
}