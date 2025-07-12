export function seed(db) {
  console.log('[SEEDER] Insertando proveedores...');

  const stmt = db.prepare(`
    INSERT INTO proveedores (
      id,
      nombre,
      ruc,
      correo,
      telefono
    ) VALUES (?, ?, ?, ?, ?)
  `);

  const proveedores = [
    [1, 'Distribuidora S.A.',        '20123456789', 'contacto@distribuidora.com',    '987654321'],
    [2, 'Abarrotes El Buen Precio',  '20456789123', 'ventas@buenprecio.com',         '912345678'],
    [3, 'Lácteos Andinos',           '20678912345', 'info@lacteosandinos.pe',        '934567890'],
    [4, 'Carnes Selectas SAC',       '20987654321', 'carnes@selectas.pe',            '956781234'],
    [5, 'Verduras Frescas',          '20876543210', 'pedidos@verdurasfrescas.com',   '978901234'],
    [6, 'Panadería La Delicia',      '20345678901', 'la.delicia@panaderia.com',      '990123456'],
    [7, 'Pescadería El Mar Azul',    '20765432109', 'contacto@marazul.com',          '901234567'],
    [8, 'Insumos Gastronómicos SAC', '20234567890', 'ventas@insumosgastronomicos.pe','912345600']
  ];

  const insertMany = db.transaction((proveedores) => {
    for (const p of proveedores) stmt.run(p);
  });

  insertMany(proveedores);
  console.log(`[SEEDER] ${proveedores.length} proveedores insertados`);
}
