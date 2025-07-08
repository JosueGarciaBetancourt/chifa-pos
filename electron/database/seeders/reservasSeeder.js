export function seed(db) {
  console.log('[SEEDER] insertando reservas iniciales...');

  const stmt = db.prepare(`
    INSERT INTO reservas (cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const reservas = [
    // Reserva para hoy
    [1, 1, 1, '2025-07-08', '12:30:00', 4, 'confirmada', 'Celebración de cumpleaños'],
    // Reserva para mañana
    [2, 2, 2, '2025-07-09', '19:00:00', 2, 'pendiente', 'Preferencia mesa cerca de ventana'],
    // Reserva para pasado mañana
    [3, 3, 1, '2025-07-10', '20:00:00', 6, 'cancelada', 'Cancelada por cliente']
  ];

  const insertMany = db.transaction((reservas) => {
    for (const reserva of reservas) stmt.run(reserva);
  });

  insertMany(reservas);

  console.log('[SEEDER] reservas insertadas correctamente.');
}
