import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre, monto_inicial, monto_final, observaciones 
    FROM movimientos_caja
  `,
  selectById: `
    SELECT * 
    FROM movimientos_caja 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO movimientos_caja (usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre, monto_inicial, monto_final, observaciones) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE movimientos_caja 
    SET usuario_id = ?, tipo = ?, fecha_hora_inicio = ?, fecha_hora_cierre = ?, monto_inicial = ?, monto_final = ?, observaciones = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM movimientos_caja 
    WHERE id = ?
  `,
  cerrarCaja: `
    UPDATE movimientos_caja 
    SET fecha_hora_cierre = ?, monto_final = ? 
    WHERE id = ?
  `,
});

export const MovimientoCaja = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre = null, monto_inicial, monto_final = null, observaciones = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre, monto_inicial, monto_final, observaciones
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre, monto_inicial, monto_final, observaciones }) {
    db.prepare(sql.update).run(
      usuario_id, tipo, fecha_hora_inicio, fecha_hora_cierre, monto_inicial, monto_final, observaciones, id
    );
    return this.findById(id);
  },

  cerrarCaja(id, fecha_hora_cierre, monto_final) {
    db.prepare(sql.cerrarCaja).run(fecha_hora_cierre, monto_final, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};