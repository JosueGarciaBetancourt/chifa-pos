export function seed(db) {
  console.log('[SEEDER] Insertando mesas...');
  
  const stmt = db.prepare(`
    INSERT INTO mesas (numero, capacidad, estado)
    VALUES (?, ?, ?)
  `);

  const mesas = [
    ['M1', 4, 'libre'],
    ['M2', 6, 'libre'],
    ['M3', 8, 'inactiva'],
    ['M4', 2, 'libre'],
    ['M5', 10, 'libre'],
    ['M6', 4, 'ocupada'],
    ['M7', 6, 'reservada'],
    ['M8', 4, 'libre'],
    ['M9', 6, 'ocupada'],
    ['M10', 8, 'libre'],
    ['M11', 4, 'reservada'],
    ['M12', 6, 'libre'],
    ['M13', 4, 'ocupada'],
    ['M14', 10, 'libre'],
    ['M15', 8, 'inactiva']
  ];

  const insertMany = db.transaction((mesas) => {
    for (const m of mesas) stmt.run(m);
  });

  insertMany(mesas);
  console.log('[SEEDER] 15 mesas insertadas');
}