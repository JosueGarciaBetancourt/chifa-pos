import { connection } from '../connection.js';

const db = connection();

const sql = Object.freeze({
  selectById: `SELECT * FROM ingresos_egresos_caja WHERE movimiento_id = ?`,

  insertIngreso: `
    INSERT INTO ingresos_egresos_caja (
      movimiento_id, movimiento_apertura_id, comprobante_id, monto
    ) VALUES (?, ?, ?, ?)
  `,

  insertEgreso: `
    INSERT INTO ingresos_egresos_caja (
      movimiento_id, movimiento_apertura_id, gasto_id, monto
    ) VALUES (?, ?, ?, ?)
  `,
});

export const IngresoEgresoCaja = {
 findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row || null;
  },

  registrarIngreso(movimiento_id, movimiento_apertura_id, comprobante_id, monto) {
    const result = db.prepare(sql.insertIngreso).run(
      movimiento_id,
      movimiento_apertura_id, 
      comprobante_id,
      monto
    );

    return this.findById(result.lastInsertRowid);
  },

  registrarEgreso(movimiento_id, movimiento_apertura_id, gasto_id, monto) {
    const result = db.prepare(sql.insertEgreso).run(
      movimiento_id,
      movimiento_apertura_id, 
      gasto_id,
      monto
    );

    return this.findById(result.lastInsertRowid);
  }
};