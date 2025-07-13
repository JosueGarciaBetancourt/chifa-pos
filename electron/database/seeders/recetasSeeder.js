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

    // P051 - Combo Chaufa + Wantán (ID: 51)
    [85, 51, 1, 0.3],   // Arroz
    [86, 51, 2, 0.15],  // Pollo
    [87, 51, 7, 2],     // Huevos
    [88, 51, 12, 0.05], // Cebolla
    [89, 51, 15, 0.03], // Sillao
    [90, 51, 16, 0.03], // Aceite Vegetal
    [91, 51, 34, 6],    // Wantán (masa)
    [92, 51, 5, 0.05],  // Cerdo relleno

    // P052 - Combo Tallarín Saltado + Bebida (ID: 52)
    [93, 52, 3, 0.25],  // Fideos
    [94, 52, 2, 0.2],   // Pollo
    [95, 52, 12, 0.05], // Cebolla
    [96, 52, 23, 0.05], // Tomate
    [97, 52, 15, 0.03], // Sillao
    [98, 52, 16, 0.03], // Aceite Vegetal

    // P053 - Combo Chaufa Especial + Sopa Wantán (ID: 53)
    [99, 53, 1, 0.3],   // Arroz
    [100, 53, 2, 0.15], // Pollo
    [101, 53, 5, 0.1],  // Cerdo
    [102, 53, 6, 0.05], // Camaron
    [103, 53, 7, 2],    // Huevos
    [104, 53, 12, 0.05], // Cebolla
    [105, 53, 34, 8],   // Wantán
    [106, 53, 22, 0.03], // Cebolla China

    // P054 - Combo Pollo Tipakay + Gaseosa (ID: 54)
    [107, 54, 2, 0.25], // Pollo
    [108, 54, 24, 0.05], // Zanahoria
    [109, 54, 25, 0.03], // Vainitas
    [110, 54, 13, 0.01], // Ajo
    [111, 54, 15, 0.03], // Sillao
    [112, 54, 16, 0.03], // Aceite Vegetal

    // P055 - Combo Aeropuerto + Bebida (ID: 55)
    [113, 55, 1, 0.2],  // Arroz
    [114, 55, 3, 0.2],  // Fideos
    [115, 55, 2, 0.15], // Pollo
    [116, 55, 7, 1],    // Huevos
    [117, 55, 12, 0.03], // Cebolla
    [118, 55, 15, 0.03], // Sillao
    [119, 55, 16, 0.03], // Aceite Vegetal

    // P056 - Combo Chijaukay + Wantán (ID: 56)
    [120, 56, 2, 0.25], // Pollo
    [121, 56, 7, 1],    // Huevos
    [122, 56, 29, 0.05], // Piña
    [123, 56, 15, 0.02], // Sillao
    [124, 56, 16, 0.05], // Aceite Vegetal
    [125, 56, 34, 6],   // Wantán
    [126, 56, 5, 0.05], // Cerdo

    // P057 - Combo Chaufa + Infusión (ID: 57)
    [127, 57, 1, 0.3],  // Arroz
    [128, 57, 2, 0.15], // Pollo
    [129, 57, 7, 2],    // Huevos
    [130, 57, 12, 0.05], // Cebolla
    [131, 57, 15, 0.03], // Sillao
    [132, 57, 16, 0.03], // Aceite Vegetal

    // P058 - Combo Tipakay + Chaufa (ID: 58)
    [133, 58, 2, 0.3],  // Pollo
    [134, 58, 1, 0.25], // Arroz
    [135, 58, 7, 2],    // Huevos
    [136, 58, 12, 0.05], // Cebolla
    [137, 58, 15, 0.04], // Sillao
    [138, 58, 16, 0.04], // Aceite Vegetal

    // P059 - Combo Chaufa + Wantán + Gaseosa (ID: 59)
    [139, 59, 1, 0.3],  // Arroz
    [140, 59, 2, 0.15], // Pollo
    [141, 59, 7, 2],    // Huevos
    [142, 59, 12, 0.05], // Cebolla
    [143, 59, 15, 0.03], // Sillao
    [144, 59, 16, 0.03], // Aceite Vegetal
    [145, 59, 34, 6],   // Wantán
    [146, 59, 5, 0.05], // Cerdo

    // P060 - Combo Tipakay + Sopa Wantán (ID: 60)
    [147, 60, 2, 0.25], // Pollo
    [148, 60, 24, 0.05], // Zanahoria
    [149, 60, 25, 0.03], // Vainitas
    [150, 60, 13, 0.01], // Ajo
    [151, 60, 15, 0.03], // Sillao
    [152, 60, 16, 0.03], // Aceite Vegetal
    [153, 60, 34, 6],   // Wantán
    [154, 60, 5, 0.05], // Cerdo
  ];

  const insertMany = db.transaction((recetas) => {
    for (const r of recetas) stmt.run(r);
  });

  insertMany(recetas);
  console.log(`[SEEDER] ${recetas.length} recetas insertadas`);
}
