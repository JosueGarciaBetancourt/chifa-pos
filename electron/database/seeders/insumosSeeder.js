export function seed(db) {
  console.log('[SEEDER] Insertando insumos...');

  const stmt = db.prepare(`
    INSERT INTO insumos (id, nombre, tipo_id, unidad_medida, stock_actual, stock_minimo, costo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Asignamos tipo_id para cada insumo según su categoría
  // Puedes reemplazar los IDs con los correctos si ya tienes semillas para tipos_insumos

  const insumos = [
    [1, 'Arroz', 1, 'kg', 50, 10, 3.5],           // tipo_id 1: Granos
    [2, 'Pollo', 2, 'kg', 30, 5, 8.0],            // tipo_id 2: Carnes
    [3, 'Fideos', 1, 'kg', 40, 8, 4.0],
    [4, 'Carne de Res', 2, 'kg', 25, 5, 12.0],
    [5, 'Cerdo', 2, 'kg', 20, 4, 10.0],
    [6, 'Camarón', 2, 'kg', 15, 3, 25.0],
    [7, 'Huevos', 2, 'unidad', 300, 60, 0.5],

    [8, 'Inca Kola 500ml', 3, 'unidad', 200, 50, 2.0],     // tipo_id 3: Bebidas
    [9, 'Coca Cola 500ml', 3, 'unidad', 150, 40, 2.2],
    [10, 'Agua Mineral 600ml', 3, 'unidad', 180, 30, 1.0],

    [11, 'Aji Amarillo', 4, 'kg', 10, 2, 15.0],     // tipo_id 4: Verduras y condimentos
    [12, 'Cebolla', 4, 'kg', 25, 5, 2.5],
    [13, 'Ajo', 4, 'kg', 8, 2, 8.0],
    [14, 'Jengibre', 4, 'kg', 5, 1, 12.0],
    [15, 'Sillao', 5, 'l', 10, 2, 6.0],             // tipo_id 5: Salsas
    [16, 'Aceite Vegetal', 5, 'l', 20, 4, 5.0],
    [17, 'Vinagre', 5, 'l', 8, 2, 4.0],
    [18, 'Sal', 4, 'kg', 15, 3, 1.0],
    [19, 'Pimienta', 4, 'g', 1000, 200, 0.1],

    [20, 'Brotes de Soya', 4, 'kg', 15, 3, 3.0],
    [21, 'Cebolla China', 4, 'kg', 12, 3, 2.8],
    [22, 'Tomate', 4, 'kg', 18, 4, 3.2],
    [23, 'Zanahoria', 4, 'kg', 15, 3, 2.0],
    [24, 'Vainitas', 4, 'kg', 10, 2, 4.0],
    [25, 'Champiñones', 4, 'kg', 8, 2, 7.0],

    [26, 'Piña', 6, 'kg', 10, 2, 6.0],              // tipo_id 6: Frutas
    [27, 'Espárragos', 4, 'kg', 6, 2, 9.0],
    [28, 'Castañas', 7, 'kg', 5, 1, 15.0],          // tipo_id 7: Frutos secos
    [29, 'Castañas de Cajú', 7, 'kg', 5, 1, 18.0],
    [30, 'Durazno', 6, 'kg', 6, 2, 10.0],
    [31, 'Tamarindo', 6, 'kg', 4, 1, 14.0],
    [32, 'Curry en polvo', 4, 'g', 500, 100, 0.08],
    [33, 'Wantán (masa)', 1, 'unidad', 200, 50, 0.4],
    [34, 'Fansi (fideo chino)', 1, 'kg', 10, 2, 5.0],
    [35, 'Sahofán (fideo arroz)', 1, 'kg', 10, 2, 5.5],
    [36, 'Hongos Chinos', 4, 'kg', 5, 1, 16.0],
    [37, 'Lai chi (lychee)', 6, 'kg', 3, 1, 22.0],
    [38, 'Espinaca', 4, 'kg', 6, 2, 3.5],
    [39, 'Frutas Mixtas', 6, 'kg', 10, 2, 6.5],
    [40, 'Nabo Encurtido', 4, 'kg', 5, 1, 7.0],
    [41, 'Polvo 5 Sabores', 4, 'g', 300, 50, 0.12]
  ];

  const insertMany = db.transaction(() => {
    for (const insumo of insumos) {
      stmt.run(insumo);
    }
  });

  insertMany();

  console.log(`[SEEDER] ${insumos.length} insumos insertados`);
}
