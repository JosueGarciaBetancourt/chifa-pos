export function seed(db) {
  console.log('[SEEDER] Insertando clientes...');

  const stmt = db.prepare(`
    INSERT INTO clientes (
      dni,
      digitoVerificador,
      nombre,
      apellido,
      direccion,
      telefono,
      verificado_reniec
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const clientes = [
    // Cliente genérico sin DNI ni DV (id: 1)
    [null, null, 'Cliente', 'Generico', null, null, 0],

    // Clientes simulados
    ['12345678', 4, 'Juan', 'Perez', 'Av. Siempre Viva 123', '987654321', 1],
    ['87654321', 9, 'Maria', 'Lopez', 'Calle Falsa 123', '912345678', 1],
    ['45678912', 7, 'Carlos', 'Sanchez', 'Jr. Lima 456', '934567890', 1],
    ['78912345', 2, 'Lucia', 'Torres', 'Av. Arequipa 789', '956781234', 0], // Lo ingreso manualmente el cajero
    ['32165487', 3, 'Roberto', 'Gomez', 'Calle Trujillo 101', '978901234', 1],
    ['65498712', 1, 'Sofia', 'Ruiz', 'Urb. Las Gardenias 222', '990123456', 1],
    ['14725836', 6, 'Miguel', 'Vasquez', 'Av. Brasil 333', '901234567', 0],
    ['25836914', 8, 'Elena', 'Diaz', 'Calle Los Alamos 444', '912345600', 1],
    ['36914725', 5, 'Oscar', 'Ramirez', 'Jr. Union 555', '923456789', 1],
    ['74185296', 0, 'Carmen', 'Flores', 'Av. La Marina 666', '934567801', 0],
    ['85296374', 2, 'Raul', 'Castro', 'Calle Los Pinos 777', '945678912', 1],
    ['96385274', 4, 'Patricia', 'Mendoza', 'Urb. Los Rosales 888', '956789123', 1],
    ['15935728', 3, 'Fernando', 'Ortega', 'Av. Javier Prado 999', '967890234', 1],
    ['35715926', 1, 'Daniela', 'Silva', 'Calle Las Orquideas 1010', '978901345', 0]
  ];

  const insertMany = db.transaction((clientes) => {
    for (const c of clientes) stmt.run(c);
  });

  insertMany(clientes);

  console.log(`[SEEDER] ${clientes.length} clientes insertados`);
}
