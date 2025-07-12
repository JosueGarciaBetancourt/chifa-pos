export function seed(db) {
  console.log('[SEEDER] Insertando sede_local...');

  const stmt = db.prepare(`
    INSERT INTO sede_local (
      id, empresa_id, nombre, direccion, ciudad, distrito, telefono,
      serie_boleta, serie_factura, serie_ticket, usa_web_central
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const sedes = [
    [
      1,
      1,
      'Chifa Samsen - Sede Miraflores',
      'Calle Sabores Orientales 456',
      'Lima',
      'Miraflores',
      '+51 987 654 322',                   
      'B001',
      'F001',
      'T001',
      1
    ]
  ];

  const insertMany = db.transaction((sedes) => {
    for (const s of sedes) stmt.run(s);
  });

  insertMany(sedes);
  console.log(`[SEEDER] ${sedes.length} sedes insertadas`);
}
