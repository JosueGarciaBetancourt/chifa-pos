export function seed(db) {
  console.log('[SEEDER] Insertando cierres_caja...');

  const stmt = db.prepare(`
    INSERT INTO cierres_caja (movimiento_id, movimiento_apertura_id, monto_final_manual, monto_final_calculado, diferencia)
    VALUES (?, ?, ?, ?, ?)
  `);

  // Jornada actual aún abierta → no hay cierres
  const cierres = [];

  if (cierres.length > 0) {
    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        stmt.run(row);
      }
    });

    insertMany(cierres);
  }

  console.log(`[SEEDER] ${cierres.length} cierres de caja insertados`);
}
