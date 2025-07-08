export function seed(db) {
  console.log('[SEEDER] insertando usuarios iniciales...');

  const stmt = db.prepare(`
    INSERT INTO usuarios (dni, nombre, apellido, rol, contrasena_hash, activo)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  // Ejemplos de usuarios
  const usuarios = [
    ['12345678', 'Juan', 'Pérez', 'admin', 'hashed_password_juan', 1],
    ['87654321', 'Ana', 'García', 'mesero', 'hashed_password_ana', 1],
    ['45678912', 'Luis', 'Ramírez', 'cajero', 'hashed_password_luis', 1]
  ];

  // Insertar todos
  const insertMany = db.transaction((usuarios) => {
    for (const usuario of usuarios) stmt.run(usuario);
  });

  insertMany(usuarios);

  console.log('[SEEDER] usuarios insertados correctamente.');
}
