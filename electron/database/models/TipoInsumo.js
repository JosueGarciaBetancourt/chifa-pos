import { connection } from '../connection.js';
const db = connection();

const sql = Object.freeze({
  selectAll: `
    SELECT id, nombre, descripcion, activo
    FROM tipos_insumos
  `,
  selectById: `
    SELECT id, nombre, descripcion, activo
    FROM tipos_insumos 
    WHERE id = ?
  `,
  selectActive: `
    SELECT *
    FROM tipos_insumos
    WHERE activo = 1
  `,
  selectInactive: `
    SELECT *
    FROM tipos_insumos
    WHERE activo = 0
  `,
  insert: `
    INSERT INTO tipos_insumos (nombre, descripcion) 
    VALUES (?, ?)
  `,
  update: `
    UPDATE tipos_insumos 
    SET nombre = ?, descripcion = ? 
    WHERE id = ?
  `,
  disable: `
    UPDATE tipos_insumos SET activo = 0 WHERE id = ? AND activo = 1
  `,
  enable: `
    UPDATE tipos_insumos SET activo = 1 WHERE id = ? AND activo = 0
  `,
  delete: `
    DELETE FROM tipos_insumos 
    WHERE id = ?
  `,
});

export const TipoInsumo = {
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

  create({ nombre, descripcion = '' }) {
    const { lastInsertRowid } = db.prepare(sql.insert).run(
      nombre, descripcion
    );
    return this.findById(lastInsertRowid);
  },

  update(id, { nombre, descripcion = '' }) {
    db.prepare(sql.update).run(
      nombre, descripcion, id
    );
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
