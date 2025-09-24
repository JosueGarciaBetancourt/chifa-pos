export function seed(db) {
  console.log('[SEEDER] Insertando insumos_proveedores...');

  const stmt = db.prepare(`
    INSERT INTO insumos_proveedores (
      id, insumo_id, proveedor_id, descripcion, 
      costo_unitario_pactado, stock_por_proveedor, observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insumos_proveedores = [
    // Granos (Arroz tiene 50kg -> repartido entre 2 proveedores)
    [1, 1, 1, 'Arroz Extra Superior Costeño 50kg', 4.20, 25, 'Proveedor habitual de arroz (kg)'],
    [2, 1, 2, 'Arroz Paisana Premium 25kg', 4.00, 25, 'Precio más bajo en cantidades grandes (kg)'],

    // Fideos (40kg totales -> proveedor 2)
    [3, 3, 2, 'Fideos Don Vittorio Espagueti 500g', 5.50, 40, 'Fideos al por mayor (kg)'],

    // Wantán (200 unidades -> proveedor 2)
    [4, 33, 2, 'Wantán Marca Wong x100 unidades', 0.25, 200, 'Wantán de buena calidad (unidad)'],

    // Fansi (10kg -> proveedor 8)
    [5, 34, 8, 'Fansi Fideos Chinos Importados 1kg', 12.00, 10, 'Fideos chinos importados (kg)'],

    // Sahofán (10kg -> proveedor 8)
    [6, 35, 8, 'Sahofán Premium Asiático 500g', 14.00, 10, 'Proveedor exclusivo de sahofán (kg)'],

    // Carnes y proteínas
    [7, 2, 4, 'Pollo Entero Fresco San Fernando', 9.80, 30, 'Pollo fresco todas las semanas (kg)'],
    [8, 4, 4, 'Carne de Res Lomo Premium A1', 28.00, 25, 'Carne de res de alta calidad (kg)'],
    [9, 5, 4, 'Cerdo Pierna Nacional Fresco', 18.00, 20, 'Cortes de cerdo nacionales (kg)'],
    [10, 6, 7, 'Camarón Langostino Jumbo 16/20', 35.00, 15, 'Camarones importados (kg)'],
    [11, 7, 4, 'Huevos Frescos Pardos AA x30', 0.45, 300, 'Huevos frescos cada dos días (unidad)'],

    // Bebidas
    [12, 8, 1, 'Jarabe Concentrado Chicha Morada', 0.02, 5000, 'Proveedor de jarabe (ml)'],
    [13, 9, 1, 'Pulpa Natural Maracuyá Congelada', 0.03, 3000, 'Distribución directa de pulpa de maracuyá (ml)'],
    [14, 10, 1, 'Hierbaluisa Deshidratada Premium', 0.10, 200, 'Hojas de hierbaluisa (g)'],

    // Condimentos
    [15, 13, 8, 'Ajo Pelado Importado China 1kg', 7.00, 8, 'Ajo fresco importado (kg)'],
    [16, 14, 8, 'Jengibre Fresco Nacional Selecto', 9.00, 5, 'Jengibre en buenas condiciones (kg)'],
    [17, 18, 2, 'Sal Marina Emsal Refinada 1kg', 1.50, 15, 'Sal a granel (kg)'],
    [18, 19, 8, 'Pimienta Negra Molida McCormick', 0.05, 1000, 'Pimienta molida en grandes cantidades (g)'],
    [19, 32, 8, 'Mix Especias Orientales Importadas', 0.08, 500, 'Especias exóticas (g)'],
    [20, 41, 8, 'Polvo 5 Especias Chinas Auténtico', 0.10, 300, 'Polvo importado de 5 sabores (g)'],

    // Vegetales
    [21, 11, 5, 'Ají Amarillo Fresco Nacional 1kg', 6.00, 10, 'Ají amarillo fresco (kg)'],
    [22, 12, 5, 'Cebolla Roja Nacional Seleccionada', 3.50, 25, 'Verduras frescas todos los días (kg)'],
    [23, 20, 5, 'Brotes Soya Frescos Hidropónicos', 5.00, 15, 'Suministro de brotes de soya (kg)'],
    [24, 21, 5, 'Cebolla China Verde Fresca', 4.50, 12, 'Proveedor confiable de cebolla china (kg)'],
    [25, 22, 5, 'Tomate Italiano Maduro Premium', 4.00, 18, 'Tomates de estación (kg)'],
    [26, 23, 5, 'Zanahoria Naranja Baby Nacional', 2.80, 15, 'Zanahorias nacionales (kg)'],
    [27, 24, 5, 'Vainitas Verdes Tiernas Frescas', 6.50, 10, 'Vainitas frescas (kg)'],
    [28, 25, 5, 'Champiñones Portobello Frescos', 12.00, 8, 'Champiñones seleccionados (kg)'],
    [29, 27, 5, 'Espárragos Verdes Jumbo Peruanos', 15.00, 6, 'Espárragos peruanos (kg)'],
    [30, 36, 8, 'Hongos Shiitake Deshidratados', 20.00, 5, 'Hongos chinos importados (kg)'],
    [31, 38, 5, 'Espinaca Baby Orgánica Fresca', 6.50, 6, 'Espinaca fresca (kg)'],
    [32, 40, 5, 'Nabo Blanco Encurtido Asiático', 8.00, 5, 'Nabo encurtido (kg)'],

    // Salsas y líquidos
    [33, 15, 8, 'Sillao Kikoman Premium 1L', 9.00, 10, 'Sillao clásico (l)'],
    [34, 16, 8, 'Aceite Vegetal Primor Girasol 1L', 8.50, 20, 'Aceite para cocina a buen precio (l)'],
    [35, 17, 8, 'Vinagre Blanco Tinto Importado 1L', 7.00, 8, 'Vinagre importado (l)'],

    // Frutas
    [36, 26, 5, 'Piña Golden MD2 Premium Costa Rica', 5.00, 10, 'Piñas frescas (kg)'],
    [37, 30, 5, 'Durazno Blanquillo Nacional Dulce', 6.50, 6, 'Duraznos de temporada (kg)'],
    [38, 31, 5, 'Tamarindo Dulce Amazónico Natural', 7.00, 4, 'Tamarindo para jugos (kg)'],
    [39, 37, 8, 'Lychee Fresco Importado Tailandia', 25.00, 3, 'Lychee importado de Asia (kg)'],
    [40, 39, 5, 'Mix Frutas Tropicales Estación', 9.00, 10, 'Frutas mixtas para jugos (kg)'],

    // Frutos secos y semillas
    [41, 28, 8, 'Castañas Amazónicas Tostadas 500g', 18.00, 5, 'Castañas amazónicas (kg)'],
    [42, 29, 8, 'Castañas Cajú Premium Saladas', 20.00, 5, 'Castañas de cajú para cocina oriental (kg)'],
  ];

  const insertMany = db.transaction((rows) => {
    for (const ip of rows) stmt.run(ip);
  });

  insertMany(insumos_proveedores);
  console.log(`[SEEDER] ${insumos_proveedores.length} insumos_proveedores insertados`);
}
