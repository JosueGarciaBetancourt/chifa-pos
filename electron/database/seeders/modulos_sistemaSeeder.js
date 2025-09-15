export function seed(db) {
  console.log('[SEEDER] Insertando modulos_sistema...');

  const stmt = db.prepare(`
    INSERT INTO modulos_sistema (
      id, nombre
    )
    VALUES (?, ?)
  `);

  const modulos_sistema = [
    [1, 'caja'],
    [2, 'cocina'],
    [3, 'pedidos'],
    [4, 'inventario'],
    [5, 'delivery'],
    [6, 'reportes']
  ];

  const insertMany = db.transaction((modulos_sistema) => {
    for (const modulo of modulos_sistema) stmt.run(modulo);
  });

  insertMany(modulos_sistema);
  console.log(`[SEEDER] ${modulos_sistema.length} modulos_sistema insertados`);
}
