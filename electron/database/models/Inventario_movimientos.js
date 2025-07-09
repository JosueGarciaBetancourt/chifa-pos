import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectByInsumo: `
    SELECT id, insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id 
    FROM inventario_movimientos 
    WHERE insumo_id = ?
  `,
  selectById: `
    SELECT * 
    FROM inventario_movimientos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO inventario_movimientos (insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE inventario_movimientos 
    SET insumo_id = ?, tipo = ?, cantidad = ?, fecha_hora = ?, usuario_id = ?, pedido_id = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM inventario_movimientos 
    WHERE id = ?
  `,
});

export const InventarioMovimiento = {
  findByInsumoId(insumo_id) {
    return db.prepare(sql.selectByInsumo).all(insumo_id);
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id }) {
    db.prepare(sql.update).run(
      insumo_id, tipo, cantidad, fecha_hora, usuario_id, pedido_id, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};