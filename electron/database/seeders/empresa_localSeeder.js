export function seed(db) {
  console.log('[SEEDER] Insertando empresa_local...');
  
  const stmt = db.prepare(`
    INSERT INTO empresa_local (ruc, razon_social, nombre_comercial, direccion, telefono, email, logo_base64)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const empresa_local = [
    [
      '20481234567',                             // RUC válido ficticio
      'Chifa Samsen S.A.C.',                     // Razón social
      'Chifa Samsen',                            // Nombre comercial
      'Av. Los Sabores 123, Lima - Perú',        // Dirección
      '+51 987 654 321',                         // Teléfono
      'contacto@chifasamsen.com',                // Email
      null                                       // Logo (aún no registrado)
    ]
  ];

  const insertMany = db.transaction((empresa_local) => {
    for (const e of empresa_local) stmt.run(e);
  });

  insertMany(empresa_local);
  console.log(`[SEEDER] ${empresa_local.length} empresa_local insertada`);
}
