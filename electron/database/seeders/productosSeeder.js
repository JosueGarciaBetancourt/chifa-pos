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
    ['P009', 'Chancho asado con tamarindo', 'Carne de cerdo con salsa dulce de tamarindo', 17.00, 1, 20, 1],
    ['P010', 'Chancho asado con piña', 'Carne de cerdo con piña en salsa dulce', 19.00, 1, 20, 1],
    ['P011', 'Chancho asado con verduras', 'Cerdo salteado con vegetales orientales', 17.00, 1, 20, 1],
    ['P012', 'Chancho al ajo', 'Cerdo cocinado con ajo y especias orientales', 17.00, 1, 20, 1],
    ['P013', 'Tallarín saltado de pollo', '', 14.00, 1, 15, 1],
    ['P014', 'Tallarín con pollo, verduras y champiñones', '', 17.00, 1, 15, 1],
    ['P015', 'Tallarín con pollo en salsa curry', '', 15.00, 1, 15, 1],
    ['P016', 'Tallarín saltado con chancho asado', '', 15.00, 1, 15, 1],
    ['P017', 'Tallarín saltado con res', '', 14.00, 1, 15, 1],
    ['P018', 'Tallarín tres delicias', '(pollo, chancho, champiñones)', 16.00, 1, 15, 1],
    ['P019', 'Aeropuerto de pollo', '', 12.00, 1, 15, 1],
    ['P020', 'Chaufa de pollo', '', 12.00, 1, 15, 1],
    ['P021', 'Chaufa de champiñones y frejolitos', '', 12.00, 1, 15, 1],
    ['P022', 'Chaufa vegetariano', '', 12.00, 1, 15, 1],
    ['P023', 'Chaufa de res', '', 13.00, 1, 15, 1],
    ['P024', 'Chaufa de chancho', '', 14.00, 1, 15, 1],
    ['P025', 'Chaufa especial', '', 15.00, 1, 15, 1],
    ['P026', 'Chaufa samsen', '(pollo, res, chancho)', 16.00, 1, 15, 1],

    // 2: sopas
    ['S001', 'Sopa Wantán', 'Sopa con wantanes y verduras', 15.0, 2, 15, 1],
    ['S002', 'Sopa Wantán individual', '', 5.0, 2, 0, 1],
    ['S003', 'Sopa de pollo con verduras', '', 11.00, 2, 10, 1],
    ['S004', 'Sopa de pollo con huevitos de codorniz', '', 13.00, 2, 10, 1],
    ['S005', 'Sopa de pollo kion', '', 11.00, 2, 10, 1],
    ['S006', 'Sopa de pollo con fansi', '(fideo chino)', 14.00, 2, 10, 1],
    ['S007', 'Sopa de pollo con fideo sahofán', '(fideo de arroz)', 13.00, 2, 10, 1],
    ['S008', 'Sopa pac poo', '(chancho, pollo, hongos chinos y fansi)', 18.00, 2, 12, 1],
    ['S009', 'Sopa fuchifu', '', 12.00, 2, 10, 1],
    ['S010', 'Sopa sustancia de res', '', 14.00, 2, 10, 1],
    ['S011', 'Sopa de pollo con espárragos', '', 13.00, 2, 10, 1],
    
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
    ['EX005', 'Arroz blanco (porción)', '', 3.00, 8, 0, 1],
    ['EX006', 'Nabo encurtido', '', 5.00, 8, 0, 1],
    ['EX007', 'Huevitos de codorniz (porción)', '', 4.00, 8, 0, 1],
  ];

  const insertMany = db.transaction((productos) => {
    for (const p of productos) stmt.run(p);
  });

  insertMany(productos);
  console.log(`[SEEDER] ${productos.length} productos insertados`);
}
