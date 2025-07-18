export function seed(db) {
  console.log('[SEEDER] Insertando compras_insumos_proveedores...');

  const stmt = db.prepare(`
    INSERT INTO compras_insumos_proveedores (
      id,
      insumo_proveedor_id,
      cantidad,
      costo_unitario,
      fecha,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const compras_insumos_proveedores = [
    [1, 1, 10, 3.50, '2023-07-01 12:45:00', 1],  // arroz - proveedor 1 (Distribuidora S.A.)
    [2, 7, 5, 7.80, '2023-07-01 14:00:00', 2],   // pollo - proveedor 4 (Carnes Selectas SAC)
    [3, 2, 20, 3.30, '2023-07-02 13:20:00', 1],  // arroz - proveedor 2 (Buen Precio)
    [4, 34, 8, 5.00, '2023-07-03 09:15:00', 2],  // aceite - proveedor 8 (Insumos Gastronómicos)
    [5, 10, 12, 7.00, '2023-07-04 18:00:00', 1]  // camarón - proveedor 7 (El Mar Azul)
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) stmt.run(row);
  });

  insertMany(compras_insumos_proveedores);
  console.log(`[SEEDER] ${compras_insumos_proveedores.length} compras_insumos_proveedores insertadas`);
}
