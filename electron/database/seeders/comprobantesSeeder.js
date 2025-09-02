export function seed(db) {
  console.log('[SEEDER] Insertando comprobantes...');

  const stmt = db.prepare(`
    INSERT INTO comprobantes_venta (
      id, pedido_id, tipo_id, serie, numero, fecha_hora_emision,
      observaciones, xml_base64, metodo_pago_id, estado_id, sede_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const comprobantes_venta = [
    // ID | PEDIDO | TIPO | SERIE | NÚMERO | FECHA | OBSERVACION | XML | MÉTODO_PAGO | ESTADO | SEDE

    [1, 1, 1, 'B001', '0001', '2023-07-01 12:45:00', 'Ejemplo 1 de observación en un comprobante', null, 1, 2, 1], // emitido
    [2, 2, 2, 'T001', '0001', '2023-07-01 14:00:00', null, null, 1, 3, 1], // enviado
    [3, 3, 1, 'B001', '0002', '2023-07-02 13:20:00', null, null, 1, 4, 1], // aceptado
    [4, 4, 3, 'F001', '0001', '2023-07-02 14:30:00', null, 'base64_xml_data', 1, 4, 1], // aceptado
    [5, 5, 1, 'B001', '0003', '2023-07-03 19:15:00', null, null, 1, 2, 1], // emitido
    [6, 6, 2, 'T001', '0002', '2023-07-04 20:00:00', null, null, 1, 1, 1], // borrador
    [7, 7, 1, 'B001', '0004', '2023-07-05 12:45:00', null, null, 1, 2, 1], // emitido
    [8, 8, 2, 'T001', '0003', '2023-07-06 13:30:00', null, null, 1, 5, 1], // anulado
    [9, 9, 3, 'F001', '0002', '2023-07-07 14:20:00', 'Ejemplo 2 de observación en un comprobante', 'base64_xml_data', 1, 3, 1], // enviado
    [10, 10, 1, 'B001', '0005', '2023-07-08 18:45:00', null, null, 1, 2, 1], // emitido
  ];

  const insertMany = db.transaction((comprobantes_venta) => {
    for (const c of comprobantes_venta) stmt.run(c);
  });

  insertMany(comprobantes_venta);
  console.log(`[SEEDER] ${comprobantes_venta.length} comprobantes_venta insertados`);
}
