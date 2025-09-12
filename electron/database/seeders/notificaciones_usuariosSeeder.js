// electron/database/seeders/02_notificaciones_usuarios.js
export function seed(db) {
  console.log('[SEEDER] Insertando notificaciones_usuarios...');

  const stmt = db.prepare(`
    INSERT INTO notificaciones_usuarios (
      notificacion_id,
      usuario_id,
      leido
    )
    VALUES (?, ?, ?)
  `);

  /**
   * notificacion_id → referencia a notificaciones.id
   * usuario_id → referencia a usuarios.id
   * leido: 0 = no leído, 1 = leído
   */
  const notificacionesUsuarios = [
    // notificacion 1 para usuarios 1 y 2
    [1, 1, 0],
    [1, 2, 0],

    // notificacion 2 para usuarios 2 y 3
    [2, 2, 0],
    [2, 3, 0],

    // notificacion 3 solo para usuario 1
    [3, 1, 0],

    // notificacion 4 solo para usuario 3
    [4, 3, 1], // ejemplo ya leído

    // notificacion 5 para usuarios 2 y 3
    [5, 2, 0],
    [5, 3, 0]
  ];

  const insertMany = db.transaction((relaciones) => {
    for (const r of relaciones) {
      stmt.run(r);
    }
  });

  insertMany(notificacionesUsuarios);
  console.log(`[SEEDER] ${notificacionesUsuarios.length} relaciones notificación-usuario insertadas`);
}
