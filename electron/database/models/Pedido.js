import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, cliente_id, usuario_id, mesa_id, tipo, estado, fecha_hora, direccion_entrega, total, observaciones 
    FROM pedidos
  `,
  selectById: `
    SELECT * 
    FROM pedidos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO pedidos (cliente_id, usuario_id, mesa_id, tipo, estado, fecha_hora, direccion_entrega, total, observaciones) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE pedidos 
    SET cliente_id = ?, usuario_id = ?, mesa_id = ?, tipo = ?, estado = ?, fecha_hora = ?, direccion_entrega = ?, total = ?, observaciones = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM pedidos 
    WHERE id = ?
  `,
  updateEstado: `
    UPDATE pedidos 
    SET estado = ? 
    WHERE id = ?
  `,
});

export const Pedido = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ cliente_id, usuario_id, mesa_id, tipo, estado, fecha_hora, direccion_entrega = null, total, observaciones = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      cliente_id, usuario_id, mesa_id, tipo, estado, fecha_hora, direccion_entrega, total, observaciones
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { cliente_id, usuario_id, mesa_id, tipo, estado, fecha_hora, direccion_entrega, total, observaciones }) {
    db.prepare(sql.update).run(
      cliente_id, usuario_id, mesa_id, tipo, estado, fecha_hora, direccion_entrega, total, observaciones, id
    );
    return this.findById(id);
  },

  updateEstado(id, estado) {
    db.prepare(sql.updateEstado).run(estado, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};