export function seed(db) {
  console.log('[SEEDER] Insertando pedidos...');

  const stmt = db.prepare(`
    INSERT INTO pedidos (
      id, cliente_id, usuario_id, mesa_id, tipo_id, estado_id, 
      fecha_hora, direccion_entrega, total, observaciones_generales, sede_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  function toSQLiteDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const ahora = new Date();
  const ayer = new Date(ahora - 86400000);
  const semanaPasada = new Date(ahora - 7 * 86400000);

  const pedidos = [
    [1, 1, 2, 1, 1, 5, toSQLiteDatetime(ahora), null, 85.0, 'Atender rápido', 1],
    [2, 3, 1, 4, 3, 4, toSQLiteDatetime(ahora), 'Calle Los Pinos 456', 68.5, 'Llamar antes de llegar', 1],
    [3, 2, 3, null, 2, 3, toSQLiteDatetime(ahora), null, 42.0, 'Para recoger en 30 min', 1],
    [4, 4, 2, 6, 1, 2, toSQLiteDatetime(ahora), null, 95.0, 'Cliente frecuente', 1],
    [5, 5, 5, null, 3, 1, toSQLiteDatetime(ahora), 'Av. Primavera 789', 110.0, 'Confirmar por llamada', 1],
    [6, 16, 1, 2, 1, 5, toSQLiteDatetime(ahora), null, 74.0, 'Aniversario', 1],
    [7, 17, 3, 9, 1, 3, toSQLiteDatetime(ahora), null, 66.0, null, 1],
    [8, 18, 2, null, 2, 4, toSQLiteDatetime(ahora), null, 38.5, 'Sin ají', 1],

    [9, 6, 2, 3, 1, 5, toSQLiteDatetime(ayer), null, 75.0, 'Mesa decorada', 1],
    [10, 7, 1, 8, 3, 4, toSQLiteDatetime(ayer), 'Calle Las Magnolias 101', 52.5, 'Dejar en portería', 1],
    [11, 8, 3, null, 2, 4, toSQLiteDatetime(ayer), null, 36.0, 'Pago en efectivo', 1],
    [12, 19, 1, 5, 1, 5, toSQLiteDatetime(ayer), null, 84.0, 'Sin sal', 1],
    [13, 20, 2, null, 3, 4, toSQLiteDatetime(ayer), 'Jr. Amazonas 111', 97.5, 'Urgente', 1],
    [14, 21, 3, 10, 2, 5, toSQLiteDatetime(ayer), null, 65.0, 'Recojo 1pm', 1],

    [15, 9, 2, 2, 1, 5, toSQLiteDatetime(semanaPasada), null, 120.0, 'Celebración familiar', 1],
    [16, 10, 1, 5, 3, 4, toSQLiteDatetime(semanaPasada), 'Av. Los Incas 222', 88.0, 'Timbre azul', 1],
    [17, 11, 3, null, 2, 4, toSQLiteDatetime(semanaPasada), null, 45.5, 'Solicita factura', 1],
    [18, 12, 2, 10, 1, 5, toSQLiteDatetime(semanaPasada), null, 65.0, 'Reservado', 1],
    [19, 13, 1, 7, 3, 4, toSQLiteDatetime(semanaPasada), 'Calle Las Dalias 333', 72.5, 'Piso 3', 1],
    [20, 14, 3, null, 2, 4, toSQLiteDatetime(semanaPasada), null, 38.0, null, 1],
    [21, 15, 2, 12, 1, 5, toSQLiteDatetime(semanaPasada), null, 92.0, 'Evento especial', 1],
    [22, 22, 3, 6, 1, 5, toSQLiteDatetime(semanaPasada), null, 49.0, 'Alérgico al maní', 1],
    [23, 23, 1, null, 2, 4, toSQLiteDatetime(semanaPasada), null, 59.5, 'Extra arroz', 1]
  ];

  const insertMany = db.transaction((pedidos) => {
    for (const p of pedidos) stmt.run(p);
  });

  insertMany(pedidos);
  console.log(`[SEEDER] ${pedidos.length} pedidos insertados`);
}
