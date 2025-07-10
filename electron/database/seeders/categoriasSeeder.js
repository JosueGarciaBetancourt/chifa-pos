export function seed(db) {
  console.log('[SEEDER] Insertando categorias...');

  const stmt = db.prepare(`
    INSERT INTO categorias (nombre, descripcion)
    VALUES (?, ?)
  `);

  const categorias = [
    ['platos_principales', 'Platos principales que suelen incluir proteínas, guarniciones y salsas.'], 
    ['sopas', 'Platos de cuchara como sopa wantán (individual o completa)'], 
    ['entradas', 'Platos ligeros servidos antes del plato principal.'],
    ['ensaladas', 'Ensaladas de todo tipo'],
    ['postres', 'Dulces y preparaciones de cierre como pasteles, flan o helado.'],
    ['bebidas', 'Bebidas frías o calientes como jugos, refrescos, agua, café.'],
    ['infusiones', 'Té, mate, etc.'],
    ['extras', 'Adicionales como pan, salsas, guarniciones o complementos del plato.']
  ];

  const insertMany = db.transaction((categorias) => {
    for (const c of categorias) stmt.run(c);
  });

  insertMany(categorias);

  const cantCategorias = categorias.length;
  console.log(`[SEEDER] ${cantCategorias} categorias insertadas`);
}
