export function seed(db) {
  console.log('[SEEDER] Insertando productos...');

  const stmt = db.prepare(`
    INSERT INTO productos (codigo, nombre, descripcion, precio, categoria_id, tiempo_preparacion_min, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const productos = [
    // 1: platos_principales
    ['P001', 'Arroz Chaufa Especial', 'Arroz frito con pollo, cerdo, camarones y verduras', 25.0, 1, 15, 1],
    ['P002', 'Tallarín Saltado de Pollo', 'Tallarines salteados con pollo y verduras', 18.0, 1, 15, 1],
    ['P003', 'Aeropuerto', 'Combinación de arroz chaufa y tallarín saltado', 22.0, 1, 20, 1],
    ['P004', 'Pollo Tipakay', 'Pollo en salsa de soja con vegetales', 20.0, 1, 20, 1],
    ['P005', 'Chijaukay', 'Pollo apanado con salsa agridulce', 22.0, 1, 20, 1],
    ['P006', 'Pato Pekín', 'Pato lacado con piel crujiente (1/2)', 45.0, 1, 30, 1],
    ['P007', 'Cerdo con Tamarindo', 'Cerdo en salsa de tamarindo', 21.0, 1, 20, 1],
    ['P008', 'Tallarín con Camarones', 'Tallarines con camarones y verduras', 28.0, 1, 20, 1],
    
    // 2: sopas
    ['S001', 'Sopa Wantán', 'Sopa con wantanes y verduras', 15.0, 2, 15, 1],
    ['S002', 'Sopa Wantán individual', '', 5.0, 2, 0, 1],

    // 3: entradas

    // 4: ensaladas

    // 5: postres

    // 6: bebidas
    ['B001', 'Inca Kola 500ml', 'Gaseosa sabor chicle', 5.0, 6, 0, 1],
    ['B002', 'Coca Cola 500ml', 'Gaseosa cola', 5.0, 6, 0, 1],
    ['B003', 'Agua Mineral 600ml', 'Agua sin gas', 3.0, 6, 0, 1],
    ['B004', 'Chicha Morada Jarra (1L)', 'Bebida de maíz morado', 8.0, 6, 0, 1],
    ['B005', 'Limonada Jarra (1L)', 'Limonada natural', 7.0, 6, 0, 1],

    // 7: infusiones
    ['I001', 'Té de Jazmín', 'Té chino tradicional', 3.0, 7, 0, 1],

    // 8: extras
    ['EX001', 'Wantán Frito', 'Masa rellena de carne frita (12 unidades)', 12.0, 8, 10, 1],
    ['EX002', 'Salsa de Aji', 'Salsa picante tradicional', 1.5, 8, 0, 1],
    ['EX003', 'Porción extra de arroz', '', 2.0, 8, 0, 1],
    ['EX004', 'Wantán Frito (4 und)', '', 4.0, 8, 0, 1],
  ];

  const insertMany = db.transaction((productos) => {
    for (const p of productos) stmt.run(p);
  });

  insertMany(productos);

  const cantProductos = productos.length;
  console.log(`[SEEDER] ${cantProductos} productos insertados`);
}
