export function seed(db) {
  console.log('[SEEDER] Insertando categorias_productos...');

  const stmt = db.prepare(`
    INSERT INTO categorias_productos (id, nombre, descripcion, activo)
    VALUES (?, ?, ?, ?)
  `);

  const categorias_productos = [
    [1, 'Platos Principales', 'Platos principales o de fondo.', 1], 
    [2, 'Sopas', 'Platos de cuchara como sopa wantán (individual o completa)', 1], 
    [3, 'Entradas', 'Platos ligeros servidos antes del plato principal.', 1],
    [4, 'Ensaladas', 'Ensaladas de todo tipo', 1],
    [5, 'Postres', 'Dulces y preparaciones de cierre como pasteles, flan o helado.', 1],
    [6, 'Bebidas', 'Bebidas frías o calientes como jugos, refrescos, agua, café.', 1],
    [7, 'Infusiones', 'Té, mate, etc.', 1],
    [8, 'Extras', 'Adicionales como pan, salsas, guarniciones o complementos del plato.', 1],
    [9, 'Combos', 'Conjunto de platos y más económico.', 1],
    [10, 'Inactivos', 'Categoría de prueba inactiva.', 0]
  ];

  const insertMany = db.transaction((categorias_productos) => {
    for (const cp of categorias_productos) stmt.run(cp);
  });

  insertMany(categorias_productos);
  console.log(`[SEEDER] ${categorias_productos.length} categorias_productos insertadas`);
}
