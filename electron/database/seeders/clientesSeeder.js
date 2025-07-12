export function seed(db) {
  console.log('[SEEDER] Insertando clientes...');

  const stmt = db.prepare(`
    INSERT INTO clientes (
      id,
      dni,
      digitoVerificador,
      nombre,
      apellido,
      direccion,
      telefono,
      verificado_reniec
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const clientes = [
    [1, null, null, 'Cliente', 'Generico', null, null, 0],
    [2, '12345678', 4, 'Juan', 'Perez', 'Av. Siempre Viva 123', '987654321', 1],
    [3, '87654321', 9, 'Maria', 'Lopez', 'Calle Falsa 123', '912345678', 1],
    [4, '45678912', 7, 'Carlos', 'Sanchez', 'Jr. Lima 456', '934567890', 1],
    [5, '78912345', 2, 'Lucia', 'Torres', 'Av. Arequipa 789', '956781234', 0],
    [6, '32165487', 3, 'Roberto', 'Gomez', 'Calle Trujillo 101', '978901234', 1],
    [7, '65498712', 1, 'Sofia', 'Ruiz', 'Urb. Las Gardenias 222', '990123456', 1],
    [8, '14725836', 6, 'Miguel', 'Vasquez', 'Av. Brasil 333', '901234567', 0],
    [9, '25836914', 8, 'Elena', 'Diaz', 'Calle Los Alamos 444', '912345600', 1],
    [10, '36914725', 5, 'Oscar', 'Ramirez', 'Jr. Union 555', '923456789', 1],
    [11, '74185296', 0, 'Carmen', 'Flores', 'Av. La Marina 666', '934567801', 0],
    [12, '85296374', 2, 'Raul', 'Castro', 'Calle Los Pinos 777', '945678912', 1],
    [13, '96385274', 4, 'Patricia', 'Mendoza', 'Urb. Los Rosales 888', '956789123', 1],
    [14, '15935728', 3, 'Fernando', 'Ortega', 'Av. Javier Prado 999', '967890234', 1],
    [15, '35715926', 1, 'Daniela', 'Silva', 'Calle Las Orquideas 1010', '978901345', 0],
    [16, '75315926', 2, 'Claudia', 'Morales', 'Av. Universitaria 123', '999111222', 1],
    [17, '95135728', 0, 'Jose', 'Barrios', 'Calle San Pedro 321', '998877665', 0],
    [18, '86271359', 3, 'Gabriela', 'Huaman', 'Av. Grau 456', '987654310', 1],
    [19, '37482915', 7, 'Luis', 'Quispe', 'Jr. Amazonas 789', '976543219', 1],
    [20, '29837461', 6, 'Angela', 'Mejia', 'Urb. La Encantada 888', '965432198', 0],
    [21, '18472935', 8, 'Victor', 'Salinas', 'Calle Los Sauces 444', '954321987', 1],
    [22, '39285716', 5, 'Veronica', 'Espinoza', 'Av. Las Palmeras 111', '943219876', 1],
    [23, '73629184', 9, 'Jorge', 'Delgado', 'Jr. Cuzco 321', '932198765', 0]
  ];

  const insertMany = db.transaction((clientes) => {
    for (const c of clientes) stmt.run(c);
  });

  insertMany(clientes);
  console.log(`[SEEDER] ${clientes.length} clientes insertados`);
}
