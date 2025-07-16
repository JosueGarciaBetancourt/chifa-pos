export function seed(db) {
  console.log('[SEEDER] Insertando tipos_insumos...');

  const stmt = db.prepare(`
    INSERT INTO tipos_insumos (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const tipos_insumos = [
    [1, 'Granos', 'Insumos como arroz, fideos y similares.'],
    [2, 'Carnes y proteínas', 'Carnes rojas, blancas, mariscos, huevos.'],
    [3, 'Bebidas', 'Bebidas embotelladas como gaseosas o agua.'],
    [4, 'Condimentos', 'especias, aliños, hierbas.'],
    [5, 'Vegetales', 'Verduras.'],
    [6, 'Salsas y líquidos', 'Salsas como sillao, aceite, vinagre, etc.'],
    [7, 'Frutas', 'Frutas frescas o procesadas.'],
    [8, 'Frutos secos y semillas', 'Castañas, nueces, semillas.']
  ];

  const insertMany = db.transaction(() => {
    for (const tipo of tipos_insumos) {
      stmt.run(tipo);
    }
  });

  insertMany();

  console.log(`[SEEDER] ${tipos_insumos.length} tipos_insumos insertados`);
}
