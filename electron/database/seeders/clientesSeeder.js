export function seed(db) {
  console.log('[SEEDER] Insertando clientes...');
  
  const stmt = db.prepare(`
    INSERT INTO clientes (dni, nombre, apellido, direccion, telefono, verificado_reniec)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const clientes = [
    ['12345678', 'Juan', 'Perez', 'Av. Siempre Viva 123', '987654321', 1],
    [null, 'Cliente', 'Generico', null, null, 0],
    ['87654321', 'Maria', 'Lopez', 'Calle Falsa 123', '912345678', 1],
    ['45678912', 'Carlos', 'Sanchez', 'Jr. Lima 456', '934567890', 1],
    ['78912345', 'Lucia', 'Torres', 'Av. Arequipa 789', '956781234', 0],
    ['32165487', 'Roberto', 'Gomez', 'Calle Trujillo 101', '978901234', 1],
    ['65498712', 'Sofia', 'Ruiz', 'Urb. Las Gardenias 222', '990123456', 1],
    ['14725836', 'Miguel', 'Vasquez', 'Av. Brasil 333', '901234567', 0],
    ['25836914', 'Elena', 'Diaz', 'Calle Los Alamos 444', '912345600', 1],
    ['36914725', 'Oscar', 'Ramirez', 'Jr. Union 555', '923456789', 1],
    ['74185296', 'Carmen', 'Flores', 'Av. La Marina 666', '934567801', 0],
    ['85296374', 'Raul', 'Castro', 'Calle Los Pinos 777', '945678912', 1],
    ['96385274', 'Patricia', 'Mendoza', 'Urb. Los Rosales 888', '956789123', 1],
    ['15935728', 'Fernando', 'Ortega', 'Av. Javier Prado 999', '967890234', 1],
    ['35715926', 'Daniela', 'Silva', 'Calle Las Orquideas 1010', '978901345', 0]
  ];

  const insertMany = db.transaction((clientes) => {
    for (const c of clientes) stmt.run(c);
  });

  insertMany(clientes);
  console.log('[SEEDER] 15 clientes insertados');
}