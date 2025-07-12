export function seed(db) {
  console.log('[SEEDER] Insertando estados_comprobantes...');

  const stmt = db.prepare(`
    INSERT INTO estados_comprobantes (id, nombre)
    VALUES (?, ?)
  `);

  const estados_comprobantes = [
    [1, 'emitido'],
    [2, 'anulado'],
    [3, 'pendiente'],
    [4, 'observado'],
    [5, 'rechazado'],
    [6, 'enviado'],
    [7, 'aceptado'],
    [8, 'por_anular'],
    [9, 'borrador'],
  ];

  const insertMany = db.transaction((estados_comprobantes) => {
    for (const ec of estados_comprobantes) stmt.run(ec);
  });

  insertMany(estados_comprobantes);
  console.log(`[SEEDER] ${estados_comprobantes.length} estados_comprobantes insertados`);
}
