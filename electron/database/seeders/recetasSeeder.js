export function seed(db) {
  console.log('[SEEDER] Insertando recetas...');
  
  const stmt = db.prepare(`
    INSERT INTO recetas (producto_id, insumo_id, cantidad)
    VALUES (?, ?, ?)
  `);

  const recetas = [
    // P001 - Arroz Chaufa Especial (ID: 1)
    [1, 1, 0.3],   // Arroz
    [1, 2, 0.15],  // Pollo
    [1, 5, 0.1],   // Cerdo
    [1, 6, 0.05],  // Camaron
    [1, 7, 2],     // Huevos
    [1, 12, 0.05], // Cebolla
    [1, 13, 0.02], // Ajo
    [1, 15, 0.03], // Sillao
    [1, 16, 0.03], // Aceite Vegetal
    [1, 21, 0.05], // Brotes de Soya
    [1, 22, 0.05], // Cebolla China

    // P002 - Tallarín Saltado de Pollo (ID: 2)
    [2, 3, 0.25],  // Fideos
    [2, 2, 0.2],   // Pollo
    [2, 12, 0.05], // Cebolla
    [2, 23, 0.05], // Tomate
    [2, 24, 0.03], // Zanahoria
    [2, 25, 0.03], // Vainitas
    [2, 15, 0.03], // Sillao
    [2, 16, 0.03], // Aceite Vegetal
    [2, 13, 0.02], // Ajo
    [2, 11, 0.03], // Aji Amarillo

    // P003 - Aeropuerto (ID: 3)
    [3, 1, 0.15],  // Arroz
    [3, 3, 0.15],  // Fideos
    [3, 2, 0.15],  // Pollo
    [3, 12, 0.03], // Cebolla
    [3, 22, 0.03], // Cebolla China
    [3, 23, 0.02], // Tomate
    [3, 7, 1],     // Huevos
    [3, 15, 0.02], // Sillao
    [3, 16, 0.03], // Aceite Vegetal

    // P004 - Pollo Tipakay (ID: 4)
    [4, 2, 0.25],  // Pollo
    [4, 23, 0.05], // Tomate
    [4, 24, 0.05], // Zanahoria
    [4, 25, 0.03], // Vainitas
    [4, 13, 0.01], // Ajo
    [4, 15, 0.03], // Sillao
    [4, 16, 0.03], // Aceite Vegetal
    [4, 18, 0.005], // Sal

    // P005 - Chijaukay (ID: 5)
    [5, 2, 0.25],  // Pollo
    [5, 7, 1],     // Huevos (para empanar)
    [5, 29, 0.05], // Piña
    [5, 15, 0.02], // Sillao
    [5, 16, 0.05], // Aceite Vegetal
    [5, 17, 0.01], // Vinagre
    [5, 18, 0.005], // Sal

    // P008 - Tallarín con Camarones (ID: 8)
    [8, 3, 0.25],  // Fideos
    [8, 6, 0.15],  // Camaron
    [8, 12, 0.05], // Cebolla
    [8, 23, 0.05], // Tomate
    [8, 24, 0.03], // Zanahoria
    [8, 25, 0.03], // Vainitas
    [8, 15, 0.03], // Sillao
    [8, 16, 0.03], // Aceite Vegetal

    // P009 - Chancho asado con tamarindo (ID: 9)
    [9, 5, 0.25],  // Cerdo
    [9, 32, 0.05], // Tamarindo
    [9, 12, 0.03], // Cebolla
    [9, 13, 0.02], // Ajo
    [9, 15, 0.02], // Sillao
    [9, 16, 0.03], // Aceite Vegetal

    // P010 - Chancho asado con piña (ID: 10)
    [10, 5, 0.25], // Cerdo
    [10, 29, 0.1], // Piña
    [10, 12, 0.03], // Cebolla
    [10, 13, 0.02], // Ajo
    [10, 15, 0.02], // Sillao
    [10, 16, 0.03], // Aceite Vegetal

    // P020 - Chaufa de pollo (ID: 20)
    [20, 1, 0.3],  // Arroz
    [20, 2, 0.15], // Pollo
    [20, 7, 2],    // Huevos
    [20, 12, 0.05], // Cebolla
    [20, 22, 0.05], // Cebolla China
    [20, 15, 0.03], // Sillao
    [20, 16, 0.03], // Aceite Vegetal

    // S001 - Sopa Wantán (ID: 27)
    [27, 5, 0.1],  // Cerdo (para relleno)
    [27, 34, 12],  // Wantán (masa)
    [27, 22, 0.03], // Cebolla China
    [27, 23, 0.02], // Tomate
    [27, 15, 0.01], // Sillao
    [27, 18, 0.005], // Sal

    // EX001 - Wantán Frito (ID: 39)
    [39, 5, 0.15], // Cerdo
    [39, 34, 12],  // Wantán (masa)
    [39, 13, 0.02], // Ajo
    [39, 14, 0.01], // Jengibre
    [39, 16, 0.1], // Aceite Vegetal
    [39, 7, 1],    // Huevos
  ];

  const insertMany = db.transaction((recetas) => {
    for (const r of recetas) stmt.run(r);
  });

  insertMany(recetas);
  console.log(`[SEEDER] ${recetas.length} recetas insertadas`);
}