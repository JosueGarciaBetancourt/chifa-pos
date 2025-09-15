export function seed(db) {
  console.log('[SEEDER] Insertando acciones_sistema...');

  const stmt = db.prepare(`
    INSERT INTO acciones_sistema (
      id, nombre
    )
    VALUES (?, ?)
  `);

  const acciones_sistema = [
    // Acciones básicas
    [1, 'acceder'],
    [2, 'ver'],
    [3, 'crear'],
    [4, 'actualizar'],
    [5, 'eliminar'],

    // Acciones de flujo
    [6, 'aprobar'],
    [7, 'rechazar'],
    [8, 'anular'],
    [9, 'cerrar'],
    [10, 'abrir'],

    // Acciones de gestión avanzada
    [11, 'exportar'],
    [12, 'importar'],
    [13, 'imprimir'],
    [14, 'notificar'],
    [15, 'configurar'],

    // Acciones de seguridad y usuarios
    [16, 'asignar'],
    [17, 'revocar'],
    [18, 'habilitar'],
    [19, 'deshabilitar']
  ];

  const insertMany = db.transaction((acciones_sistema) => {
    for (const accion of acciones_sistema) stmt.run(accion);
  });

  insertMany(acciones_sistema);
  console.log(`[SEEDER] ${acciones_sistema.length} acciones_sistema insertados`);
}
