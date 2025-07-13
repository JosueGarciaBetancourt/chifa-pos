export function seed(db) {
  console.log('[SEEDER] Insertando reservas...');

  const stmt = db.prepare(`
    INSERT INTO reservas (
      id, cliente_id, mesa_id, usuario_id, fecha, hora,
      numero_personas, fecha_vencimiento, hora_vencimiento,
      estado, observaciones, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // === Utilidades ===

  function toSQLiteDate(date) {
    return date.toISOString().split('T')[0];
  }

  function toPeruDateTimeString(date = new Date()) {
    // Resta 5 horas para UTC-5
    const peruOffset = -5 * 60;
    const now = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const peru = new Date(now.getTime() + (peruOffset - date.getTimezoneOffset()) * 60000);
    return peru.toISOString().slice(0, 19).replace('T', ' ');
  }

  function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  function subtractMinutesFromTime(timeStr, minutesToSubtract) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes - minutesToSubtract, 0, 0);
    const newHours = String(date.getHours()).padStart(2, '0');
    const newMinutes = String(date.getMinutes()).padStart(2, '0');
    return `${newHours}:${newMinutes}`;
  }

  // === Fechas base ===
  const hoy = new Date();
  const manana = addDays(hoy, 1);
  const pasado = addDays(hoy, 2);

  const reservas = [
    [1, 1, 1, 2, hoy,     '19:00', 4, addDays(hoy, -1),     '18:30', 'confirmada', 'Aniversario'],
    [2, 3, 2, 1, manana,  '20:30', 6, addDays(manana, -1),  '20:00', 'pendiente', null],
    [3, 4, 7, 5, manana,  '21:00', 4, addDays(manana, -1),  '20:15', 'confirmada', 'Con niños'],
    [4, 2, 4, 2, hoy,     '14:00', 2, addDays(hoy, -1),     '13:30', 'cumplida', 'Almuerzo'],
    [5, 5, 5, 3, pasado,  '13:30', 8, addDays(pasado, -1),  '13:00', 'confirmada', 'Reunión de trabajo'],
    [6, 6, 8, 2, manana,  '20:00', 4, addDays(manana, -1),  '19:30', 'pendiente', 'Sin gluten'],
    [7, 7, 10, 1, pasado, '19:30', 6, addDays(pasado, -1),  '19:00', 'confirmada', 'Cumpleaños'],
    [8, 8, 12, 5, hoy,    '15:00', 4, addDays(hoy, -1),     '14:15', 'cumplida', 'Reunión familiar'],
    [9, 9, 14, 2, manana, '22:00', 10,addDays(manana, -1),  '21:30', 'confirmada', 'Despedida'],
    [10, 10, 3, 3, pasado,'14:30', 4, addDays(pasado, -1),  '14:00', 'cancelada', 'Cambio de planes']
  ];

  const insertMany = db.transaction((reservas) => {
    for (const r of reservas) {
      const [
        id, cliente_id, mesa_id, usuario_id,
        fechaObj, hora, numero_personas,
        fechaVencObj, horaVenc,
        estado, observaciones
      ] = r;

      const created_at = toPeruDateTimeString(); // hora de inserción en zona Perú

      stmt.run([
        id,
        cliente_id,
        mesa_id,
        usuario_id,
        toSQLiteDate(fechaObj),
        hora,
        numero_personas,
        toSQLiteDate(fechaVencObj),
        subtractMinutesFromTime(hora, 30),
        estado,
        observaciones,
        created_at
      ]);
    }
  });

  insertMany(reservas);
  console.log(`[SEEDER] ${reservas.length} reservas insertadas con hora Perú`);
}
