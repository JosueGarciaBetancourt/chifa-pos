export function seed(db) {
  console.log('[SEEDER] Insertando tipos_comprobantes...');

  const stmt = db.prepare(`
    INSERT INTO tipos_comprobantes (id, nombre, serie_letras_iniciales)
    VALUES (?, ?, ?)
  `);

  const tipos_comprobantes = [
    [1, 'boleta', 'B'],
    [2, 'ticket', 'T'],
    [3, 'factura', 'F'],
    [4, 'nota de crédito', 'NC']
  ];

  const insertMany = db.transaction((tipos_comprobantes) => {
    for (const tc of tipos_comprobantes) stmt.run(tc);
  });

  insertMany(tipos_comprobantes);
  console.log(`[SEEDER] ${tipos_comprobantes.length} tipos_comprobantes insertados`);
}
