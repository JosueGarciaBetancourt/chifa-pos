// electron/database/seeders/01_usuarios.js
export function seed(db) {
  console.log('[SEEDER] Insertando usuarios...');
  
  const stmt = db.prepare(`
    INSERT INTO usuarios (dni, nombre, apellido, rol, contrasena_hash, activo)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const usuarios = [
    ['12345678', 'Admin', 'Sistema', 'admin', 'hash_valido', 1],
    ['87654321', 'Mario', 'Mozo', 'mozo', 'hash_valido', 1],
    ['45678912', 'Carlos', 'Cajero', 'cajero', 'hash_valido', 1],
    ['78912345', 'Luisa', 'Supervisora', 'supervisor', 'hash_valido', 1],
    ['32165487', 'Jorge', 'Mozo', 'mozo', 'hash_valido', 1],
    ['65498712', 'Ana', 'Cajero', 'cajero', 'hash_valido', 0],
    ['14725836', 'Pedro', 'Cocinero', 'admin', 'hash_valido', 1],
    ['25836914', 'Rosa', 'Cocinera', 'admin', 'hash_valido', 1],
    ['36914725', 'Miguel', 'Supervisor', 'supervisor', 'hash_valido', 1],
    ['74185296', 'Lucía', 'Administradora', 'admin', 'hash_valido', 1]
  ];

  const insertMany = db.transaction((usuarios) => {
    for (const u of usuarios) stmt.run(u);
  });

  insertMany(usuarios);
  console.log('[SEEDER] 10 usuarios insertados');
}