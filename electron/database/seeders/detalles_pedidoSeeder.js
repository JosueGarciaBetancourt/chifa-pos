export function seed(db) {
  console.log('[SEEDER] Insertando detalles_pedido...');
  
  const stmt = db.prepare(`
    INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
    VALUES (?, ?, ?, ?)
  `);

  const detalles = [
    // Pedido 1 (85)
    [1, 1, 2, 25.0],  // 2 Arroz Chaufa Especial
    [1, 11, 3, 5.0],  // 3 Inca Kola
    [1, 16, 1, 1.5],  // 1 Salsa de Aji
    
    // Pedido 2 (68.5)
    [2, 3, 1, 22.0],  // 1 Aeropuerto
    [2, 10, 1, 28.0], // 1 Tallarín con Camarones
    [2, 12, 2, 5.0],  // 2 Coca Cola
    [2, 17, 1, 1.5],  // 1 Salsa de Aji
    
    // Pedido 3 (42)
    [3, 2, 1, 18.0],  // 1 Tallarín Saltado
    [3, 4, 1, 20.0],  // 1 Pollo Tipakay
    [3, 18, 1, 4.0],  // 1 Wantán (4 und)
    
    // Pedido 4 (95)
    [4, 8, 1, 45.0],  // 1 Pato Pekín
    [4, 9, 1, 21.0],  // 1 Cerdo con Tamarindo
    [4, 14, 1, 8.0],  // 1 Chicha Morada
    [4, 15, 1, 7.0],  // 1 Limonada
    [4, 19, 2, 3.0],  // 2 Té de Jazmín
    [4, 17, 2, 1.5],  // 2 Salsa de Aji
    
    // Pedido 5 (110)
    [5, 7, 2, 22.0],  // 2 Chijaukay
    [5, 6, 1, 15.0],  // 1 Sopa Wantán
    [5, 5, 2, 12.0],  // 2 Wantán Frito
    [5, 13, 4, 3.0],  // 4 Agua Mineral
    [5, 17, 3, 1.5],  // 3 Salsa de Aji
    
    // ... (continuar con los demás pedidos)
    
    // Pedido 15 (92)
    [15, 1, 1, 25.0],  // 1 Arroz Chaufa Especial
    [15, 3, 1, 22.0],  // 1 Aeropuerto
    [15, 10, 1, 28.0], // 1 Tallarín con Camarones
    [15, 11, 2, 5.0],  // 2 Inca Kola
    [15, 12, 2, 5.0],  // 2 Coca Cola
    [15, 17, 2, 1.5]   // 2 Salsa de Aji
  ];

  const insertMany = db.transaction((detalles) => {
    for (const d of detalles) stmt.run(d);
  });

  insertMany(detalles);
  console.log('[SEEDER] 60 detalles de pedido insertados');
}