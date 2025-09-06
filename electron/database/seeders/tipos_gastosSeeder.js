export function seed(db) {
  console.log('[SEEDER] Insertando tipos_gastos...');

  const stmt = db.prepare(`
    INSERT INTO tipos_gastos (id, nombre, descripcion, activo)
    VALUES (?, ?, ?, ?)
  `);

  const tiposGastos = [
    [1, 'Compras insumos', 'Compras a proveedores que alimentan el inventario (ingredientes, bebidas, empaques)', 1],
    [2, 'Servicios', 'Gastos de servicios como agua, luz, internet', 1],
    [3, 'Mantenimiento', 'Reparaciones y mantenimiento de equipos o local', 1],
    [4, 'Transporte', 'Gastos de movilidad y transporte', 1],
    [5, 'Otros', 'Gastos varios no clasificados', 1],
    [6, 'Tipos Gasto Inactivos', '...', 0]
  ];

  const insertMany = db.transaction((tiposGastos) => {
    for (const tg of tiposGastos) stmt.run(tg);
  });

  insertMany(tiposGastos);
  console.log(`[SEEDER] ${tiposGastos.length} tipos_gastos insertados`);
}
