export function seed(db) {
  console.log('[SEEDER] Insertando usuarios_permisos...');

  const stmt = db.prepare(`
    INSERT INTO usuarios_permisos (id, usuario_id, permiso_id, tipo)
    VALUES (?, ?, ?, ?)
  `);

  const usuarios_permisos = [
    // Ejemplo: añadir permisos EXTRA a un usuario específico
    [1, 2, 21, 'extra'], // Mario (mozo) → permiso extra: reportes - ver
    [2, 3, 22, 'extra'], // Carlos (cajero) → permiso extra: reportes - exportar

    // Ejemplo: revocar permisos a un usuario específico
    [3, 4, 19, 'revocado'], // Luisa (supervisor) → no puede actualizar delivery
    [4, 5, 10, 'revocado'], // Jorge (mozo) → no puede crear pedidos
  ];

  const insertMany = db.transaction((rows) => {
    for (const up of rows) stmt.run(up);
  });

  insertMany(usuarios_permisos);
  console.log(`[SEEDER] ${usuarios_permisos.length} usuarios_permisos insertados`);
}
