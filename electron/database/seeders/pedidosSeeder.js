import { DateFormatter } from '../utils/dateFormatter.js';

export function seed(db) {
  console.log('[SEEDER] Insertando pedidos...');

  const stmt = db.prepare(`
    INSERT INTO pedidos (
      id, cliente_id, usuario_id, mesa_id, tipo_id, estado_id, 
      fecha_hora, direccion_entrega, subTotal, igv, total, observaciones_generales, cotizacion_id, sede_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  function calcularSubtotal(total) {
    return parseFloat((total / 1.18).toFixed(2)); // precio sin IGV
  }

  function calcularIGV(subtotal, total) {
    return parseFloat((total - subtotal).toFixed(2)); // diferencia exacta
  }

  const ahora = DateFormatter.toLocalSQLDatetime();
  const ayer = DateFormatter.toLocalSQLDatetime(new Date(new Date() - 86400000));
  const semanaPasada = DateFormatter.toLocalSQLDatetime(new Date(new Date() - 7 * 86400000));

  const pedidosOriginales = [
    [1, 1, 2, 1, 1, 5, ahora, null, 85.0, 'Atender rápido', null, 1],
    [2, 3, 1, null, 3, 4, ahora, 'Calle Los Pinos 456', 68.5, 'Llamar antes de llegar', null, 1],
    [3, 2, 3, null, 2, 3, ahora, null, 42.0, 'Para recoger en 30 min', null, 1],
    [4, 4, 2, 6, 1, 2, ahora, null, 95.0, 'Cliente frecuente', null, 1],
    [5, 5, 5, null, 3, 1, ahora, 'Av. Primavera 789', 110.0, 'Confirmar por llamada', null, 1],
    [6, 16, 1, 2, 1, 5, ahora, null, 74.0, 'Aniversario', null, 1],
    [7, 17, 3, 9, 1, 3, ahora, null, 66.0, null, null, 1],
    [8, 18, 2, null, 2, 4, ahora, null, 38.5, 'Sin ají', null, 1],
    [9, 6, 2, 3, 1, 5, ayer, null, 75.0, 'Mesa decorada', null, 1],
    [10, 7, 1, null, 3, 4, ayer, 'Calle Las Magnolias 101', 52.5, 'Dejar en portería', null, 1],
    [11, 8, 3, null, 2, 4, ayer, null, 36.0, 'Pago en efectivo', null, 1],
    [12, 19, 1, 5, 1, 5, ayer, null, 84.0, 'Sin sal', null, 1],
    [13, 20, 2, null, 3, 4, ayer, 'Jr. Amazonas 111', 97.5, 'Urgente', null, 1],
    [14, 21, 3, 10, 2, 5, ayer, null, 65.0, 'Recojo 1pm', null, 1],
    [15, 9, 2, 2, 1, 5, semanaPasada, null, 120.0, 'Celebración familiar', null, 1],
    [16, 10, 1, null, 3, 4, semanaPasada, 'Av. Los Incas 222', 88.0, 'Timbre azul', null, 1],
    [17, 11, 3, 5, 2, 4, semanaPasada, null, 45.5, 'Solicita factura', null, 1],
    [18, 12, 2, 10, 1, 5, semanaPasada, null, 65.0, 'Reservado', null, 1],
    [19, 13, 1, null, 3, 4, semanaPasada, 'Calle Las Dalias 333', 72.5, 'Piso 3', null, 1],
    [20, 14, 3, null, 2, 4, semanaPasada, null, 38.0, null, null, 1],
    [21, 15, 2, 12, 1, 5, semanaPasada, null, 92.0, 'Evento especial', null, 1],
    [22, 22, 3, 6, 1, 5, semanaPasada, null, 49.0, 'Alérgico al maní', null, 1],
    [23, 23, 1, 7, 2, 4, semanaPasada, null, 59.5, 'Extra arroz', null, 1],

    // Pedidos virtuales generados por cotizaciones
    /* 
      id, cliente_id, usuario_id, mesa_id, tipo_id, estado_id, fecha_hora, direccion_entrega, total,
      observaciones_generales, cotizacion_id, sede_id
    */
    [24, 2, 3, null, 4, 1, ahora, null, 65, 'Cotización', 11, 1]
  ];

  const insertMany = db.transaction((pedidos) => {
    for (const p of pedidos) {
      const [id, cliente_id, usuario_id, mesa_id, tipo_id, estado_id, fecha_hora, direccion_entrega, total, observaciones_generales, cotizacion_id, sede_id] = p;
      const subTotal = calcularSubtotal(total);
      const igv = calcularIGV(subTotal, total);

      stmt.run([
        id,
        cliente_id,
        usuario_id,
        mesa_id,
        tipo_id,
        estado_id,
        fecha_hora,
        direccion_entrega,
        subTotal,
        igv,
        total,
        observaciones_generales,
        cotizacion_id,
        sede_id
      ]);
    }
  });

  insertMany(pedidosOriginales);
  console.log(`[SEEDER] ${pedidosOriginales.length} pedidos insertados con subtotal, IGV y total`);
}
