export function seed(db) {
  console.log('[SEEDER] Insertando reservas...');

  const stmt = db.prepare(`
    INSERT INTO reservas (id, cliente_id, mesa_id, usuario_id, fecha, hora, numero_personas, estado, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Función para formatear fecha como YYYY-MM-DD
  function toSQLiteDate(date) {
    return date.toISOString().split('T')[0];
  }

  const hoy = new Date();
  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);
  const pasado = new Date(hoy);
  pasado.setDate(pasado.getDate() + 2);

  const reservas = [
    [1, 1, 1, 2, toSQLiteDate(hoy),     '19:00', 4,  'confirmada', 'Aniversario'],
    [2, 3, 2, 1, toSQLiteDate(manana),  '20:30', 6,  'pendiente', null],
    [3, 4, 7, 5, toSQLiteDate(manana),  '21:00', 4,  'confirmada', 'Con niños'],
    [4, 2, 4, 2, toSQLiteDate(hoy),     '14:00', 2,  'cumplida', 'Almuerzo'],
    [5, 5, 5, 3, toSQLiteDate(pasado),  '13:30', 8,  'confirmada', 'Reunión de trabajo'],
    [6, 6, 8, 2, toSQLiteDate(manana),  '20:00', 4,  'pendiente', 'Sin gluten'],
    [7, 7, 10, 1, toSQLiteDate(pasado), '19:30', 6,  'confirmada', 'Cumpleaños'],
    [8, 8, 12, 5, toSQLiteDate(hoy),    '15:00', 4,  'cumplida', 'Reunión familiar'],
    [9, 9, 14, 2, toSQLiteDate(manana), '22:00', 10, 'confirmada', 'Despedida'],
    [10, 10, 3, 3, toSQLiteDate(pasado),'14:30', 4,  'cancelada', 'Cambio de planes']
  ];

  const insertMany = db.transaction((reservas) => {
    for (const r of reservas) stmt.run(r);
  });

  insertMany(reservas);
  console.log(`[SEEDER] ${reservas.length} reservas insertadas`);
}
