export function seed(db) {
  console.log('[SEEDER] Insertando cajas...');
  
  const stmt = db.prepare(`
    INSERT INTO cajas (id, nombre, descripcion, sede_id)
    VALUES (?, ?, ?, ?)
  `);

  const cajas = [
    [1, 'Caja principal', 'Caja principal de la sede', 1],
    [2, 'Caja secundaria', 'Caja secundaria de la sede', 1]
  ];

  const insertMany = db.transaction((cajas) => {
    for (const c of cajas) stmt.run(c);
  });

  insertMany(cajas);
  console.log(`[SEEDER] ${cajas.length} cajas insertadas`);
}
