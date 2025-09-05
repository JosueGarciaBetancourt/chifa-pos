import { connection } from '../connection.js';
import { MovimientoCaja } from './MovimientoCaja.js';

const db = connection();

const sql = Object.freeze({
  selectById: `SELECT * FROM cierres_caja WHERE movimiento_id = ?`,

  insertCerrar: `
    INSERT INTO cierres_caja (
      movimiento_id, movimiento_apertura_id, monto_final_manual, monto_final_calculado, diferencia
    ) VALUES (?, ?, ?, ?, ?)
  `,
});

export const CierreCaja = {
  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row || null;
  },

  cerrar(movimiento_id, movimiento_apertura_id, monto_final_manual) {
    const caja_id = MovimientoCaja.selectCajaIdByAperturaId(movimiento_apertura_id);
    const monto_final_calculado =  MovimientoCaja.calcularSaldoCaja(caja_id, movimiento_apertura_id);

     const result = db.prepare(sql.insertCerrar).run(
      movimiento_id,
      movimiento_apertura_id,
      monto_final_manual,
      monto_final_calculado,
      monto_final_manual - monto_final_calculado
    );

    return this.findById(result.lastInsertRowid);
  }
};