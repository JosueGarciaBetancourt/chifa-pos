export function seed(db) {
  console.log('[SEEDER] Insertando productos...');
  
  const stmt = db.prepare(`
    INSERT INTO productos (codigo, nombre, descripcion, precio, categoria, tiempo_preparacion, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const productos = [
    ['P001', 'Arroz Chaufa Especial', 'Arroz frito con pollo, cerdo, camarones y verduras', 25.0, 'comida', 15, 1],
    ['P002', 'Tallarín Saltado de Pollo', 'Tallarines salteados con pollo y verduras', 18.0, 'comida', 15, 1],
    ['P003', 'Aeropuerto', 'Combinación de arroz chaufa y tallarín saltado', 22.0, 'comida', 20, 1],
    ['P004', 'Pollo Tipakay', 'Pollo en salsa de soja con vegetales', 20.0, 'comida', 20, 1],
    ['P005', 'Wantán Frito', 'Masa rellena de carne frita (12 unidades)', 12.0, 'comida', 10, 1],
    ['P006', 'Sopa Wantán', 'Sopa con wantanes y verduras', 15.0, 'comida', 15, 1],
    ['P007', 'Chijaukay', 'Pollo apanado con salsa agridulce', 22.0, 'comida', 20, 1],
    ['P008', 'Pato Pekín', 'Pato lacado con piel crujiente (1/2)', 45.0, 'comida', 30, 1],
    ['P009', 'Cerdo con Tamarindo', 'Cerdo en salsa de tamarindo', 21.0, 'comida', 20, 1],
    ['P010', 'Tallarín con Camarones', 'Tallarines con camarones y verduras', 28.0, 'comida', 20, 1],
    ['B001', 'Inca Kola 500ml', 'Gaseosa sabor vainilla', 5.0, 'bebida', 0, 1],
    ['B002', 'Coca Cola 500ml', 'Gaseosa cola', 5.0, 'bebida', 0, 1],
    ['B003', 'Agua Mineral 600ml', 'Agua sin gas', 3.0, 'bebida', 0, 1],
    ['B004', 'Chicha Morada Jarra', 'Bebida de maíz morado (1L)', 8.0, 'bebida', 0, 1],
    ['B005', 'Limonada Jarra', 'Limonada natural (1L)', 7.0, 'bebida', 0, 1],
    ['E001', 'Salsa de Aji', 'Salsa picante tradicional', 1.5, 'extras', 0, 1],
    ['E002', 'Porción extra de arroz', '', 2.0, 'extras', 0, 1],
    ['E003', 'Wantán Frito (4 und)', '', 4.0, 'extras', 0, 1],
    ['E004', 'Sopa Wantán individual', '', 5.0, 'extras', 0, 1],
    ['E005', 'Té de Jazmín', 'Té chino tradicional', 3.0, 'extras', 0, 1]
  ];

  const insertMany = db.transaction((productos) => {
    for (const p of productos) stmt.run(p);
  });

  insertMany(productos);
  console.log('[SEEDER] 20 productos insertados');
}