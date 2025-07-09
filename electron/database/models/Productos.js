import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, codigo, nombre, descripcion, precio, categoria, tiempo_preparacion, activo 
    FROM productos
  `,
  selectActive: `
    SELECT * 
    FROM productos 
    WHERE activo = 1
  `,
  selectById: `
    SELECT * 
    FROM productos 
    WHERE id = ?
  `,
  insert: `
    INSERT INTO productos (codigo, nombre, descripcion, precio, categoria, tiempo_preparacion, activo) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  update: `
    UPDATE productos 
    SET codigo = ?, nombre = ?, descripcion = ?, precio = ?, categoria = ?, tiempo_preparacion = ?, activo = ? 
    WHERE id = ?
  `,
  delete: `
    DELETE FROM productos 
    WHERE id = ?
  `,
});

export const Producto = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  create({ codigo, nombre, descripcion, precio, categoria, tiempo_preparacion, activo = 1 }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      codigo, nombre, descripcion, precio, categoria, tiempo_preparacion, activo
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { codigo, nombre, descripcion, precio, categoria, tiempo_preparacion, activo }) {
    db.prepare(sql.update).run(
      codigo, nombre, descripcion, precio, categoria, tiempo_preparacion, activo, id
    );
    return this.findById(id);
  },

  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};