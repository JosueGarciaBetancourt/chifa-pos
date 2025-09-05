import { connection } from '../connection.js';

const db = connection();

const sql = Object.freeze({
  selectById: `SELECT * FROM aperturas_caja WHERE movimiento_id = ?`,

  insertAbrir: `
    INSERT INTO aperturas_caja (
      movimiento_id, monto_inicial
    ) VALUES (?, ?)
  `,
});

export const AperturaCaja = {
  findById(id) {
    const row = db.prepare(sql.selectById).get(id);
    return row || null;
  },

  abrir(movimiento_id, monto_inicial) {
    const result = db.prepare(sql.insertAbrir).run(
      movimiento_id,
      monto_inicial
    );

    return this.findById(result.lastInsertRowid);
  }
};