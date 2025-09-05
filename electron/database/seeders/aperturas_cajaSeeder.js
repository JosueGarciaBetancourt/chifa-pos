export function seed(db) {
  console.log('[SEEDER] Insertando aperturas_caja...');

  const stmt = db.prepare(`
    INSERT INTO aperturas_caja (movimiento_id, monto_inicial)
    VALUES (?, ?)
  `);

  const aperturas = [
    // Única jornada del día (movimiento_id 1 = apertura)
    [1, 100.0]
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) {
      stmt.run(row);
    }
  });

  insertMany(aperturas);
  console.log(`[SEEDER] ${aperturas.length} apertura de caja insertada`);
}
