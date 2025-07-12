export function seed(db) {
  console.log('[SEEDER] Insertando metodos_pago...');

  const stmt = db.prepare(`
    INSERT INTO metodos_pago (id, nombre)
    VALUES (?, ?)
  `);

  const metodos_pago = [
    [1, 'efectivo'],
    [2, 'tarjeta'],
    [3, 'yape'],
    [4, 'plin'],
    [5, 'transferencia'],
    [6, 'depósito bancario']
  ];

  const insertMany = db.transaction((metodos_pago) => {
    for (const mp of metodos_pago) stmt.run(mp);
  });

  insertMany(metodos_pago);
  console.log(`[SEEDER] ${metodos_pago.length} metodos_pago insertados`);
}
