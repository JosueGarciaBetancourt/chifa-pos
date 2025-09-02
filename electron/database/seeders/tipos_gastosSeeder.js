export function seed(db) {
  console.log('[SEEDER] Insertando tipos_gastos...');

  const stmt = db.prepare(`
    INSERT INTO tipos_gastos (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const tiposGastos = [
    [1, 'Compras insumos', 'Compras a proveedores que alimentan el inventario (ingredientes, bebidas, empaques)'],
    [2, 'Servicios', 'Gastos de servicios como agua, luz, internet'],
    [3, 'Mantenimiento', 'Reparaciones y mantenimiento de equipos o local'],
    [4, 'Transporte', 'Gastos de movilidad y transporte'],
    [5, 'Otros', 'Gastos varios no clasificados']
  ];

  const insertMany = db.transaction((tiposGastos) => {
    for (const tg of tiposGastos) stmt.run(tg);
  });

  insertMany(tiposGastos);
  console.log(`[SEEDER] ${tiposGastos.length} tipos_gastos insertados`);
}
