export function seed(db) {
  console.log('[SEEDER] Insertando cotizaciones...');

  const stmt = db.prepare(`
    INSERT INTO cotizaciones (
      id, cliente_id, usuario_id, fecha_hora, validez_dias, estado, total
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const ahora = new Date().toISOString();
  const manana = new Date(Date.now() + 86400000).toISOString();

  const cotizaciones = [
    [1, 1, 1, ahora, 7, 'activa', 350.0],
    [2, 3, 2, ahora, 3, 'activa', 280.0],
    [3, 5, 3, manana, 5, 'activa', 420.0],
    [4, 7, 1, ahora, 2, 'vencida', 180.0],
    [5, 9, 2, manana, 4, 'activa', 320.0],
    [6, 11, 3, ahora, 1, 'vencida', 150.0],
    [7, 13, 1, manana, 6, 'activa', 380.0],
    [8, 15, 2, ahora, 0, 'vencida', 210.0],
    [9, 2, 3, manana, 7, 'activa', 290.0],
    [10, 4, 1, ahora, 3, 'activa', 175.0]
  ];

  const insertMany = db.transaction((cotizaciones) => {
    for (const c of cotizaciones) stmt.run(c);
  });

  insertMany(cotizaciones);
  console.log(`[SEEDER] ${cotizaciones.length} cotizaciones insertadas`);
}
