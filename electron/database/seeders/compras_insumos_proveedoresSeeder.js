export function seed(db) {
  console.log('[SEEDER] Insertando compras_insumos_proveedores...');

  const stmt = db.prepare(`
    INSERT INTO compras_insumos_proveedores (
      id,
      insumo_id,
      proveedor_id,
      cantidad,
      costo_unitario,
      fecha,
      usuario_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const compras_insumos_proveedores = [
    [1, 1, 2, 10, 3.50, '2023-07-01 12:45:00', 1],
    [2, 2, 3, 5, 7.80, '2023-07-01 14:00:00', 2],
    [3, 3, 2, 20, 1.20, '2023-07-02 13:20:00', 1],
    [4, 1, 4, 8, 4.00, '2023-07-03 09:15:00', 2],
    [5, 2, 5, 12, 6.00, '2023-07-04 18:00:00', 1]
  ];

  const insertMany = db.transaction((compras_insumos_proveedores) => {
    for (const cip of compras_insumos_proveedores) stmt.run(cip);
  });

  insertMany(compras_insumos_proveedores);
  console.log(`[SEEDER] ${compras_insumos_proveedores.length} compras_insumos_proveedores insertadas`);
}
