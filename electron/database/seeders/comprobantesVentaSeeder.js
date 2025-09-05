import { DateFormatter } from '../utils/dateFormatter.js';
import { CalculosFinancieros } from '../utils/calculosFinancieros.js';

export function seed(db) {
  console.log('[SEEDER] Insertando comprobantes_venta...');

  const stmt = db.prepare(`
    INSERT INTO comprobantes_venta (
      id, pedido_id, tipo_id, serie, numero, subTotal, igv, total,
      fecha_hora_emision, observaciones, xml_base64, metodo_pago_id, estado_id, sede_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const ahora = DateFormatter.toLocalSQLDatetime();

  let comprobantes = [];
  let id = 1;

  // === CASO 1: Pedido normal (un solo comprobante) ===
  comprobantes.push([
    id++, 1, 1, 'B001', '0001',
    72.03, 12.97, 85.0, // total = 85.0 (del pedido 1)
    ahora, 'Boleta de pedido completo', null,
    1, 4, 1 // método de pago = 1 (efectivo), estado aceptado
  ]);

  // === CASO 2: Pedido dividido (dos comprobantes) ===
  // Pedido 2 total: 68.5 → lo dividimos en 2 comprobantes
  const total2A = 40.0;
  const total2B = 28.5;

  comprobantes.push([
    id++, 2, 1, 'B001', '0002',
    CalculosFinancieros.calcularSubtotal(total2A),
    CalculosFinancieros.calcularIGV(total2A),
    total2A,
    ahora, 'Cliente A pagó parte de la cuenta', null,
    1, 4, 1
  ]);

  comprobantes.push([
    id++, 2, 1, 'B001', '0003',
    CalculosFinancieros.calcularSubtotal(total2B),
    CalculosFinancieros.calcularIGV(total2B),
    total2B,
    ahora, 'Cliente B pagó la otra parte', null,
    1, 4, 1
  ]);

  // === CASO 3: Otro pedido dividido (pedido 5 total: 110.0 → 2 comprobantes) ===
  const total5A = 60.0;
  const total5B = 50.0;

  comprobantes.push([
    id++, 5, 3, 'F001', '0001',
    CalculosFinancieros.calcularSubtotal(total5A),
    CalculosFinancieros.calcularIGV(total5A),
    total5A,
    ahora, 'Factura parte A', 'xml_base64_data',
    2, 4, 1 // método pago 2 (tarjeta), estado aceptado
  ]);

  comprobantes.push([
    id++, 5, 3, 'F001', '0002',
    CalculosFinancieros.calcularSubtotal(total5B),
    CalculosFinancieros.calcularIGV(total5B),
    total5B,
    ahora, 'Factura parte B', 'xml_base64_data',
    1, 4, 1
  ]);

  // === CASO 4: Resto de pedidos simples ===
  comprobantes.push([
    id++, 3, 1, 'B001', '0004',
    35.59, 6.41, 42.0,
    ahora, null, null,
    1, 4, 1
  ]);

  comprobantes.push([
    id++, 4, 1, 'B001', '0005',
    80.51, 14.49, 95.0,
    ahora, null, null,
    1, 2, 1 // estado emitido
  ]);

  comprobantes.push([
    id++, 6, 2, 'T001', '0001',
    62.71, 11.29, 74.0,
    ahora, null, null,
    2, 3, 1 // ticket enviado
  ]);

  // Puedes seguir con otros pedidos si deseas cubrir más escenarios

  const insertMany = db.transaction((rows) => {
    for (const row of rows) stmt.run(row);
  });

  insertMany(comprobantes);

  console.log(`[SEEDER] ${comprobantes.length} comprobantes_venta insertados`);
}
