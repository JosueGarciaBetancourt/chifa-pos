import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectByProducto: `
    SELECT producto_id, insumo_id, cantidad 
    FROM recetas 
    WHERE producto_id = ?
  `,
  selectByInsumo: `
    SELECT * 
    FROM recetas 
    WHERE insumo_id = ?
  `,
  insert: `
    INSERT INTO recetas (producto_id, insumo_id, cantidad) 
    VALUES (?, ?, ?)
  `,
  update: `
    UPDATE recetas 
    SET cantidad = ? 
    WHERE producto_id = ? AND insumo_id = ?
  `,
  delete: `
    DELETE FROM recetas 
    WHERE producto_id = ? AND insumo_id = ?
  `,
});

export const Receta = {
  findByProductoId(producto_id) {
    return db.prepare(sql.selectByProducto).all(producto_id);
  },

  findByInsumoId(insumo_id) {
    return db.prepare(sql.selectByInsumo).all(insumo_id);
  },

  create({ producto_id, insumo_id, cantidad }) {
    db.prepare(sql.insert).run(producto_id, insumo_id, cantidad);
    return { producto_id, insumo_id, cantidad };
  },

  update(producto_id, insumo_id, cantidad) {
    db.prepare(sql.update).run(cantidad, producto_id, insumo_id);
    return { producto_id, insumo_id, cantidad };
  },

  delete(producto_id, insumo_id) {
    db.prepare(sql.delete).run(producto_id, insumo_id);
    return { deleted: true };
  }
};