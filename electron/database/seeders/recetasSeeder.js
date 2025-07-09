export function seed(db) {
    console.log('[SEEDER] Insertando recetas...');
    
    const stmt = db.prepare(`
      INSERT INTO recetas (producto_id, insumo_id, cantidad)
      VALUES (?, ?, ?)
    `);
  
    // Productos: 
    //   1: Arroz Chaufa Especial, 2: Tallarín Saltado de Pollo, 3: Aeropuerto, 
    //   4: Pollo Tipakay, 5: Wantán Frito, 6: Sopa Wantán, 7: Chijaukay,
    //   8: Pato Pekín, 9: Cerdo con Tamarindo, 10: Tallarín con Camarones
    
    // Insumos:
    //   1: Arroz, 2: Pollo, 3: Fideos, 4: Carne, 5: Cerdo, 6: Camaron,
    //   7: Inca Kola, 8: Coca Cola, 9: Agua, 10: Aji, 11: Cebolla, 
    //   12: Ajo, 13: Jengibre, 14: Sillao, 15: Aceite, 16: Vinagre,
    //   17: Sal, 18: Pimienta, 19: Huevos, 20: Brotes, 21: Cebolla China,
    //   22: Tomate, 23: Zanahoria, 24: Vainitas, 25: Champiñones
  
    const recetas = [
      // Arroz Chaufa Especial
      [1, 1, 0.3], [1, 2, 0.15], [1, 5, 0.1], [1, 6, 0.05], [1, 19, 2],
      [1, 20, 0.05], [1, 21, 0.05], [1, 23, 0.05], [1, 14, 0.02], [1, 15, 0.03],
      
      // Tallarín Saltado de Pollo
      [2, 3, 0.25], [2, 2, 0.2], [2, 21, 0.05], [2, 22, 0.05], [2, 23, 0.03],
      [2, 24, 0.03], [2, 14, 0.02], [2, 15, 0.03], [2, 12, 0.005], [2, 11, 0.03],
      
      // Aeropuerto (combinación)
      [3, 1, 0.15], [3, 3, 0.15], [3, 2, 0.15], [3, 20, 0.03], [3, 21, 0.03],
      [3, 23, 0.02], [3, 19, 1], [3, 14, 0.02], [3, 15, 0.03],
      
      // Pollo Tipakay
      [4, 2, 0.25], [4, 22, 0.05], [4, 24, 0.05], [4, 25, 0.03], [4, 13, 0.01],
      [4, 14, 0.03], [4, 15, 0.03], [4, 17, 0.005],
      
      // Wantán Frito (12 unidades)
      [5, 5, 0.15], [5, 11, 0.02], [5, 12, 0.005], [5, 14, 0.01], [5, 15, 0.1],
      [5, 19, 1],
      
      // Sopa Wantán
      [6, 5, 0.1], [6, 21, 0.03], [6, 23, 0.02], [6, 9, 0.3], [6, 14, 0.01],
      [6, 17, 0.005],
      
      // Tallarín con Camarones
      [10, 3, 0.25], [10, 6, 0.15], [10, 21, 0.05], [10, 22, 0.05], [10, 23, 0.03],
      [10, 24, 0.03], [10, 14, 0.03], [10, 15, 0.03]
    ];
  
    const insertMany = db.transaction((recetas) => {
      for (const r of recetas) stmt.run(r);
    });
  
    insertMany(recetas);
    console.log('[SEEDER] 45 recetas insertadas');
  }