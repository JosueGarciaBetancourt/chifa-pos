export function seed(db) {
    console.log('[SEEDER] Insertando comprobantes...');
    
    const stmt = db.prepare(`
      INSERT INTO comprobantes (pedido_id, tipo, serie, numero, fecha_hora_emision, xml_base64, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
  
    const comprobantes = [
      [1, 'boleta', 'B001', '0001', '2023-07-01 12:45:00', null, 'emitido'],
      [2, 'ticket', 'T001', '0001', '2023-07-01 14:00:00', null, 'emitido'],
      [3, 'boleta', 'B001', '0002', '2023-07-02 13:20:00', null, 'emitido'],
      [4, 'factura', 'F001', '0001', '2023-07-02 14:30:00', 'base64_xml_data', 'emitido'],
      [5, 'boleta', 'B001', '0003', '2023-07-03 19:15:00', null, 'emitido'],
      [6, 'ticket', 'T001', '0002', '2023-07-04 20:00:00', null, 'emitido'],
      [7, 'boleta', 'B001', '0004', '2023-07-05 12:45:00', null, 'emitido'],
      [8, 'ticket', 'T001', '0003', '2023-07-06 13:30:00', null, 'anulado'],
      [9, 'factura', 'F001', '0002', '2023-07-07 14:20:00', 'base64_xml_data', 'emitido'],
      [10, 'boleta', 'B001', '0005', '2023-07-08 18:45:00', null, 'emitido']
    ];
  
    const insertMany = db.transaction((comprobantes) => {
      for (const c of comprobantes) stmt.run(c);
    });
  
    insertMany(comprobantes);
    console.log('[SEEDER] 10 comprobantes insertados');
  }