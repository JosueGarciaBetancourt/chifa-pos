export function seed(db) {
  console.log('[SEEDER] Insertando insumos...');

  const stmt = db.prepare(`
    INSERT INTO insumos (id, nombre, unidad_medida, stock_actual, stock_minimo, costo)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insumos = [
    [1, 'Arroz', 'kg', 50, 10, 3.5],
    [2, 'Pollo', 'kg', 30, 5, 8.0],
    [3, 'Fideos', 'kg', 40, 8, 4.0],
    [4, 'Carne de Res', 'kg', 25, 5, 12.0],
    [5, 'Cerdo', 'kg', 20, 4, 10.0],
    [6, 'Camarón', 'kg', 15, 3, 25.0],
    [7, 'Huevos', 'unidad', 300, 60, 0.5],

    [8, 'Inca Kola 500ml', 'unidad', 200, 50, 2.0],
    [9, 'Coca Cola 500ml', 'unidad', 150, 40, 2.2],
    [10, 'Agua Mineral 600ml', 'unidad', 180, 30, 1.0],

    [11, 'Aji Amarillo', 'kg', 10, 2, 15.0],
    [12, 'Cebolla', 'kg', 25, 5, 2.5],
    [13, 'Ajo', 'kg', 8, 2, 8.0],
    [14, 'Jengibre', 'kg', 5, 1, 12.0],
    [15, 'Sillao', 'l', 10, 2, 6.0],
    [16, 'Aceite Vegetal', 'l', 20, 4, 5.0],
    [17, 'Vinagre', 'l', 8, 2, 4.0],
    [18, 'Sal', 'kg', 15, 3, 1.0],
    [19, 'Pimienta', 'g', 1000, 200, 0.1],

    [20, 'Brotes de Soya', 'kg', 15, 3, 3.0],
    [21, 'Cebolla China', 'kg', 12, 3, 2.8],
    [22, 'Tomate', 'kg', 18, 4, 3.2],
    [23, 'Zanahoria', 'kg', 15, 3, 2.0],
    [24, 'Vainitas', 'kg', 10, 2, 4.0],
    [25, 'Champiñones', 'kg', 8, 2, 7.0],

    [26, 'Piña', 'kg', 10, 2, 6.0],
    [27, 'Espárragos', 'kg', 6, 2, 9.0],
    [28, 'Castañas', 'kg', 5, 1, 15.0],
    [29, 'Castañas de Cajú', 'kg', 5, 1, 18.0],
    [30, 'Durazno', 'kg', 6, 2, 10.0],
    [31, 'Tamarindo', 'kg', 4, 1, 14.0],
    [32, 'Curry en polvo', 'g', 500, 100, 0.08],
    [33, 'Wantán (masa)', 'unidad', 200, 50, 0.4],
    [34, 'Fansi (fideo chino)', 'kg', 10, 2, 5.0],
    [35, 'Sahofán (fideo arroz)', 'kg', 10, 2, 5.5],
    [36, 'Hongos Chinos', 'kg', 5, 1, 16.0],
    [37, 'Lai chi (lychee)', 'kg', 3, 1, 22.0],
    [38, 'Espinaca', 'kg', 6, 2, 3.5],
    [39, 'Frutas Mixtas', 'kg', 10, 2, 6.5],
    [40, 'Nabo Encurtido', 'kg', 5, 1, 7.0],
    [41, 'Polvo 5 Sabores', 'g', 300, 50, 0.12],
  ];

  const insertMany = db.transaction((insumos) => {
    for (const i of insumos) stmt.run(i);
  });

  insertMany(insumos);
  console.log(`[SEEDER] ${insumos.length} insumos insertados`);
}
