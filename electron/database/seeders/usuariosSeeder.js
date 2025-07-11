// electron/database/seeders/01_usuarios.js
export function seed(db) {
  console.log('[SEEDER] Insertando usuarios...');
  
  const stmt = db.prepare(`
    INSERT INTO usuarios (dni, nombre, apellido, rol_id, username, password, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // roles
  // 1: admin
  // 2: supervisor
  // 3: cajero
  // 4: cocinero
  // 5: mozo

  const usuarios = [
    ['12345678', 'Admin', '', 1, 'admin', '123', 1],
    ['87654321', 'Mario', 'Bros', 5, 'mario_mozo', '123', 1],
    ['45678912', 'Carlos', 'Vilchez', 3, 'carlos_cajero', '123', 1],
    ['78912345', 'Luisa', 'Landeo', 2, 'luisa_supervisor', '123', 1],
    ['32165487', 'Jorge', 'Guevara', 5, 'jorge_mozo', '123', 1],
    ['65498712', 'Ana', 'Manrique', 3, 'ana_cajero', '123', 0],
    ['14725836', 'Pedro', 'Castillo', 4, 'pedro_cocinero', '123', 1],
    ['25836914', 'Rosa', 'Pérez', 4, 'rosa_cocinero', '123', 1],
    ['36914725', 'Miguel', 'Medina', 2, 'miguel_supervisor', '123', 1],
  ];

  const insertMany = db.transaction((usuarios) => {
    for (const u of usuarios) stmt.run(u);
  });

  insertMany(usuarios);
  console.log(`[SEEDER] ${usuarios.length} usuarios insertados`);
}