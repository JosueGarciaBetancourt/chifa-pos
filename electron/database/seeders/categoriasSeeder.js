export function seed(db) {
  console.log('[SEEDER] Insertando categorias...');

  const stmt = db.prepare(`
    INSERT INTO categorias (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const categorias = [
    [1, 'platos_principales', 'Platos principales que suelen incluir proteínas, guarniciones y salsas.'], 
    [2, 'sopas', 'Platos de cuchara como sopa wantán (individual o completa)'], 
    [3, 'entradas', 'Platos ligeros servidos antes del plato principal.'],
    [4, 'ensaladas', 'Ensaladas de todo tipo'],
    [5, 'postres', 'Dulces y preparaciones de cierre como pasteles, flan o helado.'],
    [6, 'bebidas', 'Bebidas frías o calientes como jugos, refrescos, agua, café.'],
    [7, 'infusiones', 'Té, mate, etc.'],
    [8, 'extras', 'Adicionales como pan, salsas, guarniciones o complementos del plato.']
  ];

  const insertMany = db.transaction((categorias) => {
    for (const c of categorias) stmt.run(c);
  });

  insertMany(categorias);
  console.log(`[SEEDER] ${categorias.length} categorias insertadas`);
}
