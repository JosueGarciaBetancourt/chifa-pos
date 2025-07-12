export function seed(db) {
  console.log('[SEEDER] Insertando recetas...');

  const stmt = db.prepare(`
    INSERT INTO recetas (id, producto_id, insumo_id, cantidad)
    VALUES (?, ?, ?, ?)
  `);

  const recetas = [
    // P001 - Arroz Chaufa Especial (ID: 1)
    [1, 1, 1, 0.3],   // Arroz
    [2, 1, 2, 0.15],  // Pollo
    [3, 1, 5, 0.1],   // Cerdo
    [4, 1, 6, 0.05],  // Camaron
    [5, 1, 7, 2],     // Huevos
    [6, 1, 12, 0.05], // Cebolla
    [7, 1, 13, 0.02], // Ajo
    [8, 1, 15, 0.03], // Sillao
    [9, 1, 16, 0.03], // Aceite Vegetal
    [10, 1, 21, 0.05], // Brotes de Soya
    [11, 1, 22, 0.05], // Cebolla China

    // P002 - Tallarín Saltado de Pollo (ID: 2)
    [12, 2, 3, 0.25],  // Fideos
    [13, 2, 2, 0.2],   // Pollo
    [14, 2, 12, 0.05], // Cebolla
    [15, 2, 23, 0.05], // Tomate
    [16, 2, 24, 0.03], // Zanahoria
    [17, 2, 25, 0.03], // Vainitas
    [18, 2, 15, 0.03], // Sillao
    [19, 2, 16, 0.03], // Aceite Vegetal
    [20, 2, 13, 0.02], // Ajo
    [21, 2, 11, 0.03], // Aji Amarillo

    // P003 - Aeropuerto (ID: 3)
    [22, 3, 1, 0.15],  // Arroz
    [23, 3, 3, 0.15],  // Fideos
    [24, 3, 2, 0.15],  // Pollo
    [25, 3, 12, 0.03], // Cebolla
    [26, 3, 22, 0.03], // Cebolla China
    [27, 3, 23, 0.02], // Tomate
    [28, 3, 7, 1],     // Huevos
    [29, 3, 15, 0.02], // Sillao
    [30, 3, 16, 0.03], // Aceite Vegetal

    // P004 - Pollo Tipakay (ID: 4)
    [31, 4, 2, 0.25],  // Pollo
    [32, 4, 23, 0.05], // Tomate
    [33, 4, 24, 0.05], // Zanahoria
    [34, 4, 25, 0.03], // Vainitas
    [35, 4, 13, 0.01], // Ajo
    [36, 4, 15, 0.03], // Sillao
    [37, 4, 16, 0.03], // Aceite Vegetal
    [38, 4, 18, 0.005], // Sal

    // P005 - Chijaukay (ID: 5)
    [39, 5, 2, 0.25],  // Pollo
    [40, 5, 7, 1],     // Huevos (para empanar)
    [41, 5, 29, 0.05], // Piña
    [42, 5, 15, 0.02], // Sillao
    [43, 5, 16, 0.05], // Aceite Vegetal
    [44, 5, 17, 0.01], // Vinagre
    [45, 5, 18, 0.005], // Sal

    // P008 - Tallarín con Camarones (ID: 8)
    [46, 8, 3, 0.25],  // Fideos
    [47, 8, 6, 0.15],  // Camaron
    [48, 8, 12, 0.05], // Cebolla
    [49, 8, 23, 0.05], // Tomate
    [50, 8, 24, 0.03], // Zanahoria
    [51, 8, 25, 0.03], // Vainitas
    [52, 8, 15, 0.03], // Sillao
    [53, 8, 16, 0.03], // Aceite Vegetal

    // P009 - Chancho asado con tamarindo (ID: 9)
    [54, 9, 5, 0.25],  // Cerdo
    [55, 9, 32, 0.05], // Tamarindo
    [56, 9, 12, 0.03], // Cebolla
    [57, 9, 13, 0.02], // Ajo
    [58, 9, 15, 0.02], // Sillao
    [59, 9, 16, 0.03], // Aceite Vegetal

    // P010 - Chancho asado con piña (ID: 10)
    [60, 10, 5, 0.25], // Cerdo
    [61, 10, 29, 0.1], // Piña
    [62, 10, 12, 0.03], // Cebolla
    [63, 10, 13, 0.02], // Ajo
    [64, 10, 15, 0.02], // Sillao
    [65, 10, 16, 0.03], // Aceite Vegetal

    // P020 - Chaufa de pollo (ID: 20)
    [66, 20, 1, 0.3],  // Arroz
    [67, 20, 2, 0.15], // Pollo
    [68, 20, 7, 2],    // Huevos
    [69, 20, 12, 0.05], // Cebolla
    [70, 20, 22, 0.05], // Cebolla China
    [71, 20, 15, 0.03], // Sillao
    [72, 20, 16, 0.03], // Aceite Vegetal

    // S001 - Sopa Wantán (ID: 27)
    [73, 27, 5, 0.1],  // Cerdo (para relleno)
    [74, 27, 34, 12],  // Wantán (masa)
    [75, 27, 22, 0.03], // Cebolla China
    [76, 27, 23, 0.02], // Tomate
    [77, 27, 15, 0.01], // Sillao
    [78, 27, 18, 0.005], // Sal

    // EX001 - Wantán Frito (ID: 39)
    [79, 39, 5, 0.15], // Cerdo
    [80, 39, 34, 12],  // Wantán (masa)
    [81, 39, 13, 0.02], // Ajo
    [82, 39, 14, 0.01], // Jengibre
    [83, 39, 16, 0.1], // Aceite Vegetal
    [84, 39, 7, 1],    // Huevos
  ];

  const insertMany = db.transaction((recetas) => {
    for (const r of recetas) stmt.run(r);
  });

  insertMany(recetas);
  console.log(`[SEEDER] ${recetas.length} recetas insertadas`);
}
