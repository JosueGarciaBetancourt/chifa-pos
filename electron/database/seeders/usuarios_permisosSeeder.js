// electron/database/seeders/05_usuarios_permisos.js
export function seed(db) {
  console.log('[SEEDER] Insertando usuarios_permisos...');

  const stmt = db.prepare(`
    INSERT INTO usuarios_permisos (id, usuario_id, permiso_id, tipo)
    VALUES (?, ?, ?, ?)
  `);

  const usuarios_permisos = [
    // ===============================
    // PERMISOS EXTRA
    // ===============================

    // Mario (mozo) → permiso extra: reportes - ver (27)
    // (Normalmente un mozo no accede a reportes, pero aquí le damos acceso especial)
    [1, 2, 27, 'extra'],

    // Carlos (cajero) → permiso extra: reportes - exportar (28)
    // (Por defecto cajero solo vería reportes, ahora puede exportarlos)
    [2, 3, 28, 'extra'],

    // ===============================
    // PERMISOS REVOCADOS
    // ===============================

    // Luisa (supervisor) → revocado: delivery.actualizar (24)
    // (Supervisor puede gestionar delivery, pero aquí le quitamos esa acción)
    [3, 4, 24, 'revocado'],

    // Jorge (mozo) → revocado: pedidos.crear (13)
    // (Por defecto un mozo puede crear pedidos, aquí lo limitamos solo a ver/actualizar)
    [4, 5, 13, 'revocado'],

    // Ana (cajero inactivo) → revocado: caja.crear (3)
    // (Ejemplo de un usuario inactivo que ya no puede operar caja)
    [5, 6, 3, 'revocado']
  ];

  const insertMany = db.transaction((rows) => {
    for (const up of rows) stmt.run(up);
  });

  insertMany(usuarios_permisos);
  console.log(`[SEEDER] ${usuarios_permisos.length} usuarios_permisos insertados`);
}
