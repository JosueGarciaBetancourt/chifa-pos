export function seed(db) {
  console.log('[SEEDER] Insertando productos...');

  const stmt = db.prepare(`
    INSERT INTO productos (id, codigo, nombre, descripcion, precio, categoria_id, tiempo_preparacion_min, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const productos = [
    // 1: platos_principales
    [1, 'P001', 'Arroz Chaufa Especial', 'Arroz frito con pollo, cerdo, camarones y verduras', 25.0, 1, 15, 1],
    [2, 'P002', 'Tallarín Saltado de Pollo', 'Tallarines salteados con pollo y verduras', 18.0, 1, 15, 1],
    [3, 'P003', 'Aeropuerto', 'Combinación de arroz chaufa y tallarín saltado', 22.0, 1, 20, 1],
    [4, 'P004', 'Pollo Tipakay', 'Pollo en salsa de soja con vegetales', 20.0, 1, 20, 1],
    [5, 'P005', 'Chijaukay', 'Pollo apanado con salsa agridulce', 22.0, 1, 20, 1],
    [6, 'P006', 'Pato Pekín', 'Pato lacado con piel crujiente (1/2)', 45.0, 1, 30, 1],
    [7, 'P007', 'Cerdo con Tamarindo', 'Cerdo en salsa de tamarindo', 21.0, 1, 20, 1],
    [8, 'P008', 'Tallarín con Camarones', 'Tallarines con camarones y verduras', 28.0, 1, 20, 1],
    [9, 'P009', 'Chancho asado con tamarindo', 'Carne de cerdo con salsa dulce de tamarindo', 17.00, 1, 20, 1],
    [10, 'P010', 'Chancho asado con piña', 'Carne de cerdo con piña en salsa dulce', 19.00, 1, 20, 1],
    [11, 'P011', 'Chancho asado con verduras', 'Cerdo salteado con vegetales orientales', 17.00, 1, 20, 1],
    [12, 'P012', 'Chancho al ajo', 'Cerdo cocinado con ajo y especias orientales', 17.00, 1, 20, 1],
    [13, 'P013', 'Tallarín saltado de pollo', '', 14.00, 1, 15, 1],
    [14, 'P014', 'Tallarín con pollo, verduras y champiñones', '', 17.00, 1, 15, 1],
    [15, 'P015', 'Tallarín con pollo en salsa curry', '', 15.00, 1, 15, 1],
    [16, 'P016', 'Tallarín saltado con chancho asado', '', 15.00, 1, 15, 1],
    [17, 'P017', 'Tallarín saltado con res', '', 14.00, 1, 15, 1],
    [18, 'P018', 'Tallarín tres delicias', '(pollo, chancho, champiñones)', 16.00, 1, 15, 1],
    [19, 'P019', 'Aeropuerto de pollo', '', 12.00, 1, 15, 1],
    [20, 'P020', 'Chaufa de pollo', '', 12.00, 1, 15, 1],
    [21, 'P021', 'Chaufa de champiñones y frejolitos', '', 12.00, 1, 15, 1],
    [22, 'P022', 'Chaufa vegetariano', '', 12.00, 1, 15, 1],
    [23, 'P023', 'Chaufa de res', '', 13.00, 1, 15, 1],
    [24, 'P024', 'Chaufa de chancho', '', 14.00, 1, 15, 1],
    [25, 'P025', 'Chaufa especial', '', 15.00, 1, 15, 1],
    [26, 'P026', 'Chaufa samsen', '(pollo, res, chancho)', 16.00, 1, 15, 1],

    // 2: sopas
    [27, 'S001', 'Sopa Wantán', 'Sopa con wantanes y verduras', 15.0, 2, 15, 1],
    [28, 'S002', 'Sopa Wantán individual', '', 5.0, 2, 0, 1],
    [29, 'S003', 'Sopa de pollo con verduras', '', 11.00, 2, 10, 1],
    [30, 'S004', 'Sopa de pollo con huevitos de codorniz', '', 13.00, 2, 10, 1],
    [31, 'S005', 'Sopa de pollo kion', '', 11.00, 2, 10, 1],
    [32, 'S006', 'Sopa de pollo con fansi', '(fideo chino)', 14.00, 2, 10, 1],
    [33, 'S007', 'Sopa de pollo con fideo sahofán', '(fideo de arroz)', 13.00, 2, 10, 1],
    [34, 'S008', 'Sopa pac poo', '(chancho, pollo, hongos chinos y fansi)', 18.00, 2, 12, 1],
    [35, 'S009', 'Sopa fuchifu', '', 12.00, 2, 10, 1],
    [36, 'S010', 'Sopa sustancia de res', '', 14.00, 2, 10, 1],
    [37, 'S011', 'Sopa de pollo con espárragos', '', 13.00, 2, 10, 1],

    // 6: bebidas
    [38, 'B001', 'Inca Kola 500ml', 'Gaseosa sabor chicle', 5.0, 6, 0, 1],
    [39, 'B002', 'Coca Cola 500ml', 'Gaseosa cola', 5.0, 6, 0, 1],
    [40, 'B003', 'Agua Mineral 600ml', 'Agua sin gas', 3.0, 6, 0, 1],
    [41, 'B004', 'Chicha Morada Jarra (1L)', 'Bebida de maíz morado', 8.0, 6, 0, 1],
    [42, 'B005', 'Limonada Jarra (1L)', 'Limonada natural', 7.0, 6, 0, 1],

    // 7: infusiones
    [43, 'I001', 'Té de Jazmín', 'Té chino tradicional', 3.0, 7, 0, 1],

    // 8: extras
    [44, 'EX001', 'Wantán Frito', 'Masa rellena de carne frita (12 unidades)', 12.0, 8, 10, 1],
    [45, 'EX002', 'Salsa de Aji', 'Salsa picante tradicional', 1.5, 8, 0, 1],
    [46, 'EX003', 'Porción extra de arroz', '', 2.0, 8, 0, 1],
    [47, 'EX004', 'Wantán Frito (4 und)', '', 4.0, 8, 0, 1],
    [48, 'EX005', 'Arroz blanco (porción)', '', 3.00, 8, 0, 1],
    [49, 'EX006', 'Nabo encurtido', '', 5.00, 8, 0, 1],
    [50, 'EX007', 'Huevitos de codorniz (porción)', '', 4.00, 8, 0, 1],

    // 9: combos
    [51, 'C001', 'Combo Chaufa + Gaseosa', 'Arroz chaufa especial + gaseosa de 500ml', 28.0, 9, 15, 1],
    [52, 'C002', 'Combo Tallarín Saltado + Inca Kola', 'Tallarín saltado de pollo + Inca Kola 500ml', 25.0, 9, 15, 1],
    [53, 'C003', 'Combo Wantán + Chaufa + Bebida', 'Wantán frito (6 und) + chaufa de pollo + gaseosa', 30.0, 9, 20, 1],
    [54, 'C004', 'Combo Pareja Oriental', 'Chaufa especial + Tallarín tres delicias + 2 bebidas', 50.0, 9, 20, 1],
    [55, 'C005', 'Combo Ejecutivo', 'Tallarín + sopa individual + gaseosa', 26.0, 9, 18, 1],
    [56, 'C006', 'Combo Chancho Asado + Wantán', 'Chancho asado + wantán frito + bebida', 29.0, 9, 20, 1],
    [57, 'C007', 'Combo Familiar (3 personas)', '2 chaufa + 1 sopa wantán completa + 3 bebidas', 75.0, 9, 25, 1],
    [58, 'C008', 'Combo Vegetariano', 'Chaufa vegetariano + sopa de verduras + bebida', 24.0, 9, 18, 1],
    [59, 'C009', 'Combo Pollo Curry + Entrada', 'Tallarín con pollo en salsa curry + wantán frito (4 und)', 26.0, 9, 18, 1],
    [60, 'C010', 'Combo Niño Feliz', 'Chaufa de pollo + jugo natural + postre pequeño', 22.0, 9, 15, 1],
  ];

  const insertMany = db.transaction((productos) => {
    for (const p of productos) stmt.run(p);
  });

  insertMany(productos);
  console.log(`[SEEDER] ${productos.length} productos insertados`);
}
