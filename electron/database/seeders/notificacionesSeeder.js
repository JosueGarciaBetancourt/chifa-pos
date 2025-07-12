export function seed(db) {
  console.log('[SEEDER] Insertando notificaciones...');

  const stmt = db.prepare(`
    INSERT INTO notificaciones (
      id,
      usuario_id,
      tipo_id,
      titulo,
      mensaje,
      leido,
      creado_en
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  /**
   * tipo_id hace referencia a tipos_notificaciones:
   * 1 = información
   * 2 = alerta
   * 3 = error
   */

  const notificaciones = [
    // tipo_id: 2 (alerta) → requiere acción
    [1, 1, 2, 'Cierre de caja', 'La caja del turno anterior no fue cerrada correctamente.', 0, '2025-07-10 10:00:00'],
    // tipo_id: 1 (información) → evento nuevo
    [2, 2, 1, 'Nuevo pedido', 'Hay un nuevo pedido pendiente de preparar.', 0, '2025-07-10 10:05:00'],
    // tipo_id: 3 (error) → incidente o fallo
    [3, 1, 3, 'Pedido demorado', 'El pedido #15 ha tardado más de lo esperado.', 0, '2025-07-10 10:10:00'],
    // tipo_id: 2 (alerta) → situación crítica
    [4, 3, 2, 'Stock bajo', 'El insumo “pollo” está por debajo del nivel mínimo.', 1, '2025-07-10 11:00:00'],
    // tipo_id: 1 (información) → reporte disponible
    [5, 2, 1, 'Cierre mensual disponible', 'Ya puedes revisar el reporte del mes anterior.', 0, '2025-07-11 08:00:00']
  ];

  const insertMany = db.transaction((notificaciones) => {
    for (const n of notificaciones) {
      stmt.run(n);
    }
  });

  insertMany(notificaciones);
  console.log(`[SEEDER] ${notificaciones.length} notificaciones insertadas`);
}
