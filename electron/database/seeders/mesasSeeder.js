export function seed(db) {
  console.log('[SEEDER] Insertando mesas...');
  
  const stmt = db.prepare(`
    INSERT INTO mesas (id, numero, capacidad, estado_mesa_id, sede_id)
    VALUES (?, ?, ?, ?, ?)
  `);

  const mesas = [
    [1, 'M1', 4, 1, 1],
    [2, 'M2', 6, 1, 1],
    [3, 'M3', 8, 5, 1],
    [4, 'M4', 2, 1, 1],
    [5, 'M5', 10, 1, 1],
    [6, 'M6', 4, 2, 1],
    [7, 'M7', 6, 3, 1],
    [8, 'M8', 4, 1, 1],
    [9, 'M9', 6, 2, 1],
    [10, 'M10', 8, 1, 1],
    [11, 'M11', 4, 2, 1],
    [12, 'M12', 6, 1, 1],
    [13, 'M13', 4, 2, 1],
    [14, 'M14', 10, 1, 1],
    [15, 'M15', 8, 5, 1]
  ];

  const insertMany = db.transaction((mesas) => {
    for (const m of mesas) stmt.run(m);
  });

  insertMany(mesas);
  console.log('[SEEDER] 15 mesas insertadas');
}
