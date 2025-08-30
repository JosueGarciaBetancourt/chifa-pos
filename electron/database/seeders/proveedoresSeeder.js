export function seed(db) {
  console.log('[SEEDER] Insertando proveedores...');

  const stmt = db.prepare(`
    INSERT INTO proveedores (
      id,
      nombre,
      ruc,
      correo,
      telefono,
      direccion,
      activo
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

   const proveedores = [
    [1, 'Distribuidora S.A.',        '20123456789', 'contacto@distribuidora.com',    '987654321', 'Av. Industrial 123, Lima', 1],
    [2, 'Abarrotes El Buen Precio',  '20456789123', 'ventas@buenprecio.com',         '912345678', 'Jr. Comercio 456, Arequipa', 1],
    [3, 'Lácteos Andinos',           '20678912345', 'info@lacteosandinos.pe',        '934567890', 'Calle Lechería 789, Cusco', 1],
    [4, 'Carnes Selectas SAC',       '20987654321', 'carnes@selectas.pe',            '956781234', 'Av. Ganadera 321, Trujillo', 1],
    [5, 'Verduras Frescas',          '20876543210', 'pedidos@verdurasfrescas.com',   '978901234', 'Mercado Central, Puesto 12, Lima', 1],
    [6, 'Panadería La Delicia',      '20345678901', 'la.delicia@panaderia.com',      '990123456', 'Av. Panificadora 654, Chiclayo', 1],
    [7, 'Pescadería El Mar Azul',    '20765432109', 'contacto@marazul.com',          '901234567', 'Mercado de Pescados, Callao', 1],
    [8, 'Insumos Gastronómicos SAC', '20234567890', 'ventas@insumosgastronomicos.pe','912345600', 'Av. Gastronomía 852, Lima', 1],
    [9, 'PROVEEDOR NO ACTIVO',       '20234567665', 'proveedor@noactivo.com',        '912345666', 'Dirección desconocida', 0],
    [10, 'Mercado Local',            null,          null,                             null,        'Esquina de arriba', 1]
  ];

  const insertMany = db.transaction((proveedores) => {
    for (const p of proveedores) stmt.run(p);
  });

  insertMany(proveedores);
  console.log(`[SEEDER] ${proveedores.length} proveedores insertados`);
}
