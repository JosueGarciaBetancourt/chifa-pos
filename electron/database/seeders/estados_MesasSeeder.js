export function seed(db) {
  console.log('[SEEDER] Insertando estados_mesas...');

  const stmt = db.prepare(`
    INSERT INTO estados_mesas (id, nombre, descripcion)
    VALUES (?, ?, ?)
  `);

  const estados_mesas = [
    [1, 'disponible', 'Mesa libre, lista para ser ocupada'],
    [2, 'ocupado', 'Actualmente con clientes o un pedido activo'],
    [3, 'reservado', 'Apartada por una reserva futura'],
    [4, 'en_limpieza', 'Ha sido desocupada, pero aún no está lista para el próximo cliente'],
    [5, 'fuera_servicio', 'Mesa dañada, fuera de uso temporal o permanente']
  ];

  const insertMany = db.transaction((estados_mesas) => {
    for (const em of estados_mesas) stmt.run(em);
  });

  insertMany(estados_mesas);
  console.log(`[SEEDER] ${estados_mesas.length} estados_mesas insertadas`);
}
