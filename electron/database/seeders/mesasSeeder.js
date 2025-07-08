export function seed(db) {
  console.log('[SEEDER] insertando mesas iniciales...');

  const stmt = db.prepare(`
    INSERT INTO mesas (numero, capacidad, estado)
    VALUES (?, ?, ?)
  `);

  const mesas = [
    ['M1', 4, 'disponible'],
    ['M2', 2, 'disponible'],
    ['M3', 6, 'ocupada'],
    ['M4', 4, 'reservada'],
    ['M5', 8, 'disponible']
  ];

  const insertMany = db.transaction((mesas) => {
    for (const mesa of mesas) stmt.run(mesa);
  });

  insertMany(mesas);

  console.log('[SEEDER] mesas insertadas correctamente.');
}
