export function seed(db) {
  console.log('[SEEDER] Insertando notificaciones...');

  const stmtNotificaciones = db.prepare(`
    INSERT INTO notificaciones (
      id,
      tipo_id,
      titulo,
      mensaje,
      creado_en
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  /**
   * tipo_id hace referencia a tipos_notificaciones:
   * 1 = información
   * 2 = alerta
   * 3 = error
   */

  const notificaciones = [
    // [id, tipo_id, titulo, mensaje, creado_en]
    [1, 2, 'Cierre de caja', 'La caja del turno anterior no fue cerrada correctamente.', '2025-07-10 10:00:00'],
    [2, 1, 'Nuevo pedido', 'Hay un nuevo pedido pendiente de preparar.', '2025-07-10 10:05:00'],
    [3, 3, 'Pedido demorado', 'El pedido #15 ha tardado más de lo esperado.', '2025-07-10 10:10:00'],
    [4, 2, 'Stock bajo', 'El insumo “pollo” está por debajo del nivel mínimo.', '2025-07-10 11:00:00'],
    [5, 1, 'Cierre mensual disponible', 'Ya puedes revisar el reporte del mes anterior.', '2025-07-11 08:00:00']
  ];

  const insertMany = db.transaction((notificaciones) => {
    for (const n of notificaciones) {
      stmtNotificaciones.run(n);
    }
  });

  insertMany(notificaciones);
  console.log(`[SEEDER] ${notificaciones.length} notificaciones insertadas`);
}
