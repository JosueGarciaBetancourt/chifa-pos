export function seed(db) {
  console.log('[SEEDER] Insertando compras_insumos_proveedores...');

  const stmt = db.prepare(`
    INSERT INTO compras_insumos_proveedores (
      id,
      insumo_proveedor_id,
      cantidad,
      costo_unitario_real,
      fecha,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const compras_insumos_proveedores = [
    [1, 1, 10, 3.50, '2023-07-01 12:45:00', 1],  // arroz - proveedor 1
    [2, 7, 5, 7.80, '2023-07-01 14:00:00', 2],   // pollo - proveedor 4
    [3, 2, 20, 3.30, '2023-07-02 13:20:00', 1],  // arroz - proveedor 2
    [4, 34, 8, 5.00, '2023-07-03 09:15:00', 2],  // aceite - proveedor 8
    [5, 10, 12, 7.00, '2023-07-04 18:00:00', 1], // camarón - proveedor 7
    [6, 3, 15, 5.20, '2023-07-05 10:30:00', 1],  // fideos - proveedor 2
    [7, 8, 6, 27.50, '2023-07-06 11:10:00', 2],  // carne de res - proveedor 4
    [8, 5, 12, 11.80, '2023-07-07 09:45:00', 1], // wantán - proveedor 2
    [9, 21, 8, 5.50, '2023-07-07 15:20:00', 2],  // ají amarillo - proveedor 5
    [10, 23, 10, 4.80, '2023-07-08 13:15:00', 1],// brotes de soya - proveedor 5
    [11, 24, 15, 4.20, '2023-07-08 16:50:00', 2],// cebolla china - proveedor 5
    [12, 15, 6, 6.80, '2023-07-09 09:10:00', 1], // ajo - proveedor 8
    [13, 16, 4, 8.70, '2023-07-09 17:25:00', 2], // jengibre - proveedor 8
    [14, 11, 180, 0.40, '2023-07-10 08:40:00', 1],// huevos - proveedor 4
    [15, 28, 3, 11.50, '2023-07-11 19:05:00', 2],// champiñones - proveedor 5
    [16, 29, 2, 14.50, '2023-07-12 14:10:00', 1],// espárragos - proveedor 5
    [17, 33, 5, 8.20, '2023-07-13 10:30:00', 2], // sillao - proveedor 8
    [18, 35, 4, 6.30, '2023-07-14 11:00:00', 1], // vinagre - proveedor 8
    [19, 36, 6, 4.70, '2023-07-15 12:20:00', 2], // piña - proveedor 5
    [20, 37, 8, 6.20, '2023-07-15 18:40:00', 1], // duraznos - proveedor 5
    [21, 38, 7, 6.50, '2023-07-16 09:35:00', 2], // tamarindo - proveedor 5
    [22, 39, 2, 24.00, '2023-07-17 15:55:00', 1],// lychee - proveedor 8
    [23, 41, 3, 17.50, '2023-07-18 11:45:00', 2],// castañas amazónicas - proveedor 8
    [24, 42, 2, 19.50, '2023-07-18 17:25:00', 1],// castañas de cajú - proveedor 8
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) stmt.run(row);
  });

  insertMany(compras_insumos_proveedores);
  console.log(`[SEEDER] ${compras_insumos_proveedores.length} compras_insumos_proveedores insertadas`);
}
