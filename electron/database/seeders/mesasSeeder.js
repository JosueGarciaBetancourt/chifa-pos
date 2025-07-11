export function seed(db) {
  console.log('[SEEDER] Insertando mesas...');
  
  const stmt = db.prepare(`
    INSERT INTO mesas (numero, capacidad, estado_mesa_id, sede_id)
    VALUES (?, ?, ?, ?)
  `);

  const mesas = [
    ['M1', 4, 1, 1],
    ['M2', 6, 1, 1],
    ['M3', 8, 5, 1],
    ['M4', 2, 1, 1],
    ['M5', 10, 1, 1],
    ['M6', 4, 2, 1],
    ['M7', 6, 3, 1],
    ['M8', 4, 1, 1],
    ['M9', 6, 2, 1],
    ['M10', 8, 1, 1],
    ['M11', 4, 2, 1],
    ['M12', 6, 1, 1],
    ['M13', 4, 2, 1],
    ['M14', 10, 1, 1],
    ['M15', 8, 5, 1],
  ];

  const insertMany = db.transaction((mesas) => {
    for (const m of mesas) stmt.run(m);
  });

  insertMany(mesas);
  console.log('[SEEDER] 15 mesas insertadas');
}