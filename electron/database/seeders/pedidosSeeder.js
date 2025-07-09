export function seed(db) {
  console.log('[SEEDER] Insertando pedidos...');
  
  const stmt = db.prepare(`
    INSERT INTO pedidos (cliente_id, usuario_id, mesa_id, tipo, estado, fecha_hora, direccion_entrega, total, observaciones)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Función para convertir Date a string SQLite (YYYY-MM-DD HH:MM:SS)
  function toSQLiteDatetime(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  const ahora = new Date();
  const ayer = new Date(ahora - 86400000); // 1 día antes
  const semanaPasada = new Date(ahora - 7 * 86400000);
  
  const pedidos = [
    // Pedidos de hoy
    [1, 2, 1, 'mesa', 'pagado', toSQLiteDatetime(ahora), null, 85.0, 'Sin gluten'],
    [3, 1, 4, 'delivery', 'entregado', toSQLiteDatetime(ahora), 'Calle Los Pinos 456', 68.5, 'Llamar antes de llegar'],
    [2, 3, null, 'para_llevar', 'listo', toSQLiteDatetime(ahora), null, 42.0, 'Para recoger en 30 min'],
    [4, 2, 6, 'mesa', 'cocina', toSQLiteDatetime(ahora), null, 95.0, 'Poco picante'],
    [5, 5, null, 'delivery', 'pendiente', toSQLiteDatetime(ahora), 'Av. Primavera 789', 110.0, 'Sin cebolla'],
    
    // Pedidos de ayer
    [6, 2, 3, 'mesa', 'pagado', toSQLiteDatetime(ayer), null, 75.0, 'Aniversario'],
    [7, 1, 8, 'delivery', 'entregado', toSQLiteDatetime(ayer), 'Calle Las Magnolias 101', 52.5, 'Dejar en portería'],
    [8, 3, null, 'para_llevar', 'entregado', toSQLiteDatetime(ayer), null, 36.0, null],
    
    // Pedidos de la semana pasada
    [9, 2, 2, 'mesa', 'pagado', toSQLiteDatetime(semanaPasada), null, 120.0, 'Cumpleaños'],
    [10, 1, 5, 'delivery', 'entregado', toSQLiteDatetime(semanaPasada), 'Av. Los Incas 222', 88.0, 'Timbre azul'],
    [11, 3, null, 'para_llevar', 'entregado', toSQLiteDatetime(semanaPasada), null, 45.5, 'Factura necesaria'],
    [12, 2, 10, 'mesa', 'pagado', toSQLiteDatetime(semanaPasada), null, 65.0, 'Sin sal'],
    [13, 1, 7, 'delivery', 'entregado', toSQLiteDatetime(semanaPasada), 'Calle Las Dalias 333', 72.5, 'Piso 3'],
    [14, 3, null, 'para_llevar', 'entregado', toSQLiteDatetime(semanaPasada), null, 38.0, null],
    [15, 2, 12, 'mesa', 'pagado', toSQLiteDatetime(semanaPasada), null, 92.0, 'Celebración']
  ];

  const insertMany = db.transaction((pedidos) => {
    for (const p of pedidos) stmt.run(p);
  });

  insertMany(pedidos);
  console.log('[SEEDER] 15 pedidos insertados');
}