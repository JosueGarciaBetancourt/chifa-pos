export function seed(db) {
  console.log('[SEEDER] Insertando estados_mesas...');
  
  const stmt = db.prepare(`
    INSERT INTO estados_mesas (nombre, descripcion)
    VALUES (?, ?)
  `);

  const estados_mesas = [
    ['disponible', 'Mesa libre, lista para ser ocupada'],
    ['ocupado', 'Actualmente con clientes o un pedido activo'],
    ['reservado', 'Apartada por una reserva futura'],
    ['en_limpieza', 'Ha sido desocupada, pero aún no está lista para el próximo cliente'],
    ['fuera_servicio', 'Mesa dañada, fuera de uso temporal o permanente']
  ];

  const insertMany = db.transaction((estados_mesas) => {
    for (const em of estados_mesas) stmt.run(em);
  });

  insertMany(estados_mesas);
  console.log(`[SEEDER] ${estados_mesas} estados_mesas insertadas`);
}