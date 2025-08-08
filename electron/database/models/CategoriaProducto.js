import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, descripcion 
    FROM categorias_productos
    ORDER BY id ASC
  `,
  selectById: `
    SELECT * 
    FROM categorias_productos 
    WHERE id = ?
  `,
  selectActive: `
    SELECT *
    FROM categorias_productos
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM categorias_productos
    WHERE activo = 0
  `,
  insert: `
    INSERT INTO categorias_productos (nombre, descripcion) 
    VALUES (?, ?)
  `,
  update: `
    UPDATE categorias_productos 
    SET nombre = ?, descripcion = ? 
    WHERE id = ?
  `,
  disable: `
    UPDATE categorias_productos SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE categorias_productos SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM categorias_productos 
    WHERE id = ?
  `,
});

export const CategoriaProducto = {
  selectAll() {
    return db.prepare(sql.selectAll).all();
  },

  findById(id) {
    return db.prepare(sql.selectById).get(id);
  },

  selectActive() {
    return db.prepare(sql.selectActive).all();
  },

  selectInactive() {
    return db.prepare(sql.selectInactive).all();
  },

  create({ nombre, descripcion = null }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(nombre, descripcion);
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, descripcion = null }) {
    db.prepare(sql.update).run(nombre, descripcion, id);
    return this.findById(id);
  },

  disable(id) {
    db.prepare(sql.disable).run(id);
    return;
  },

  enable(id) {
    db.prepare(sql.enable).run(id);
    return this.findById(id);
  },
  
  delete(id) {
    db.prepare(sql.delete).run(id);
    return { deleted: true };
  }
};
