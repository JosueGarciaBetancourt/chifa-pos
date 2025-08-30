export function seed(db) {
  console.log('[SEEDER] Insertando insumos...');

  const stmt = db.prepare(`
    INSERT INTO insumos (id, nombre, tipo_id, unidad_medida, stock_actual, stock_minimo)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  // Asignamos tipo_id para cada insumo según su categoría
  // Puedes reemplazar los IDs con los correctos si ya tienes semillas para tipos_insumos

  const insumos = [
    // Granos (1)
    [1, 'Arroz', 1, 'kg', 50, 10],
    [3, 'Fideos', 1, 'kg', 40, 8],
    [33, 'Wantán (masa)', 1, 'unidad', 200, 50],
    [34, 'Fansi (fideo chino)', 1, 'kg', 10, 2],
    [35, 'Sahofán (fideo arroz)', 1, 'kg', 10, 2],

    // Carnes y proteínas (2)
    [2, 'Pollo', 2, 'kg', 30, 5],
    [4, 'Carne de Res', 2, 'kg', 25, 5],
    [5, 'Cerdo', 2, 'kg', 20, 4],
    [6, 'Camarón', 2, 'kg', 15, 3],
    [7, 'Huevos', 2, 'unidad', 300, 60],

    // Insumos para bebidas (3)
    [8, 'Jarabe de goma', 3, 'ml', 5000, 1000], // 5 litros, costo unitario por ml
    [9, 'Pulpa de maracuyá', 3, 'ml', 3000, 800], // 3 litros
    [10, 'Hojas de hierbaluisa', 3, 'g', 200, 50], // para infusiones

    // Condimentos (4)
    [13, 'Ajo', 4, 'kg', 8, 2],
    [14, 'Jengibre', 4, 'kg', 5, 1],
    [18, 'Sal', 4, 'kg', 15, 3],
    [19, 'Pimienta', 4, 'g', 1000, 200],
    [32, 'Curry en polvo', 4, 'g', 500, 100],
    [41, 'Polvo 5 Sabores', 4, 'g', 300, 50],

    // Vegetales (5)
    [11, 'Aji Amarillo', 5, 'kg', 10, 2],
    [12, 'Cebolla', 5, 'kg', 25, 5],
    [20, 'Brotes de Soya', 5, 'kg', 15, 3],
    [21, 'Cebolla China', 5, 'kg', 12, 3],
    [22, 'Tomate', 5, 'kg', 18, 4],
    [23, 'Zanahoria', 5, 'kg', 15, 3],
    [24, 'Vainitas', 5, 'kg', 10, 2],
    [25, 'Champiñones', 5, 'kg', 8, 2],
    [27, 'Espárragos', 5, 'kg', 6, 2],
    [36, 'Hongos Chinos', 5, 'kg', 5, 1],
    [38, 'Espinaca', 5, 'kg', 6, 2],
    [40, 'Nabo Encurtido', 5, 'kg', 5, 1],

    // Salsas y líquidos (6)
    [15, 'Sillao', 6, 'l', 10, 2],
    [16, 'Aceite Vegetal', 6, 'l', 20, 4],
    [17, 'Vinagre', 6, 'l', 8, 2],

    // Frutas (7)
    [26, 'Piña', 7, 'kg', 10, 2],
    [30, 'Durazno', 7, 'kg', 6, 2],
    [31, 'Tamarindo', 7, 'kg', 4, 1],
    [37, 'Lai chi (lychee)', 7, 'kg', 3, 1],
    [39, 'Frutas Mixtas', 7, 'kg', 10, 2],

    // Frutos secos y semillas (8)
    [28, 'Castañas', 8, 'kg', 5, 1],
    [29, 'Castañas de Cajú', 8, 'kg', 5, 1],
  ];
  
  const insertMany = db.transaction(() => {
    for (const insumo of insumos) {
      stmt.run(insumo);
    }
  });

  insertMany();

  console.log(`[SEEDER] ${insumos.length} insumos insertados`);
}
