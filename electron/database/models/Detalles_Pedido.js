import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectByPedido: `
    SELECT id, pedido_id, producto_id, cantidad, precio_unitario, subtotal 
    FROM detalles_pedido 
    WHERE pedido_id = ?
  `,
  selectById: `
    SELECT * 
    FROM detalles_pedido 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) 
    VALUES (?, ?, ?, ?)
  `,
  update: `
    UPDATE detalles_pedido 
    SET pedido_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM detalles_pedido 
    WHERE id = ?
  `,
  deleteByPedido: `
    DELETE FROM detalles_pedido 
    WHERE pedido_id = ?
  `,
});

export const DetallePedido = {
  findByPedidoId(pedido_id) {
    return db.prepare(sql.selectByPedido).all(pedido_id);
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ pedido_id, producto_id, cantidad, precio_unitario }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      pedido_id, producto_id, cantidad, precio_unitario
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { pedido_id, producto_id, cantidad, precio_unitario }) {
    db.prepare(sql.update).run(pedido_id, producto_id, cantidad, precio_unitario, id);
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  },

  deleteByPedido(pedido_id) {
    db.prepare(sql.deleteByPedido).run(pedido_id);
    return { deleted: true };
  }
};