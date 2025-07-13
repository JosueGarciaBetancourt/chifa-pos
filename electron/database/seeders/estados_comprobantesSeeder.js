export function seed(db) {
  console.log('[SEEDER] Insertando estados_comprobantes...');

  const stmt = db.prepare(`
    INSERT INTO estados_comprobantes (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const estados_comprobantes = [
    [1, 'borrador', 'Comprobante en edición, aún no se emite'],
    [2, 'emitido', 'Comprobante generado internamente y entregado a cliente, listo para envío a SUNAT'],
    [3, 'enviado', 'Comprobante enviado electrónicamente a SUNAT'],
    [4, 'aceptado', 'Comprobante aceptado por SUNAT (válido legalmente)'],
    [5, 'anulado', 'Comprobante anulado por error o corrección'],
  ];

  const insertMany = db.transaction((estados) => {
    for (const ec of estados) stmt.run(ec);
  });

  insertMany(estados_comprobantes);
  console.log(`[SEEDER] ${estados_comprobantes.length} estados_comprobantes insertados`);
}
