export function seed(db) {
  console.log('[SEEDER] Insertando categorias_productos...');

  const stmt = db.prepare(`
    INSERT INTO categorias_productos (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const categorias_productos = [
    [1, 'platos_principales', 'Platos principales o de fondo.'], 
    [2, 'sopas', 'Platos de cuchara como sopa wantán (individual o completa)'], 
    [3, 'entradas', 'Platos ligeros servidos antes del plato principal.'],
    [4, 'ensaladas', 'Ensaladas de todo tipo'],
    [5, 'postres', 'Dulces y preparaciones de cierre como pasteles, flan o helado.'],
    [6, 'bebidas', 'Bebidas frías o calientes como jugos, refrescos, agua, café.'],
    [7, 'infusiones', 'Té, mate, etc.'],
    [8, 'extras', 'Adicionales como pan, salsas, guarniciones o complementos del plato.'],
    [9, 'combos', 'Conjunto de platos y más económico.']
  ];

  const insertMany = db.transaction((categorias_productos) => {
    for (const cp of categorias_productos) stmt.run(cp);
  });

  insertMany(categorias_productos);
  console.log(`[SEEDER] ${categorias_productos.length} categorias_productos insertadas`);
}
