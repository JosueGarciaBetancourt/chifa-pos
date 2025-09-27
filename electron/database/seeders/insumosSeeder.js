export function seed(db) {
  console.log('[SEEDER] Insertando insumos...');

  const stmt = db.prepare(`
    INSERT INTO insumos (id, nombre, tipo_id, unidad_medida, stock_minimo)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insumos = [
    // Granos (1)
    [1, 'Arroz', 1, 'kg', 10],
    [3, 'Fideos', 1, 'kg', 8],
    [33, 'Wantán (masa)', 1, 'unidad', 50],
    [34, 'Fansi (fideo chino)', 1, 'kg', 2],
    [35, 'Sahofán (fideo arroz)', 1, 'kg', 2],

    // Carnes y proteínas (2)
    [2, 'Pollo', 2, 'kg', 5],
    [4, 'Carne de Res', 2, 'kg', 5],
    [5, 'Cerdo', 2, 'kg', 4],
    [6, 'Camarón', 2, 'kg', 3],
    [7, 'Huevos', 2, 'unidad', 60],

    // Insumos para bebidas (3)
    [8, 'Jarabe de goma', 3, 'ml', 1000],
    [9, 'Pulpa de maracuyá', 3, 'ml', 800],
    [10, 'Hojas de hierbaluisa', 3, 'g', 50],

    // Condimentos (4)
    [13, 'Ajo', 4, 'kg', 2],
    [14, 'Jengibre', 4, 'kg', 1],
    [18, 'Sal', 4, 'kg', 3],
    [19, 'Pimienta', 4, 'g', 200],
    [32, 'Curry en polvo', 4, 'g', 100],
    [41, 'Polvo 5 Sabores', 4, 'g', 50],

    // Vegetales (5)
    [11, 'Aji Amarillo', 5, 'kg', 2],
    [12, 'Cebolla', 5, 'kg', 5],
    [20, 'Brotes de Soya', 5, 'kg', 3],
    [21, 'Cebolla China', 5, 'kg', 3],
    [22, 'Tomate', 5, 'kg', 4],
    [23, 'Zanahoria', 5, 'kg', 3],
    [24, 'Vainitas', 5, 'kg', 2],
    [25, 'Champiñones', 5, 'kg', 2],
    [27, 'Espárragos', 5, 'kg', 2],
    [36, 'Hongos Chinos', 5, 'kg', 1],
    [38, 'Espinaca', 5, 'kg', 2],
    [40, 'Nabo Encurtido', 5, 'kg', 1],

    // Salsas y líquidos (6)
    [15, 'Sillao', 6, 'l', 2],
    [16, 'Aceite Vegetal', 6, 'l', 4],
    [17, 'Vinagre', 6, 'l', 2],

    // Frutas (7)
    [26, 'Piña', 7, 'kg', 2],
    [30, 'Durazno', 7, 'kg', 2],
    [31, 'Tamarindo', 7, 'kg', 1],
    [37, 'Lai chi (lychee)', 7, 'kg', 1],
    [39, 'Frutas Mixtas', 7, 'kg', 2],

    // Frutos secos y semillas (8)
    [28, 'Castañas', 8, 'kg', 1],
    [29, 'Castañas de Cajú', 8, 'kg', 1],
  ];
  
  const insertMany = db.transaction(() => {
    for (const insumo of insumos) {
      stmt.run(insumo);
    }
  });

  insertMany();

  console.log(`[SEEDER] ${insumos.length} insumos insertados`);
}
