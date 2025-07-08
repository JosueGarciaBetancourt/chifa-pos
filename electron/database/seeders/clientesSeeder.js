export function seed(db) {
  console.log('[SEEDER] insertando clientes iniciales...');

  const stmt = db.prepare(`
    INSERT INTO clientes (dni, nombre, apellido, direccion, telefono, verificado_reniec)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const clientes = [
    ['12345678', 'Carlos', 'Lopez', 'Av. Siempre Viva 123', '987654321', 1],
    ['87654321', 'María', 'Perez', 'Calle Falsa 456', '912345678', 0],
    ['45678912', 'Lucía', 'Fernandez', 'Jr. Las Flores 789', '934567890', 1]
  ];

  const insertMany = db.transaction((clientes) => {
    for (const cliente of clientes) stmt.run(cliente);
  });

  insertMany(clientes);

  console.log('[SEEDER] clientes insertados correctamente.');
}
