export function seed(db) {
  console.log('[SEEDER] Insertando insumos...');

  const stmt = db.prepare(`
    INSERT INTO insumos (nombre, unidad_medida, stock_actual, stock_minimo, costo)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insumos = [
    // Base
    ['Arroz', 'kg', 50, 10, 3.5],
    ['Pollo', 'kg', 30, 5, 8.0],
    ['Fideos', 'kg', 40, 8, 4.0],
    ['Carne de Res', 'kg', 25, 5, 12.0],
    ['Cerdo', 'kg', 20, 4, 10.0],
    ['Camaron', 'kg', 15, 3, 25.0],
    ['Huevos', 'unidad', 300, 60, 0.5],

    // Bebidas
    ['Inca Kola 500ml', 'unidad', 200, 50, 2.0],
    ['Coca Cola 500ml', 'unidad', 150, 40, 2.2],
    ['Agua Mineral 600ml', 'unidad', 180, 30, 1.0],

    // Verduras y saborizantes
    ['Aji Amarillo', 'kg', 10, 2, 15.0],
    ['Cebolla', 'kg', 25, 5, 2.5],
    ['Ajo', 'kg', 8, 2, 8.0],
    ['Jengibre', 'kg', 5, 1, 12.0],
    ['Sillao', 'l', 10, 2, 6.0],
    ['Aceite Vegetal', 'l', 20, 4, 5.0],
    ['Vinagre', 'l', 8, 2, 4.0],
    ['Sal', 'kg', 15, 3, 1.0],
    ['Pimienta', 'g', 1000, 200, 0.1],

    ['Brotes de Soya', 'kg', 15, 3, 3.0],
    ['Cebolla China', 'kg', 12, 3, 2.8],
    ['Tomate', 'kg', 18, 4, 3.2],
    ['Zanahoria', 'kg', 15, 3, 2.0],
    ['Vainitas', 'kg', 10, 2, 4.0],
    ['Champiñones', 'kg', 8, 2, 7.0],

    // Nuevos ingredientes según menú
    ['Piña', 'kg', 10, 2, 6.0],
    ['Espárragos', 'kg', 6, 2, 9.0],
    ['Castañas', 'kg', 5, 1, 15.0],
    ['Castañas de Cajú', 'kg', 5, 1, 18.0],
    ['Durazno', 'kg', 6, 2, 10.0],
    ['Tamarindo', 'kg', 4, 1, 14.0],
    ['Curry en polvo', 'g', 500, 100, 0.08],
    ['Wantán (masa)', 'unidad', 200, 50, 0.4],
    ['Fansi (fideo chino)', 'kg', 10, 2, 5.0],
    ['Sahofán (fideo arroz)', 'kg', 10, 2, 5.5],
    ['Hongos Chinos', 'kg', 5, 1, 16.0],
    ['Lai chi (lychee)', 'kg', 3, 1, 22.0],
    ['Espinaca', 'kg', 6, 2, 3.5],
    ['Frutas Mixtas', 'kg', 10, 2, 6.5],
    ['Nabo Encurtido', 'kg', 5, 1, 7.0],
    ['Polvo 5 Sabores', 'g', 300, 50, 0.12],
  ];

  const insertMany = db.transaction((insumos) => {
    for (const i of insumos) stmt.run(i);
  });

  insertMany(insumos);
  console.log(`[SEEDER] ${insumos.length} insumos insertados`);
}
