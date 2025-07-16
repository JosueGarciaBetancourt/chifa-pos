import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectByPedido: `
    SELECT id, pedido_id, tipo, serie, numero, fecha_hora_emision, xml_base64, estado 
    FROM comprobantes 
    WHERE pedido_id = ?
  `,
  selectById: `
    SELECT * 
    FROM comprobantes 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO comprobantes (pedido_id, tipo, serie, numero, fecha_hora_emision, xml_base64, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE comprobantes 
    SET pedido_id = ?, tipo = ?, serie = ?, numero = ?, fecha_hora_emision = ?, xml_base64 = ?, estado = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM comprobantes 
    WHERE id = ?
  `,
});

export const Comprobante = {
  findByPedidoId(pedido_id) {
    return db.prepare(sql.selectByPedido).get(pedido_id);
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ pedido_id, tipo, serie, numero, fecha_hora_emision, xml_base64 = null, estado }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      pedido_id, tipo, serie, numero, fecha_hora_emision, xml_base64, estado
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { pedido_id, tipo, serie, numero, fecha_hora_emision, xml_base64, estado }) {
    db.prepare(sql.update).run(
      pedido_id, tipo, serie, numero, fecha_hora_emision, xml_base64, estado, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};