export function seed(db) {
  console.log('[SEEDER] Insertando tipos_pedidos...');

  const stmt = db.prepare(`
    INSERT INTO tipos_pedidos (id, nombre)
    VALUES (?, ?)
  `);

  const tipos_pedidos = [
    [1, 'consumo_local'],
    [2, 'para_llevar'],
    [3, 'delivery'],
    [4, 'cotización']
  ];

  const insertMany = db.transaction((tipos_pedidos) => {
    for (const tp of tipos_pedidos) stmt.run(tp);
  });

  insertMany(tipos_pedidos);
  console.log(`[SEEDER] ${tipos_pedidos.length} tipos_pedidos insertados`);
}
