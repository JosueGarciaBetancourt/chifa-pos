import { DateFormatter } from "../utils/dateFormatter.js";

export function seed(db) {
  console.log('[SEEDER] Insertando movimientos_caja (flujo del día actual)...');

  const stmt = db.prepare(`
    INSERT INTO movimientos_caja (
      id, caja_id, tipo, usuario_id, jornada_laboral_id,
      fecha_hora, observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const fecha_hoy = DateFormatter.toDateOnly();
  const hora_actual = DateFormatter.toTimeOnly();

  // Para pruebas: cortamos hora_actual a formato HH:MM:SS
  const now = `${fecha_hoy} ${hora_actual}`;

  const movimientos = [
    // Apertura del día
    [1, 1, 'apertura', 1, 1, `${fecha_hoy} 09:00:00`, 'Apertura turno de la mañana'],

    // Ingresos a lo largo del día
    [2, 1, 'ingreso',  1, 1, `${fecha_hoy} 10:15:00`, 'Pedido desayuno'],
    [3, 1, 'ingreso',  1, 1, `${fecha_hoy} 12:45:00`, 'Pedido almuerzo'],
    [4, 1, 'egreso',   1, 1, `${fecha_hoy} 13:30:00`, 'Compra de cualquier cosa'],
    [5, 1, 'ingreso',  1, 1, `${fecha_hoy} 15:20:00`, 'Pedido tarde'],
    [6, 1, 'ingreso',  1, 1, `${fecha_hoy} 17:10:00`, 'Pedido café'],

    // Último movimiento hasta la hora actual (simulando venta o gasto reciente)
    [7, 1, 'ingreso',  1, 1, now, 'Último movimiento registrado']
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) {
      stmt.run(row);
    }
  });

  insertMany(movimientos);
  console.log(`[SEEDER] ${movimientos.length} movimientos insertados para la jornada de hoy`);
}
