import { connection } from '../connection.js';
import { DateFormatter } from '../utils/dateFormatter.js'
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT *
    FROM gastos
  `,
  selectById: `
    SELECT *
    FROM gastos 
    WHERE id = ?
  `,
  selectMontoById: `SELECT monto FROM gastos WHERE id = ?`,
  insert: `
    INSERT INTO gastos (tipo_gasto_id, usuario_id, proveedor_id, monto, metodo_pago_id, observaciones, fecha_hora) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  delete: `
    DELETE FROM gastos 
    WHERE id = ?
  `
});

export const Gasto = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  selectMontoById(id) {
    const row = db.prepare(sql.selectMontoById).get(id);
    return row.monto || null;
  },

  create({ tipo_gasto_id, usuario_id, proveedor_id, monto, metodo_pago_id, observaciones, fecha_hora = DateFormatter.toLocalSQLDatetime() }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      tipo_gasto_id, usuario_id, proveedor_id, monto, metodo_pago_id, observaciones, fecha_hora
    );
    return this.findById(lastInsertRowid);
  },

  update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new Error('No se especificaron campos para actualizar.');
    }
  
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => data[key]);
  
    const sql = `
      UPDATE gastos 
      SET ${setClause} 
      WHERE id = ?
    `;
  
    db.prepare(sql).run(...values, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
